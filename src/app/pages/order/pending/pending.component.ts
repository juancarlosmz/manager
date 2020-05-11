import { Component, OnInit } from '@angular/core';
/*

import { User } from 'src/app/models/user';
import { Order } from 'src/app/models/order';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { OrderService } from 'src/app/services/order.service';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import Swal from 'sweetalert2';
*/

@Component({
  selector: 'app-pending',
  templateUrl: './pending.component.html',
  styleUrls: ['./pending.component.css']
})

export class PendingComponent implements OnInit {
/*
  bandera: boolean = false;


  form: FormGroup;
  neworder: NewOrder;
  neworder2: NewOrder2 = {
    iduser: null,
    idorder: null,
    number: null,
    customer: null,
    total: null,
    status: 'null',
  };
  newordersend: NewOrderSend;
  newordersend2: NewOrderSend2;


  status: string = 'null';


  idsesion: string;
  iduser: number;
  UsersClass: User = new User();
  validateRol: number = 0;

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

  StatusSelected: string;
  allOrdersPending: Array<Order> = new Array<Order>();

  arrayOrders: any = [];
  arrayOrders2: any = [];
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
*/
  ngOnInit(): void {
/*
    this.userValidation();
    this.f_leerOrdersPending();
    */
  }
/*
  userValidation(){
    if(this.idsesion){
      this.UserInyected.leerUsuario(this.idsesion).subscribe(
        (User_api)=>{
          this.UsersClass[0] = User_api[0];
          this.iduser = User_api[0].id;
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

  f_leerOrdersPending(){
    this.OrderInyected.leerOrdersPending().subscribe((Orders_api)=>{
      this.allOrdersPending = Orders_api;
    });
  }

  onCheckboxChange(e) {
    const checkArray: FormArray = this.form.get('checkArray') as FormArray;

    if (e.target.checked) {
      checkArray.push(new FormControl(e.target.value));
      const id = document.getElementById('id-' + e.target.value);
      let idvalid;
      const number = document.getElementById('number-' + e.target.value);
      let numbervalid;
      const customer = document.getElementById('customer-' + e.target.value);
      let customervalid = '';
      const total = document.getElementById('total-' + e.target.value);
      let totalvalid;
      const note = document.getElementById('note-' + e.target.value);
      let notevalid;
      if (id) {idvalid = id.innerText; } else {idvalid = null; }
      if (number) {numbervalid = number.innerText; } else {numbervalid = null; }
      if (customer) {customervalid = customer.innerText; } else {customervalid = null; }
      if (total) {totalvalid = total.innerText; } else {totalvalid = null; }
      if (note) {notevalid = note.innerText; } else {notevalid = ''; }

      this.neworder2 = {iduser: this.iduser, idorder: idvalid, number: parseInt(numbervalid), customer: customervalid, total: totalvalid, status: this.StatusSelected};
      this.arrayOrders2.push(this.neworder2);
      this.newordersend2 = { Mydata: this.arrayOrders2 };

      if (notevalid.includes('_awaitingphotos')) {
        this.neworder = { id: e.target.value, note: notevalid.replace('_awaitingphotos', this.StatusSelected)};
      } else if ((notevalid.includes('_ad_Lesley'))) {
        this.neworder = { id: e.target.value, note: notevalid.replace('_ad_Lesley', this.StatusSelected)};
      } else if ((notevalid.includes('_ad_Wesley'))) {
        this.neworder = { id: e.target.value, note: notevalid.replace('_ad_Wesley', this.StatusSelected)};
      } else if ((notevalid.includes('_ad_Jason'))) {
        this.neworder = { id: e.target.value, note: notevalid.replace('_ad_Jason', this.StatusSelected)};
      } else if ((notevalid.includes('_ad_Grace'))) {
        this.neworder = { id: e.target.value, note: notevalid.replace('_ad_Grace', this.StatusSelected)};
      }  else if ((notevalid.includes('_ad_Liz'))) {
        this.neworder = { id: e.target.value, note: notevalid.replace('_ad_Liz', this.StatusSelected)};
      }  else if ((notevalid.includes('_inprintq'))) {
        this.neworder = { id: e.target.value, note: notevalid.replace('_inprintq', this.StatusSelected)};
      }  else if ((notevalid.includes('_atcuttings'))) {
        this.neworder = { id: e.target.value, note: notevalid.replace('_atcuttings', this.StatusSelected)};
      }  else if ((notevalid.includes('_busyframing'))) {
        this.neworder = { id: e.target.value, note: notevalid.replace('_busyframing', this.StatusSelected)};
      }  else if ((notevalid.includes('_awaitingpacking'))) {
        this.neworder = { id: e.target.value, note: notevalid.replace('_awaitingpacking', this.StatusSelected)};
      }  else {
        this.neworder = { id: e.target.value, note: notevalid + ' ' + this.StatusSelected};
      }

      this.arrayOrders.push(this.neworder);
      this.newordersend = { Mydata: this.arrayOrders };

    } else {
      let i: number = 0;
      checkArray.controls.forEach((item: FormControl) => {
        if (item.value === e.target.value) {
          checkArray.removeAt(i);
          this.arrayOrders2.splice(i, 1);
          this.newordersend2 = { Mydata: this.arrayOrders2 };
          this.arrayOrders.splice(i, 1);
          this.newordersend = { Mydata: this.arrayOrders };
          return;
        }
        i++;
      });
    }
  }

  onSelectChange(e) {
    this.StatusSelected = e.target.value;
    if (this.StatusSelected === 'null') {
      this.bandera = false;
    } else {
      this.bandera = true;
    }
    for( const ord in this.arrayOrders2 ) {
      this.arrayOrders2[ord].status = e.target.value;
    }
  }

  submitForm(operation) {

    switch (operation) {
      case 'save':
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

            this.OrderInyected.actualizaOrden(this.newordersend).subscribe((orderRecibido)=>{
              this.arrayOrders = [];
              this.newordersend = { Mydata: '' };
            });
            this.OrderInyected.registrarOrdennew(this.newordersend2).subscribe((orderRecibido)=>{
              this.arrayOrders2 = [];
              this.newordersend2 = { Mydata: '' };
              setTimeout(() => {
                this.f_leerOrdersPending();
                Swal.fire(
                  'Changed !',
                  'Order has been changed',
                  'success'
                );
              }, 500);
            });

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
*/




}
/*
interface  NewOrder {
  id: number;
  note: String;
}
interface  NewOrder2 {
  iduser: number;
  idorder: number;
  number: number;
  customer: string;
  total: string;
  status: String;
}
interface  NewOrderSend {
  Mydata: String;
}

interface  NewOrderSend2 {
  Mydata: String;
}

interface  Status {
  name: String;
  value: String;
}
*/
