import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { Order } from 'src/app/models/order';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-pending',
  templateUrl: './pending.component.html',
  styleUrls: ['./pending.component.css']
})
export class PendingComponent implements OnInit {
  //El usuario
  idsesion: number;
  UsersClass: User = new User();
  validateRol: number = 0;

  allOrdersPending: Array<Order> = new Array<Order>();
  constructor(
    private Ruta: Router,
    private UserInyected: UserService,
    private OrderInyected: OrderService,
  ) {
    this.idsesion = JSON.parse(localStorage.getItem('sessionUser'));
  }

  ngOnInit(): void {
    this.userValidation();
    this.f_leerOrdersPending();
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

  f_leerOrdersPending(){
    this.OrderInyected.leerOrdersPending().subscribe((Orders_api)=>{
      this.allOrdersPending = Orders_api;
    });
  }

}
