import { Component, OnInit, ElementRef } from '@angular/core';
import { ROUTES } from '../sidebar/sidebar.component';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  public focus;
  public listTitles: any[];
  public location: Location;
  carga: boolean = false;
  //El usuario
  idsesion: number;
  UsersClass: User = new User();
  validateRol: number = 0;
  firstname: string = '';
  lastname: string = '';

  constructor(
    location: Location,
    private element: ElementRef,
    private Ruta: Router,
    private UserInyected: UserService
  ) {
    this.location = location;
    this.idsesion = JSON.parse(localStorage.getItem('sessionUser'));
  }

  ngOnInit() {
    this.listTitles = ROUTES.filter(listTitle => listTitle);

    if(this.idsesion){
      this.UserInyected.leerUsuario(this.idsesion).subscribe((User_api)=>{
        this.UsersClass[0] = User_api[0];
        this.firstname = this.UsersClass[0].firstname;
        this.lastname = this.UsersClass[0].lastname;
        this.validateRol = this.UsersClass[0].rol;
      });
    }else{
      this.Ruta.navigateByUrl('/');
    }
  }
  getTitle(){
    var titlee = this.location.prepareExternalUrl(this.location.path());
    if(titlee.charAt(0) === '#'){
        titlee = titlee.slice( 1 );
    }

    for(var item = 0; item < this.listTitles.length; item++){
        if(this.listTitles[item].path === titlee){
            return this.listTitles[item].title;
        }
    }
    return 'Dashboard';
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
