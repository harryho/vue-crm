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
// GET-only for now (M2) - mutations land in M3 alongside the store rewiring
// that actually needs them.

import type { User, Product, Order, Category, Staff, Carrier } from '../types';
import { users, categories, products, orders, carriers } from './ecommerce';
import { staff } from './staff';

const DELAY_MS = 300;

function wait(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function notFound(what: string, id: number): never {
  throw new Error(`${what} ${id} not found`);
}

// ---- users ----

export async function getUsers(): Promise<User[]> {
  await wait(DELAY_MS);
  return users;
}

export async function getUserById(id: number): Promise<User> {
  await wait(DELAY_MS);
  const user = users.find((u) => u.userId === id);
  if (!user) notFound('User', id);
  return user;
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
  return products;
}

export async function getProductById(id: number): Promise<Product> {
  await wait(DELAY_MS);
  const product = products.find((p) => p.productId === id);
  if (!product) notFound('Product', id);
  return product;
}

// ---- orders ----

export async function getOrders(): Promise<Order[]> {
  await wait(DELAY_MS);
  return orders;
}

export async function getOrderById(id: number): Promise<Order> {
  await wait(DELAY_MS);
  const order = orders.find((o) => o.orderId === id);
  if (!order) notFound('Order', id);
  return order;
}
