import { Order } from './../models/order';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  //ruta: string = 'http://localhost:50/backend_manager/api/shopify';
  //jeremy
  ruta: string = 'https://canvasandmorephotos.co.za/BackEnd_manager/api/shopify';

  orderService: Order = new Order();
  constructor(private http: HttpClient) { }

  leerOrders(): Observable<any>{
    return this.http.get<any>(this.ruta + '/Orders.php');
  }
  leerOrdersPaid(): Observable<any>{
    return this.http.get<any>(this.ruta + '/OrdersPaid.php');
  }
  leerOrdersPending(): Observable<any>{
    return this.http.get<any>(this.ruta + '/OrdersPending.php');
  }


}
