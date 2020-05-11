import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { OrderService } from 'src/app/services/order.service';
import { Order } from 'src/app/models/order';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-paid',
  templateUrl: './paid.component.html',
  styleUrls: ['./paid.component.css']
})

export class PaidComponent implements OnInit {
  // Banderita
  bandera: boolean = false;

  // Pagination
  config: any;
  totalOrdenes: number = 250;

  // formulario
  form: FormGroup;
  neworder: NewOrder;
  neworder2: NewOrder2 = {
    iduser: null,
    nameuser: null,
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

  // El usuario
  idsesion: string;
  iduser: number;
  nameuser: string;
  lastnameuser: string;
  UsersClass: User = new User();
  validateRol: number = 0;

  // carga
  carga: boolean = true;
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
  allOrdersPaid: Array<Order> = new Array<Order>();

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
    // pagination
    this.config = {
      itemsPerPage: 25,
      currentPage: 1,
      totalItems: 250
    };
  }

  ngOnInit(): void {
    this.userValidation();
    this.f_leerOrdersPaid();
  }

  userValidation(){
    if (this.idsesion) {
      this.UserInyected.leerUsuario(this.idsesion).subscribe(
        (User_api)=>{
          this.UsersClass[0] = User_api[0];
          this.iduser = User_api[0].id;
          this.nameuser = User_api[0].firstname;
          this.lastnameuser = User_api[0].lastname;
          this.validateRol = this.UsersClass[0].rol;
        },
        error => {
          localStorage.removeItem('sessionUser');
          location.reload();
          this.Ruta.navigateByUrl('/');
        }
      );
    } else {
      this.Ruta.navigateByUrl('/');
    }
  }

