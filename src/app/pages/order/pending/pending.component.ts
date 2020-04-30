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
  //banderita
  bandera: boolean = false;

  // formulario
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

  // note from api change status
  status: string = 'null';

  //El usuario
  idsesion: string;
  iduser: number;
  UsersClass: User = new User();
  validateRol: number = 0;

  //
  statusView: Status[] = [
    {name: 'Choose...', value: 'null', },
    {name: 'New', value: '_new', },
    {name: 'In progress', value: '_inprogress', },
    {name: 'Printing', value: '_printing', },
  ];

  StatusSelected: string;
  allOrdersPending: Array<Order> = new Array<Order>();

  // add new values
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

  ngOnInit(): void {
    this.userValidation();
    this.f_leerOrdersPending();
  }

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

      // para mi registro
      this.neworder2 = {iduser: this.iduser, idorder: idvalid, number: parseInt(numbervalid), customer: customervalid, total: totalvalid, status: this.StatusSelected};
      this.arrayOrders2.push(this.neworder2);
      this.newordersend2 = { Mydata: this.arrayOrders2 };

      // envia al api el cambio de note
      if (notevalid.includes('_new')) {
        this.neworder = { id: e.target.value, note: notevalid.replace('_new', this.StatusSelected)};
      } else if ((notevalid.includes('_framing'))) {
        this.neworder = { id: e.target.value, note: notevalid.replace('_framing', this.StatusSelected)};
      } else if ((notevalid.includes('_inprogress'))) {
        this.neworder = { id: e.target.value, note: notevalid.replace('_inprogress', this.StatusSelected)};
      } else if ((notevalid.includes('_printing'))) {
        this.neworder = { id: e.target.value, note: notevalid.replace('_printing', this.StatusSelected)};
      } else {
        this.neworder = { id: e.target.value, note: notevalid + ' ' + this.StatusSelected};
      }

      this.arrayOrders.push(this.neworder);
      this.newordersend = { Mydata: this.arrayOrders };

    } else {
      let i: number = 0;
      checkArray.controls.forEach((item: FormControl) => {
        if (item.value === e.target.value) {
          checkArray.removeAt(i);
          // borra el registro
          this.arrayOrders2.splice(i, 1);
          this.newordersend2 = { Mydata: this.arrayOrders2 };

          // borra registro de api
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
    // tslint:disable-next-line: forin
    for( const ord in this.arrayOrders2 ) {
      this.arrayOrders2[ord].status = e.target.value;
    }
  }

  submitForm(operation) {

    switch (operation) {
      case 'cancel':
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

            this.OrderInyected.registrarOrdennew(this.newordersend2).subscribe((orderRecibido)=>{
              this.arrayOrders2 = [];
              this.newordersend2 = { Mydata: '' };
              setTimeout(() => {
                this.f_leerOrdersPending();
                Swal.fire(
                  this.StatusSelected + '!',
                  'Order has been ' + this.StatusSelected + '.',
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

}
// new value order
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

//
interface  Status {
  name: String;
  value: String;
}
