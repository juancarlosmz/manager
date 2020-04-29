import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/dashboard', title: 'Dashboard',  icon: 'ni-tv-2 text-primary', class: '' },
    { path: '/users', title: 'Users register',  icon: 'fas fa-users text-pink', class: '' },
    { path: '/dashboard/paid', title: 'Paid',  icon: 'fas fa-dollar-sign text-success', class: '' },
    { path: '/dashboard/pending', title: 'Pending',  icon: 'fas fa-hourglass text-info', class: '' },

];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  public menuItems: any[];
  public isCollapsed = true;
  carga: boolean = false;
  //El usuario
  idsesion: string;
  UsersClass: User = new User();
  validateRol: number = 0;
  firstname: string = '';

  constructor(
    private Ruta: Router,
    private UserInyected: UserService
  ) {
    //this.idsesion = JSON.parse(localStorage.getItem('sessionUser'));
    this.idsesion = localStorage.getItem('sessionUser');
  }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
    this.Ruta.events.subscribe((event) => {
      this.isCollapsed = true;
    });
    if(this.idsesion){
      this.UserInyected.leerUsuario(this.idsesion).subscribe(
        (User_api)=>{
          this.UsersClass[0] = User_api[0];
          this.firstname = this.UsersClass[0].firstname;
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
  f_cerrarsesion(){
    this.carga = true;
    localStorage.removeItem('sessionUser');
    setTimeout(() => {
      this.carga = false;
      this.Ruta.navigateByUrl('/');
    },1000);
  }
}
