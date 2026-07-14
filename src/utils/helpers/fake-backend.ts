import { devDB } from './mock.db.dev'
import db from './mock.db'
export { fakeBackend };


export interface AuthUser {
  id: number;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  token: string;
}

interface ResponseBody {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  token: string;
}

function loadDevDB() {
  // console.log(' import.meta.env.API_URL ', import.meta.env.API_URL)
  if (import.meta.env.DEV 
      || (import.meta.env.API_URL && import.meta.env.API_URL.startswith("http://localhost"))) {
    return devDB
  }
  return db
}

function fakeBackend() {
  const users: AuthUser[] = [
    { id: 1, username: 'admin@test.com', password: 'password', firstName: 'Admin', lastName: 'Test' , token: 'token'},
    { id: 2, username: 'admin.test@dummy.com', password: 'password', firstName: 'Admin', lastName: 'Test' , token: 'token'}];
  let cache: any = Object.assign({}, loadDevDB());
  const realFetch = window.fetch;

  window.fetch = function (url: string, opts: { method: string; headers: { [key: string]: string }; body?: string }) {
    return new Promise<Response>((resolve, reject) => {
      // wrap in timeout to simulate server api call
      setTimeout(handleRoute, 500);

      function handleRoute() {
        switch (true) {
          case url.endsWith('/users/authenticate') && opts.method === 'POST':
            return authenticate();
          case url.endsWith('/users') && opts.method === 'GET':
            return getUsers();
          //------------------- Blog ----------------------
          case url.endsWith('/blogs') && opts.method === 'GET':
            return getAllData('blogs');
          case url.endsWith('/blogs') && opts.method === 'POST':
            return saveData('blogs','', body());
          case url.lastIndexOf('/blogs') > 0 && !url.endsWith('/blogs')
            && opts.method === 'GET':
            return getDataById('blogs', getId(url));
          case url.lastIndexOf('/blogs') > 0 && !url.endsWith('/blogs') && opts.method === 'DELETE':
            return deleteDataById('blogs',getId(url));
          case url.lastIndexOf('/blogs') > 0 && !url.endsWith('/blogs') && opts.method === 'PUT':
            return saveData('blogs',getId(url), body());

          default:
            // pass through any requests not handled above
            return realFetch(url, opts)
              .then((response) => resolve(response))
              .catch((error) => reject(error));
        }
      }

      // route functions
      function authenticate() {
        const { username, password } = body();
        const user = users.find((x) => x.username === username && x.password === password);
        if (!user) return error('Username or password is incorrect');
        cache = Object.assign({}, db);
        return ok({
          id: user.id,
          username: user.username,
          firstName: user.firstName,
          lastName: user.lastName,
          token: 'fake-jwt-token'
        });
      }

      function getUsers() {
        if (!isAuthenticated()) return unauthorized();
        return ok(users);
      }

      function getAllData(model:string) {
        if (!isAuthenticated()) return unauthorized();
        const customers = cache[model]
        return ok(customers);
      }

      function getDataById(model:string, id: string) {
        if (!isAuthenticated()) return unauthorized();
        const customer = cache[model].find((c: any) => c.id === id)
        return ok(customer);
      }

      function deleteDataById(model:string, id: string) {
        if (!isAuthenticated()) return unauthorized();
        const idx = cache[model].findIndex((c: any) => c.id === id)
        if (idx > -1) cache[model].splice(idx, 1)
        return ok({ status: '204' } as any);
      }

      function saveData(model:string, id: string, data: any) {
        if (!isAuthenticated()) return unauthorized();
        if (id) {
          const idx = cache[model].findIndex((c: any) => c.id === id)
          if (idx > -1) cache[model][idx] = Object.assign({}, data)
        }
        else {
          data.id = String(cache[model].length);
          cache[model][cache[model].length] = Object.assign({}, data)
        }
        return ok({ status: '204' } as any);
      }

      // helper functions
      function ok(body: AuthUser[] | ResponseBody): void {
        resolve({ ok: true, text: () => Promise.resolve(JSON.stringify(body)) } as Response);
      }

      function unauthorized() {
        resolve({ status: 401, text: () => Promise.resolve(JSON.stringify({ message: 'Unauthorized' })) } as Response);
      }

      function error(message: string) {
        resolve({ status: 400, text: () => Promise.resolve(JSON.stringify({ message })) } as Response);
      }

      function isAuthenticated() {
        return opts.headers['Authorization'] === 'Bearer fake-jwt-token';
      }

      function body() {
        return opts.body && JSON.parse(opts.body);
      }

      function getId(url: string): string {
        const ldx = url.lastIndexOf('/')
        if (ldx + 1 < url.length) {
          return url.substring(ldx + 1, url.length)
        }
        return ''
      }
    });
  } as typeof window.fetch; // Type assertion here
}
