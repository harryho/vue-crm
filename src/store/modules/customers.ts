import { getData, putData, postData, deleteData } from '@/utils/demo-api';
import { Customer, Order, Entity } from '@/types';
import { appModule } from './app';
import { getDefaultPagination, getPagination } from '@/utils/store-util';
import { get } from 'lodash';
import { VuexModule, Module, Mutation, Action, getModule } from 'vuex-module-decorators';
import store from '@/store';

export interface CustomerState {
  items: Entity[];
  pagination: Pagination;
  loading: boolean;
  customer: Customer; //= new Customer() ;
  customers: Customer[];
  orders: Order[];
  orderList: Order[];
}

@Module({ store, dynamic: true, name: 'customerModule' })
class CustomerModule extends VuexModule implements CustomerState {
  public items: Entity[] = [];
  public pagination = getDefaultPagination();
  public loading = true;
  public customer = {} as Customer;
  public customers: Customer[] = [];
  public orders: Order[] = [];
  public orderList: Order[] = [];

  get getCustomers() {
    return this.customers;
  }

  @Action getOrders(): void {
    getData('orders/').then(res => {
      if (res.data && res.data.length > 0) {
        const orderList = res.data.map((c: TODO) => {
          c.text = c.firstname + ' ' + c.lastname;
          c.value = c.id;
          return c;
        });
        this.setOrderList(orderList);
      }
    });
  }
  @Action getCustomerById(id: string): void {
    //this.context.commit('setLoading', { loading: true });
    this.setLoading(true);
    if (id) {
      getData('customers/' + id).then(
        res => {
          const customer = Object.assign({}, res.data);
          customer.avatar = `..${customer.avatar}`;
          this.setCustomer(customer);
          this.setLoading(false);
        },
        (err: TODO) => {
          console.log(err);
        }
      );
    } else {
      this.setCustomer({} as Customer);
      this.setLoading(false);
    }
  }

  @Action getAllCustomers(): void {
    // this.context.commit('setLoading', { loading: true });
    this.setLoading(true);
    getData('customers?_embed=orders').then(res => {
      const customers = res.data;
      customers.forEach((item: Customer) => {
        item.orderAmount = item.orders && item.orders?.length; // : 0;
      });
      this.setDataTable(customers);
      this.setLoading(false);
    });
  }

  @Action searchCustomers(searchQuery: string): void {
    this.setLoading(true);
    getData('customers?_embed=orders&' + searchQuery).then(res => {
      const customers = res.data;
      customers.forEach((p: TODO) => {
        p.orderAmount = p.orders?.length;
      });
      this.setDataTable(customers);
      this.setLoading(false);
    });
  }

  @Action quickSearch(headers: TableHeader[], qsFilter: SeachQuery): void {
    this.setLoading(true);
    // TODO: Following solution should be replaced by DB full-text search for production
    getData('customers?_embed=orders').then(res => {
      const customers = res.data.filter((r: TODO) =>
        headers.some((header: TODO) => {
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
      customers.forEach((item: Customer) => {
        item.orderAmount = item.orders.length;
      });
      this.setDataTable(customers);
      this.setLoading(false);
    });
  }

  @Action deleteCustomer(id: number): void {
    deleteData(`customers/${id.toString()}`)
      .then(_res => {
        this.getAllCustomers();
        appModule.sendSuccessNotice('Operation is done.');
      })
      .catch((err: TODO) => {
        console.log(err);
        appModule.sendErrorNotice('Operation failed! Please try again later. ');
        appModule.closeNoticeWithDelay(1500);
      });
  }

  @Action saveCustomer(customer: Customer): void {
    if (!customer.id) {
      postData('customers/', customer)
        .then(res => {
          const customer = res.data;
          this.setCustomer(customer);
          appModule.sendSuccessNotice('New customer has been added.');
          appModule.closeNoticeWithDelay(1500);
        })
        .catch((err: TODO) => {
          console.log(err);
          appModule.sendErrorNotice('Operation failed! Please try again later. ');
          appModule.closeNoticeWithDelay(1500);
        });
    } else {
      putData('customers/' + customer.id.toString(), customer)
        .then(res => {
          const customer = res.data;
          this.setCustomer(customer);
          appModule.sendSuccessNotice('Customer has been updated.');
          appModule.closeNoticeWithDelay(1500);
        })
        .catch((err: TODO) => {
          console.log(err);
          appModule.sendErrorNotice('Operation failed! Please try again later. ');
          appModule.closeNoticeWithDelay(1500);
        });
    }
  }

  @Action setDataTable(items: Customer[]) {
    const pagination = getPagination(items);
    this.setPagination(pagination);
    this.setItems(items);
  }

  @Mutation setOrderList(orders: Order[]): void {
    this.orders = orders;
  }
  @Mutation setItems(customers: Customer[]): void {
    this.items = customers;
  }
  @Mutation setPagination(pagination: TODO): void {
    this.pagination = pagination;
  }
  @Mutation setLoading(loading: boolean): void {
    this.loading = loading;
  }
  @Mutation setCustomer(customer: Customer): void {
    this.customer = customer;
  }
}

export const customerModule = getModule(CustomerModule); // Customers;
