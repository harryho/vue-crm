export interface Entity {
  id: number;
  text?: string;
  value?: number;
}

export interface Category extends Entity {
  categoryName: string;
  parentId: string;
}

export interface UserInfo extends Entity {
  messages: string[];
  notifications: string[];
  tasks: string[];
}

export interface User extends Entity {
  firstname: string;
  lastname: string;
  email: string;
  avatar: string;
  mobile: string;
  homephone: string;
  workphone: string;
}

export interface Customer extends User {
  membership: boolean;
  rewards: 0;
  orders: string[];
  orderAmount: number;
}

export interface Address extends Entity {
  address: string;
  city: string;
  zipcode: string;
  country: string;
}

export interface Order extends Entity {
  reference: string;
  customerId: number;
  customer: Customer;
  customerName: string;
  products: Product[];
  amount: number;
  quantity: number;
  orderDate: string;
  shippedDate: string;
  shipAddress: Address;
}

export interface Product extends Entity {
  productName: string;
  categoryId: string;
  unitInStock: string;
  unitPrice: number;
  category: Category;
  categoryName?: string;
}

export interface State {
  items: Entity[];
  pagination: Pagination;
  loading: boolean;
  mode: string;
  snackbar: boolean;
  notice: string;
  customer: Customer;
  orders: Order[];
  orderList: Order[];
}


export type SearchFilter = {
  equal?: TODO,
  contain?: TODO,
  startsWith?: TODO,
  endsWith?: TODO,
  lessThan?: TODO,
  greaterThan?: TODO,
  lessThanOrEqual?: TODO,
  greaterThanOrEqual?: TODO,
  // between?: TODO,
  filters?: TODO

}