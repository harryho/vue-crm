export class Order {
    constructor () {
        this.id = "";
        this.reference = "";
        this.customerId = "";
        this.customer = "";
        this.products = [];
        this.amount = 0;
        this.orderDate = null;
        this.shippedDate =  null;
        this.shipAddress = {
            address: "",
            city: "",
            zipcode: "",
            country: ""
        }
    }
}