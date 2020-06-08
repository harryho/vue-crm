import { getData, putData, postData, deleteData } from "@/utils/demo-api";
import { Customer, Order, Entity, Product, Category, Address } from "@/types";
import { getDefaultPagination, getPagination } from "@/utils/store-util";
import { appModule } from "./app";
import { get } from "lodash";
import {
  VuexModule,
  Module,
  Mutation,
  Action,
  getModule,
} from "vuex-module-decorators";
import store from "@/store";

export interface OrderState {
  items: Entity[];
  pagination: Pagination;
  loading: boolean;
  order: Order;
  customer: string;
  products: Product[];
  customers: Customer[];
  categories: Category[];
}

@Module({ store, dynamic: true, name: "orders" })
class OrderModule extends VuexModule implements OrderState {
  public items: Entity[] = [];
  public pagination = getDefaultPagination();
  public loading = false;
  public order = {} as Order;
  public customer = "";
  public products: Product[] = [];
  public customers: Customer[] = [];
  public categories: Category[] = [];

  @Action
  getCustomers() {
    getData("customers/").then(res  => {
      if (res.data) {
        const customers = res.data.map((c: Customer) => {
          c.text = c.firstname + " " + c.lastname;
          c.value = c.id;
          return c;
        });
        console.log(customers.length);
        this.setCustomers(customers);
      }
    });
  }

  @Action
  getOrderById(id: string) {
    if (id) {
      getData("orders/" + id + "?_expand=customer").then(
        res  => {
          const order = res.data;
          order.products.filter((p: Product) => p !== null && p !== undefined);
          order.customerId = order.customer.id;
          this.setOrder(order);
        },
        (err: TODO) => {
          console.log(err);
        }
      );
    } else {
      const order = {} as Order
      order.products=[];
      order.customer = {} as Customer
      order.shipAddress = {} as Address
      this.setOrder(order);
    }
  }

  @Action
  getProductsByCategory(categoryId: number) {
    if (categoryId) {
      getData("products?_expand=category&categoryId=" + categoryId).then(
        res  => {
          const products = res.data.map((p: Product) => {
            p.text = p.productName;
            p.value = p.id;
            return p;
          });
          console.log(products);
          this.setProducts(products);
        },
        (err: TODO) => {
          console.log(err);
        }
      );
    }
  }

  @Action
  getAllOrders() {
    this.setLoading(true);
    getData("orders?_expand=customer").then(res => {
      const orders = res.data;

      orders.forEach((item: Order) => {
        item.amount = item.products.reduce(
          (p: number, c: Product) => p + ((c && c.unitPrice) || 0),
          0
        );
        item.quantity = item.products?.length;
        item.customerName = item.customer? item.customer.firstname + " " + item.customer.lastname : "";
      });
      this.setDataTable(orders);
      this.setLoading(false);
    });
  }

  @Action
  searchOrders(searchQuery: string) {
    getData("orders?_expand=customer&" + searchQuery).then(res => {
      const orders = res.data;
      orders.forEach((item: Order) => {
        item.amount = item.products.reduce(
          (p: TODO, c: TODO) => p + c.unitPrice,
          0
        );
        item.quantity = item.products?.length;
        item.customerName = item.customer ? item.customer.firstname + " " + item.customer.lastname
          : "";
      });
      this.setDataTable(orders);
      this.setLoading(false);
    });
  }

  @Action quickSearch(headers: TableHeader[], qsFilter: SeachQuery): void {
    // TODO: Following solution should be replaced by DB full-text search for production
    getData("orders?_expand=customer").then(res  => {
      const orders = res.data.filter((r: TODO) =>
        headers.some((header: TableHeader) => {
          const val = get(r, [header.value]);
          return (
            (val &&
              val
                .toString()
                .toLowerCase()
                .includes(qsFilter)) ||
            false
          );
        })
      );
      orders.forEach((item: Order) => {
        item.amount = item.products.reduce(
          (p: number, c: Product) => p + ((c && c.unitPrice) || 0),
          0
        );
        item.quantity = item.products?.length;
        item.customerName = item.customer ? item.customer.firstname + " " + item.customer.lastname : "";
      });
      this.setDataTable(orders);
      this.setLoading(false);
    });
  }
  @Action
  deleteOrder(id: number) {
    deleteData(`orders/${id.toString()}`)
      .then(res => {
        this.getAllOrders();
        appModule.sendSuccessNotice("Operation is done.");
      })
      .catch((err: TODO) => {
        console.log(err);
        appModule.sendErrorNotice("Operation failed! Please try again later. ");
        appModule.closeNoticeWithDelay(1500);
      });
  }
  @Action
  addProductToOrder(productId: number) {
    if (productId) {
      const products = Object.assign([], this.order.products);
      const product = this.products.find((p: Product) => p.id === productId);
      product && products.push(product);
      this.setOrderProducts(products);
    }
  }
  @Action
  deleteProduct(product: Product) {
    if (product) {
      const { products } = this.order;
      products.splice(
        products.findIndex((p: Product) => p.id === product.id),
        1
      );
      this.setOrderProducts(products);
    }
  }
  @Action saveOrder(order: Order) {

    if (!order.id) {
      postData("orders/", order)
        .then(res  => {
          const order = res.data;
          this.setOrder(order);
          appModule.sendSuccessNotice("New order has been added.");
        })
        .catch((err: TODO) => {
          console.log(err);
          appModule.sendErrorNotice(
            "Operation failed! Please try again later. "
          );
          appModule.closeNoticeWithDelay(1500);
        });
    } else {
      putData("orders/" + order.id.toString(), order)
        .then(res  => {
          const order = res.data;
          this.setOrder(order);
          appModule.sendSuccessNotice("Order has been updated.");
        })
        .catch((err: TODO) => {
          console.log(err);
          appModule.sendErrorNotice(
            "Operation failed! Please try again later. "
          );
          appModule.closeNoticeWithDelay(1500);
        });
    }
  }

  @Action setDataTable(items: Order[]) {
    const pagination = getPagination(items);
    this.setPagination(pagination);
    this.setItems(items);
  }

  @Mutation
  setCustomers(customers: Customer[]) {
    this.customers = customers;
  }
  @Mutation
  setCategories(categories: Category[]) {
    this.categories = categories;
  }
  @Mutation
  setProducts(products: Product[]) {
    console.log(products);
    this.products = products;
  }
  @Mutation
  setOrderProducts(products: Product[]) {
    this.order.products = products;
  }
  @Mutation
  setItems(orders: Order[]) {
    this.items = orders;
  }
  @Mutation
  setPagination(pagination: Pagination) {
    this.pagination = pagination;
  }
  @Mutation
  setLoading(loading: boolean) {
    this.loading = loading;
  }
  @Mutation
  setOrder(order: Order) {
    this.order = order;
  }
}

export const orderModule = getModule(OrderModule); // Orders;
