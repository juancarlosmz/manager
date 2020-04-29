import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { Order } from 'src/app/models/order';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { OrderService } from 'src/app/services/order.service';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-pending',
  templateUrl: './pending.component.html',
  styleUrls: ['./pending.component.css']
})

export class PendingComponent implements OnInit {
  // formulario
  form: FormGroup;
  neworder: NewOrder;
  newordersend: NewOrderSend;

  //El usuario
  idsesion: string;
  UsersClass: User = new User();
  validateRol: number = 0;

  Status: string[] = ['testing'];
  StatusSelected: string;
  allOrdersPending: Array<Order> = new Array<Order>();

  // add new values
  arrayOrders: any = [];
  constructor(
    private Ruta: Router,
    private UserInyected: UserService,
    private OrderInyected: OrderService,
    private fb: FormBuilder,
  ) {
    this.idsesion = localStorage.getItem('sessionUser');
    this.form = this.fb.group({
      checkArray: this.fb.array([], [Validators.required])
    });
  }

  ngOnInit(): void {
    this.userValidation();
    this.f_leerOrdersPending();
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
          this.Ruta.navigateByUrl('/');
        }
      );
    }else{
      this.Ruta.navigateByUrl('/');
    }
  }

  f_leerOrdersPending(){
    this.OrderInyected.leerOrdersPending().subscribe((Orders_api)=>{
      this.allOrdersPending = Orders_api;
    });
  }

  onCheckboxChange(e) {
    const checkArray: FormArray = this.form.get('checkArray') as FormArray;

    if (e.target.checked) {
      checkArray.push(new FormControl(e.target.value));
    } else {
      let i: number = 0;
      checkArray.controls.forEach((item: FormControl) => {
        if (item.value === e.target.value) {
          checkArray.removeAt(i);
          return;
        }
        i++;
      });
    }
  }

  onSelectChange(e) {
    this.StatusSelected = e.target.value;
  }

  submitForm(operation) {

    switch (operation) {
      case 'cancel':
        // tslint:disable-next-line: forin
        for ( const ord in this.form.value.checkArray ) {
          // tslint:disable-next-line: radix
          this.neworder = { id: this.form.value.checkArray[ord], note: this.StatusSelected};
          this.arrayOrders.push(this.neworder);
        }
        this.newordersend = { Mydata: this.arrayOrders };
        console.log(this.newordersend);
        Swal.fire({
          title: 'Are you sure?',
          text: "You won't be able to revert this!",
          icon: 'question',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes!'
        }).then((result) => {
          if (result.value) {
    /*
            this.OrderInyected.actualizaOrden(this.newordersend).subscribe((orderRecibido)=>{
              this.arrayOrders = [];
              console.log(orderRecibido);
              this.f_leerOrdersPending();
              Swal.fire(
                'Paid!',
                'Order has been paid.',
                'success'
              );
            });
    */

            /* this.OrderInyected.cancelOrden(this.newordersend).subscribe((orderRecibido)=>{
              this.arrayOrders = [];
              console.log(orderRecibido);
              this.f_leerOrdersPending();
              Swal.fire(
                'Paid!',
                'Order has been paid.',
                'success'
              );
            }); */

          }else{

          }
        });
        break;
      case 'open':
        console.log('open');
        break;
      case 'close':
        console.log('close');
        break;
      default:
        console.log('No hay nada');
    }




  }

}
// new value order
interface  NewOrder {
  id: number;
  note: String;
}
interface  NewOrderSend {
  Mydata: String;
}