  f_leerOrdersPaid() {
    this.OrderInyected.leerOrders().subscribe((Orders_api)=>{
      this.allOrdersPaid = Orders_api;

      console.log(Orders_api['orders'].length);
      console.log('el usuario', this.validateRol);
      for (let index = 0; index < Orders_api['orders'].length; index++) {
        const element = Orders_api['orders'][index];
        if(element.note){
          if (element.note.includes('_awaitingphotos')) {
            // this.neworder = { id: e.target.value, note: notevalid.replace('_awaitingphotos', this.StatusSelected)};
            console.log('user 1');
          } else if ((element.note.includes('_ad_Lesley'))) {
            // this.neworder = { id: e.target.value, note: notevalid.replace('_ad_Lesley', this.StatusSelected)};
            console.log('user 2');
          } else if ((element.note.includes('_ad_Wesley'))) {
            // this.neworder = { id: e.target.value, note: notevalid.replace('_ad_Wesley', this.StatusSelected)};
            console.log('user 3');
          } else if ((element.note.includes('_ad_Jason'))) {
            // this.neworder = { id: e.target.value, note: notevalid.replace('_ad_Jason', this.StatusSelected)};
            console.log('user 4');
          } else if ((element.note.includes('_ad_Grace'))) {
            // this.neworder = { id: e.target.value, note: notevalid.replace('_ad_Grace', this.StatusSelected)};
            console.log('user 5');
          }  else if ((element.note.includes('_ad_Liz'))) {
            // this.neworder = { id: e.target.value, note: notevalid.replace('_ad_Liz', this.StatusSelected)};
            console.log('user 6');
          }  else if ((element.note.includes('_inprintq'))) {
            // this.neworder = { id: e.target.value, note: notevalid.replace('_inprintq', this.StatusSelected)};
            console.log('user 7');
          }  else if ((element.note.includes('_atcuttings'))) {
            // this.neworder = { id: e.target.value, note: notevalid.replace('_atcuttings', this.StatusSelected)};
            console.log('user 8');
          }  else if ((element.note.includes('_busyframing'))) {
            // this.neworder = { id: e.target.value, note: notevalid.replace('_busyframing', this.StatusSelected)};
            console.log('user 9');
          }  else if ((element.note.includes('_awaitingpacking'))) {
            // this.neworder = { id: e.target.value, note: notevalid.replace('_awaitingpacking', this.StatusSelected)};
            console.log('user 10');
          }  else {
            // this.neworder = { id: e.target.value, note: notevalid + ' ' + this.StatusSelected};
            console.log('user 11');
          }
        }
        // console.log('que es esto', element.note);
      }
      /* console.log(Orders_api['orders'].note.includes('_ad_Lesley'));
      console.log(Orders_api['orders'].note.includes('_ad_Jason'));
      console.log(Orders_api['orders'].note.includes('_ad_Grace'));
      console.log(Orders_api['orders'].note.includes('_ad_Liz'));
      console.log(Orders_api['orders'].note.includes('_inprintq'));
      console.log(Orders_api['orders'].note.includes('_atcuttings'));
      console.log(Orders_api['orders'].note.includes('_busyframing'));
      console.log(Orders_api['orders'].note.includes('_awaitingpacking')); */
    // pagination
      this.config = {
        itemsPerPage: 25,
        currentPage: 1,
        totalItems: this.allOrdersPaid.length
      };
      this.carga = false;
    });
  }
  pageChanged(event){
    this.config.currentPage = event;
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
      this.neworder2 = {iduser: this.iduser, nameuser: this.nameuser+' '+this.lastnameuser , idorder: idvalid, number: parseInt(numbervalid), customer: customervalid, total: totalvalid, status: this.StatusSelected};
      this.arrayOrders2.push(this.neworder2);
      this.newordersend2 = { Mydata: this.arrayOrders2 };
      console.log('para mi registro esta ok creo ',this.newordersend2);

      // envia al api el cambio de note
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
      console.log('para el api shopify',this.newordersend);
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

    for( const ord in this.arrayOrders2 ) {
      this.arrayOrders2[ord].status = e.target.value;
    }
    for( const ord in this.arrayOrders ) {
      // envia al api el cambio de note
      if (this.arrayOrders[ord].note.includes('_awaitingphotos')) {
        this.arrayOrders[ord].note = this.arrayOrders[ord].note.replace('_awaitingphotos', this.StatusSelected);
      } else if ((this.arrayOrders[ord].note.includes('_ad_Lesley'))) {
        this.arrayOrders[ord].note = this.arrayOrders[ord].note.replace('_ad_Lesley', this.StatusSelected);
      } else if ((this.arrayOrders[ord].note.includes('_ad_Wesley'))) {
        this.arrayOrders[ord].note = this.arrayOrders[ord].note.replace('_ad_Wesley', this.StatusSelected);
      } else if ((this.arrayOrders[ord].note.includes('_ad_Jason'))) {
        this.arrayOrders[ord].note = this.arrayOrders[ord].note.replace('_ad_Jason', this.StatusSelected);
      } else if ((this.arrayOrders[ord].note.includes('_ad_Grace'))) {
        this.arrayOrders[ord].note = this.arrayOrders[ord].note.replace('_ad_Grace', this.StatusSelected);
      }  else if ((this.arrayOrders[ord].note.includes('_ad_Liz'))) {
        this.arrayOrders[ord].note = this.arrayOrders[ord].note.replace('_ad_Liz', this.StatusSelected);
      }  else if ((this.arrayOrders[ord].note.includes('_inprintq'))) {
        this.arrayOrders[ord].note = this.arrayOrders[ord].note.replace('_inprintq', this.StatusSelected);
      }  else if ((this.arrayOrders[ord].note.includes('_atcuttings'))) {
        this.arrayOrders[ord].note = this.arrayOrders[ord].note.replace('_atcuttings', this.StatusSelected);
      }  else if ((this.arrayOrders[ord].note.includes('_busyframing'))) {
        this.arrayOrders[ord].note = this.arrayOrders[ord].note.replace('_busyframing', this.StatusSelected);
      }  else if ((this.arrayOrders[ord].note.includes('_awaitingpacking'))) {
        this.arrayOrders[ord].note = this.arrayOrders[ord].note.replace('_awaitingpacking', this.StatusSelected);
      } else if ((this.arrayOrders[ord].note.includes('undefined'))) {
        this.arrayOrders[ord].note = this.arrayOrders[ord].note.replace('undefined', this.StatusSelected);
      } else {
        this.arrayOrders[ord].note = this.arrayOrders[ord].note + ' ' + this.StatusSelected;
      }
    }

    // tslint:disable-next-line: forin
    console.log('para mi registro esta ok creo ',this.newordersend2);
    console.log('para el api shopify',this.newordersend);
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
                this.f_leerOrdersPaid();
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

}
// new value order
interface  NewOrder {
  id: number;
  note: String;
}
interface  NewOrder2 {
  iduser: number;
  nameuser: string;
  idorder: string;
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
