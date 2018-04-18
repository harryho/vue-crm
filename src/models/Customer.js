// import User from './user'

export class User {
  constructor () {
    this.id = "";
    this.firstName = "";
    this.lastName = "";
    this.email = "";
    this.avatar = "";
    this.mobile = "";
    this.homephone = "";
    this.workphone = "";
  }
}


export class Customer extends User {

  constructor () {
    super();
    this.membership = true;
    this.rewards = 0;
    this.orders = [];
  }
}
