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
    this.isActive = true;
    this.age = 0;
    this.orders = [];
  }
}
