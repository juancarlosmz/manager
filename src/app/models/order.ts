import { billing_address } from 'src/app/models/billing_address';
export class Order{
  id: number;
  number: string;
  billing_address: billing_address;
  value: string;
  date: Date;
  constructor(){
    this.id = this.id;
    this.number = this.number;
    this.billing_address = this.billing_address;
    this.value = this.value;
    this.date = this.date;
  }
}
