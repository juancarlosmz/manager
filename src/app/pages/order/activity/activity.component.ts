import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.css']
})
export class ActivityComponent implements OnInit {

  allOrdersNew: Array<any> = [];

  constructor(
    private OrderInyected: OrderService,
  ) { }

  ngOnInit(): void {
    this.f_leerOrdersNew();
  }

  f_leerOrdersNew() {
    this.OrderInyected.leerOrdersNew().subscribe((Orders_api)=>{
      this.allOrdersNew = Orders_api;
      console.log(this.allOrdersNew);
    });
  }

}
