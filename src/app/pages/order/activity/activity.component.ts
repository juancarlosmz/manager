import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.css']
})
export class ActivityComponent implements OnInit {

  allOrdersNew: Array<any> = [];

  statusView: Status[] = [
    {name: 'Choose...', value: 'null', },
    {name: 'Awaiting photos', value: '_awaitingphotos', },
    {name: 'Assigned designer - Lesley', value: '_ad_Lesley', },
    {name: 'Assigned designer - Wesley', value: '_ad_Wesley', },
    {name: 'Assigned designer - Jason', value: '_ad_Jason', },
    {name: 'Assigned designer - Grace', value: '_ad_Grace', },
    {name: 'Assigned designer - Liz', value: '_ad_Liz', },
    {name: 'In print queue', value: '_inprintq', },
    {name: 'At cutting station', value: '_atcuttings', },
    {name: 'Busy framing', value: '_busyframing', },
    {name: 'Awaiting packing', value: '_awaitingpacking', },
  ];

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

//
interface  Status {
  name: String;
  value: String;
}
