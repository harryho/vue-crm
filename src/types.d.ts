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

export interface User {//extends Entity {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  avatar: string;
  mobile: string;
  homephone: string;
  workphone: string;
}

export interface Customer {
  id: string;
  firstname: string;
  lastname: string;
  fullname: string;
  email: string;
  avatar: string;
  mobile: string;
  phone: string;
  membership: string;
  rewards: 0;
  hasItemInShoppingCart: false
}

export interface Address {
  street: string;
  city: string;
  zipcode: string;
  country: string;
}

export interface Order {
  id: string;
  reference: string;
  customer: string;
  lineItems: Product[];
  amount: number;
  billingDate: string;
  shippingDate: string;
  shippingAddress: Address;
  delivery: string;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  unitInStock: string;
  price: number;
  retailPrice: number;
  colors?: [];
  imageUri?: string;
  releaseDate?: string;
  status?: string
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
  filters?: TODO

}

export interface Blog  {
  id: string;
  title: string;
  description: string;
  coverUrl: string;
  totalViews: string;
  totalComments:string;
  totalShares: string;
  totalFavorites: string;
  postedAt: string;
  author: {
    name: string;
    avatar: string;
  },
}