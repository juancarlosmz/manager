import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { OrderService } from 'src/app/services/order.service';
import { Order } from 'src/app/models/order';

@Component({
  selector: 'app-paid',
  templateUrl: './paid.component.html',
  styleUrls: ['./paid.component.css']
})
export class PaidComponent implements OnInit {
  //El usuario
  idsesion: string;
  UsersClass: User = new User();
  validateRol: number = 0;

  allOrdersPaid: Array<Order> = new Array<Order>();

  constructor(
    private Ruta: Router,
    private UserInyected: UserService,
    private OrderInyected: OrderService,
  ) {
    //this.idsesion = JSON.parse(localStorage.getItem('sessionUser'));
    this.idsesion = localStorage.getItem('sessionUser');
  }

  ngOnInit(): void {
    this.userValidation();
    this.f_leerOrdersPaid();
  }

  userValidation(){
    if(this.idsesion){
      this.UserInyected.leerUsuario(this.idsesion).subscribe((User_api)=>{
        this.UsersClass[0] = User_api[0];
        this.validateRol = this.UsersClass[0].rol;
      });
    }else{
      this.Ruta.navigateByUrl('/');
    }
  }

  f_leerOrdersPaid(){
    this.OrderInyected.leerOrdersPaid().subscribe((Orders_api)=>{
      this.allOrdersPaid = Orders_api;
    });
  }

}
