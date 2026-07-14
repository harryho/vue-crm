// This app has no real backend anywhere - not in dev, not in production.
// Every "API" call is a plain async function reading the same in-memory
// arrays, with a simulated delay so loading states stay visible. There is
// deliberately no network request and no interception layer involved (no
// axios-mock-adapter, no MSW-style Service Worker): react-crm hit a
// recurring, hard-to-fully-eliminate class of intermittent production bug
// from exactly that kind of layer, and this app's own window.fetch monkey-
// patch (utils/helpers/fake-backend.ts) is the same shape of risk, just
// without the Service Worker specifically. Since the backend is
// permanently fake, skipping the network layer removes the whole bug
// class rather than hardening around it.
//
import type { User, Product, Order } from '../types';
import type { Category, Staff, Carrier } from '../types';
import { users, categories, products, orders, carriers } from './ecommerce';
import { staff } from './staff';

const DELAY_MS = 300;

let usersDb: User[] = [...users];
let productsDb: Product[] = [...products];
let ordersDb: Order[] = [...orders];

function wait(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function nextId<T>(items: T[], key: keyof T): number {
  const ids = items.map((item) => Number(item[key]) || 0);
  return (ids.length ? Math.max(...ids) : 0) + 1;
}

function notFound(what: string, id: number): never {
  throw new Error(`${what} ${id} not found`);
}

// ---- users ----

export async function getUsers(): Promise<User[]> {
  await wait(DELAY_MS);
  return usersDb;
}

export async function getUserById(id: number): Promise<User> {
  await wait(DELAY_MS);
  const user = usersDb.find((u) => u.userId === id);
  if (!user) notFound('User', id);
  return user;
}

export async function createUser(data: Omit<User, 'userId'>): Promise<User> {
  await wait(DELAY_MS);
  const user: User = { ...data, userId: nextId(usersDb, 'userId') };
  usersDb = [...usersDb, user];
  return user;
}

export async function updateUser(id: number, data: Omit<User, 'userId'>): Promise<User> {
  await wait(DELAY_MS);
  const index = usersDb.findIndex((u) => u.userId === id);
  if (index === -1) notFound('User', id);
  const updated: User = { ...data, userId: id };
  usersDb = [...usersDb.slice(0, index), updated, ...usersDb.slice(index + 1)];
  return updated;
}

export async function deleteUser(id: number): Promise<void> {
  await wait(DELAY_MS);
  if (!usersDb.some((u) => u.userId === id)) notFound('User', id);
  usersDb = usersDb.filter((u) => u.userId !== id);
}

// ---- staff / categories / carriers (read-only) ----

export async function getStaff(): Promise<Staff[]> {
  await wait(DELAY_MS);
  return staff;
}

export async function getCategories(): Promise<Category[]> {
  await wait(DELAY_MS);
  return categories;
}

export async function getCarriers(): Promise<Carrier[]> {
  await wait(DELAY_MS);
  return carriers;
}

// ---- products ----

export async function getProducts(): Promise<Product[]> {
  await wait(DELAY_MS);
  return productsDb;
}

export async function getProductById(id: number): Promise<Product> {
  await wait(DELAY_MS);
  const product = productsDb.find((p) => p.productId === id);
  if (!product) notFound('Product', id);
  return product;
}

export async function createProduct(data: Omit<Product, 'productId'>): Promise<Product> {
  await wait(DELAY_MS);
  const product: Product = { ...data, productId: nextId(productsDb, 'productId') };
  productsDb = [...productsDb, product];
  return product;
}

export async function updateProduct(id: number, data: Omit<Product, 'productId'>): Promise<Product> {
  await wait(DELAY_MS);
  const index = productsDb.findIndex((p) => p.productId === id);
  if (index === -1) notFound('Product', id);
  const updated: Product = { ...data, productId: id };
  productsDb = [...productsDb.slice(0, index), updated, ...productsDb.slice(index + 1)];
  return updated;
}

export async function deleteProduct(id: number): Promise<void> {
  await wait(DELAY_MS);
  if (!productsDb.some((p) => p.productId === id)) notFound('Product', id);
  productsDb = productsDb.filter((p) => p.productId !== id);
}

// ---- orders ----

export async function getOrders(): Promise<Order[]> {
  await wait(DELAY_MS);
  return ordersDb;
}

export async function getOrderById(id: number): Promise<Order> {
  await wait(DELAY_MS);
  const order = ordersDb.find((o) => o.orderId === id);
  if (!order) notFound('Order', id);
  return order;
}

export async function updateOrderStatus(id: number, status: string): Promise<Order> {
  await wait(DELAY_MS);
  const index = ordersDb.findIndex((o) => o.orderId === id);
  if (index === -1) notFound('Order', id);
  const current = ordersDb[index];
  const updated: Order = {
    ...current,
    status,
    statusHistory: [...current.statusHistory, { status, changedAt: new Date().toISOString() }],
  };
  ordersDb = [...ordersDb.slice(0, index), updated, ...ordersDb.slice(index + 1)];
  return updated;
}
