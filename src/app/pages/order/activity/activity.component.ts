import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.css']
})
export class ActivityComponent implements OnInit {

  // Pagination
  config: any;
  totalOrdenes: number = 250;

  // carga
  carga: boolean = true;

  //
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

  // El usuario
  idsesion: string;
  iduser: number;
  validateRol: number = 0;

  constructor(
    private Ruta: Router,
    private OrderInyected: OrderService,
    private UserInyected: UserService,
  ) {
    this.idsesion = localStorage.getItem('sessionUser');

    // pagination
    this.config = {
      itemsPerPage: 25,
      currentPage: 1,
      totalItems: 250
    };
  }

  ngOnInit(): void {
    this.userValidation();
  }

  userValidation(){
    if (this.idsesion) {
      this.UserInyected.leerUsuario(this.idsesion).subscribe(
        (User_api)=>{
          this.iduser = User_api[0].id;
          this.validateRol = User_api[0].rol;
          if (this.validateRol == 1) {
            this.OrderInyected.leerOrdersNewrol1().subscribe((Orders_api)=>{
              this.allOrdersNew = Orders_api;
              this.carga = false;
            });
          }else if(this.validateRol == 2){
            this.OrderInyected.leerOrdersNewrol1().subscribe((Orders_api)=>{
              this.allOrdersNew = Orders_api;
              this.carga = false;
            });
          }else if(this.validateRol == 3){
            this.OrderInyected.leerOrdersNewrol3().subscribe((Orders_api)=>{
              this.allOrdersNew = Orders_api;
              this.carga = false;
            });
          }else if(this.validateRol == 4){
            this.OrderInyected.leerOrdersNewrol4().subscribe((Orders_api)=>{
              this.allOrdersNew = Orders_api;
              this.carga = false;
            });
          }else if(this.validateRol == 5){
            this.OrderInyected.leerOrdersNewrol5().subscribe((Orders_api)=>{
              this.allOrdersNew = Orders_api;
              this.carga = false;
            });
          }else if(this.validateRol == 6){
            this.OrderInyected.leerOrdersNewrol6().subscribe((Orders_api)=>{
              this.allOrdersNew = Orders_api;
              this.carga = false;
            });
          }else if(this.validateRol == 7){
            this.OrderInyected.leerOrdersNewrol7().subscribe((Orders_api)=>{
              this.allOrdersNew = Orders_api;
              this.carga = false;
            });
          }else if(this.validateRol == 8){
            this.OrderInyected.leerOrdersNewrol8().subscribe((Orders_api)=>{
              this.allOrdersNew = Orders_api;
              this.carga = false;
            });
          }else if(this.validateRol == 9){
            this.OrderInyected.leerOrdersNewrol9().subscribe((Orders_api)=>{
              this.allOrdersNew = Orders_api;
              this.carga = false;
            });
          }else if(this.validateRol == 10){
            this.OrderInyected.leerOrdersNewrol10().subscribe((Orders_api)=>{
              this.allOrdersNew = Orders_api;
              this.carga = false;
            });
          }else if(this.validateRol == 11){
            this.OrderInyected.leerOrdersNewrol11().subscribe((Orders_api)=>{
              this.allOrdersNew = Orders_api;
              this.carga = false;
            });
          }

          // pagination
          this.config = {
            itemsPerPage: 25,
            currentPage: 1,
            totalItems: this.allOrdersNew.length
          };

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

  //paginacion
  pageChanged(event){
    this.config.currentPage = event;
  }


}

//
interface  Status {
  name: String;
  value: String;
}
