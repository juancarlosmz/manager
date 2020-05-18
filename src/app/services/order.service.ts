import { Order } from './../models/order';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  ruta: string = 'http://localhost:50/backend_manager/api';
  //jeremy
  // ruta: string = 'https://canvasandmorephotos.co.za/BackEnd_manager/api';

  orderService: Order = new Order();
  constructor(private http: HttpClient) { }

  leerOrders(): Observable<any>{
    return this.http.get<any>(this.ruta + '/shopify/Orders.php');
  }
  leerOrdersNew(): Observable<any>{
    return this.http.get<any>(this.ruta + '/server/OrdersNew.php');
  }
  leerOrdersNewrol0(): Observable<any>{
    return this.http.get<any>(this.ruta + '/server/OrdersNew.php');
  }
  leerOrdersNewrol1(): Observable<any>{
    return this.http.get<any>(this.ruta + '/server/OrdersNew1.php');
  }
  leerOrdersNewrol2(): Observable<any>{
    return this.http.get<any>(this.ruta + '/server/OrdersNew1.php');
  }
  leerOrdersNewrol3(): Observable<any>{
    return this.http.get<any>(this.ruta + '/server/OrdersNew3.php');
  }
  leerOrdersNewrol4(): Observable<any>{
    return this.http.get<any>(this.ruta + '/server/OrdersNew4.php');
  }
  leerOrdersNewrol5(): Observable<any>{
    return this.http.get<any>(this.ruta + '/server/OrdersNew5.php');
  }
  leerOrdersNewrol6(): Observable<any>{
    return this.http.get<any>(this.ruta + '/server/OrdersNew6.php');
  }
  leerOrdersNewrol7(): Observable<any>{
    return this.http.get<any>(this.ruta + '/server/OrdersNew7.php');
  }
  leerOrdersNewrol8(): Observable<any>{
    return this.http.get<any>(this.ruta + '/server/OrdersNew8.php');
  }
  leerOrdersNewrol9(): Observable<any>{
    return this.http.get<any>(this.ruta + '/server/OrdersNew9.php');
  }
  leerOrdersNewrol10(): Observable<any>{
    return this.http.get<any>(this.ruta + '/server/OrdersNew10.php');
  }
  leerOrdersNewrol11(): Observable<any>{
    return this.http.get<any>(this.ruta + '/server/OrdersNew11.php');
  }

  leerSettime(): Observable<any>{
    return this.http.get<any>(this.ruta + '/server/Settime.php');
  }

  editSettime(objeto): Observable<any>{
    return this.http.post<any>(this.ruta + '/server/editSettime.php',
    {mydata: objeto},
    {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' }
    }
    );
  }

  leerOrdersPaid(): Observable<any>{
    return this.http.get<any>(this.ruta + '/shopify/OrdersPaid.php');
  }
  leerOrdersPending(): Observable<any>{
    return this.http.get<any>(this.ruta + '/shopify/OrdersPending.php');
  }
  actualizaOrden(arrayOrder): Observable<any>{
    return this.http.post<any>(this.ruta + '/shopify/PutOrder.php',
    arrayOrder,
    {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' }
    }
    );
  }
  cancelOrden(arrayOrder): Observable<any>{
    return this.http.post<any>(this.ruta + '/shopify/CancelOrderno.php',
    arrayOrder,
    {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' }
    }
    );
  }

  registrarOrdennew(arrayOrder): Observable<any>{
    return this.http.post<any>(this.ruta + '/server/registrarOrder.php',
    arrayOrder,
    {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' }
    }
    );
  }

}
