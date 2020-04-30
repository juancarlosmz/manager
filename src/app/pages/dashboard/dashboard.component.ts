import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js';

// core components
import {
  chartOptions,
  parseOptions,
  chartExample1,
  chartExample2
} from "../../variables/charts";
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { OrderService } from 'src/app/services/order.service';
import { Order } from 'src/app/models/order';

interface Order2{
  order: string;
  numero: number;
  otro: string;
  fechavence: Date;
  contiene: boolean;
}

class Alumno{
  nombre: string;
  apellido: string;
  nivel: boolean;
  constructor(){
    this.nombre = this.nombre;
    this.apellido = this.apellido;
    this.nivel = this.nivel;
  }
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public datasets: any;
  public data: any;
  public salesChart;
  public clicked: boolean = true;
  public clicked1: boolean = false;

  allOrders: Array<Order> = new Array<Order>();

  public orders: Array<Order2> = [
    {
      order: 'trece1',
      numero: 15,
      otro: 'nose que mas',
      fechavence: new Date('04/15/2021'),
      contiene: true
    },
    {
      order: 'trece2',
      numero: 15,
      otro: 'nose que mas',
      fechavence: new Date('04/15/2021'),
      contiene: false
    },
    {
      order: 'trece3',
      numero: 15,
      otro: 'nose que mas',
      fechavence: new Date('04/15/2021'),
      contiene: true
    },
    {
      order: 'trece4',
      numero: 15,
      otro: 'nose que mas',
      fechavence: new Date('04/15/2021'),
      contiene: true
    }
  ];

  //El usuario
  idsesion: string;
  UsersClass: User = new User();
  validateRol: number = 0;

  constructor(
    private Ruta: Router,
    private UserInyected: UserService,
    private OrderInyected: OrderService,
  ) {
    //this.idsesion = JSON.parse(localStorage.getItem('sessionUser'));
    this.idsesion = localStorage.getItem('sessionUser');
  }

  ngOnInit() {
    this.userValidation();
    this.f_leerOrders();
  }

  userValidation(){
    if(this.idsesion){
      this.UserInyected.leerUsuario(this.idsesion).subscribe(
        (User_api)=>{
          this.UsersClass[0] = User_api[0];
          this.validateRol = this.UsersClass[0].rol;
        },
        error => {
          localStorage.removeItem('sessionUser');
          location.reload();
          this.Ruta.navigateByUrl('/');
        }
      );
    }else{
      this.Ruta.navigateByUrl('/');
    }
  }

  f_leerOrders(){
    this.OrderInyected.leerOrders().subscribe((Orders_api)=>{
      this.allOrders = Orders_api;
    });
  }

  public updateOptions() {

  }
  f_login(){}

}
