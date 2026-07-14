import type { Category, Carrier, Product, Order, Cart, User } from '../../types';

import categoriesJson from './categories.json';
import carriersJson from './carriers.json';
import productsJson from './products.json';
import ordersJson from './orders.json';
import cartsJson from './carts.json';
import usersJson from './users.json';

export const categories: Category[] = categoriesJson;
export const carriers: Carrier[] = carriersJson;
export const products: Product[] = productsJson;
export const orders: Order[] = ordersJson;
export const carts: Cart[] = cartsJson;
export const users: User[] = usersJson;
