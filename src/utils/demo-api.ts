import { DB } from './demo-data';
import { Entity } from '@/types';
import url from 'url';
import querystring from 'querystring';
import { getSeachFilters } from './app-util';

const ds: TODO = DB;

const EXPAND = "_expand"
const EMBED = "_exbed"

function getModel(action: string) {
  if (action.includes("/")) {
    return action.substring(0, action.indexOf("/"))
  }
  else {
    return action;
  }
}

function getId(action: string): number {
  if (action.includes("/")) {
    return parseInt(action.substring(action.indexOf("/") + 1))
  }
  else {
    return 0
  }
}

function getExpand(qs: TODO) {
  if (EXPAND in qs) {
    return qs[EXPAND];
  }
  else return ''
}

function parseRequest(req: string) {
  const parsedUrl = url.parse(req);
  const parsedQs = querystring.parse(parsedUrl.query);
  const model = getModel(parsedUrl.pathname);
  const id = getId(parsedUrl.pathname);
  const exp = getExpand(parsedQs)
  const filters = getSeachFilters(parsedQs)
  return { model, id, exp, filters }
}


export function getData(action: string): Promise<TODO> {
  const { model, id, exp, filters } = parseRequest(action)
  return new Promise(function (resolve, _reject) {
    const expandModel = exp
      ? exp === "category"
        ? "categories"
        : exp + "s"
      : exp;

    console.log(model);
    let result: TODO;
    let expand: string, expandId: number;
    console.log(expandModel);
    if (model in ds) {
      if (id && id > 0) {
        result =
          ds[model][ds[model].findIndex((d: { id: number }) => d.id === id)];
        if (expandModel) {
          expand =
            expandModel === "categories"
              ? "category"
              : expandModel.substr(0, expandModel.length - 1);
          expandId = result[expand + "Id"] as number;
          result[expand] =
            ds[expandModel][
            ds[expandModel].findIndex((d: { id: number }) => d.id === expandId)
            ];
        }
      } else {
        result = ds[model].map((m: { [x: string]: TODO }) => {
          if (expandModel) {
            expand =
              expandModel === "categories"
                ? "category"
                : expandModel.substr(0, expandModel.length - 1);
            expandId = m[expand + "Id"] as number;
            m[expand] =
              ds[expandModel][
              ds[expandModel].findIndex((d: { id: number }) => d.id === expandId)
              ];
          }
          return m;
        });
      }

      if (filters !== null && filters !== undefined
        && Object.keys(filters).length > 0) {
        result = result.filter(
          row => Object.keys(filters).every(
            prop => filters[prop](prop,row)
          )
        )
      }
    }
    setTimeout(resolve, 500, { data: result });
  });
}

export function postData(action: string, data: Entity): Promise<TODO> {
  const { model } = parseRequest(action)
  return new Promise(function (resolve, _reject) {
    ds[model].push(data);
    setTimeout(resolve, 200, { data: data });
  });
}

export function putData(action: string, data: Entity): Promise<TODO> {
  const { model, id } = parseRequest(action)
  return new Promise(function (resolve, _reject) {
    const idx = ds[model].findIndex((d: { id: number }) => d.id === id);
    ds[model][idx] = Object.assign({}, data);
    setTimeout(resolve, 200, { data: data });
  });
}

export function deleteData(action: string): Promise<TODO> {
  const { model, id } = parseRequest(action)
  return new Promise(function (resolve, _reject) {
    if (id > 0) {
      ds[model].splice(ds[model].findIndex((d: Entity) => d.id === id), 1);
    }
    setTimeout(resolve, 200, { status: 200 });
  });
}

export function login(_action: string, data: TODO): Promise<TODO> {
  return new Promise(function (resolve, _reject) {
    if (data.username === "admin@test.com" && data.password === "password") {
      const { accessToken: accessToken, user } = ds.token;
      setTimeout(resolve, 200, {
        data: {
          accessToken: accessToken,
          user,
        },
      });
    } else {
      _reject({
        code: 403,
        text: "Your name or password is wrong",
      });
    }
  });
}
