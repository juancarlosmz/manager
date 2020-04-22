import { Rol } from 'src/app/models/rol';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-auth-layout',
  templateUrl: './auth-layout.component.html',
  styleUrls: ['./auth-layout.component.scss']
})
export class AuthLayoutComponent implements OnInit, OnDestroy {
  test: Date = new Date();
  public isCollapsed = true;

  //El usuario
  UsersClass: User = new User();
  validateRol: number = 0;
  idsesion: number;

  constructor(
    private Ruta: Router,
    private UserInyected: UserService
  ) {
    this.idsesion = JSON.parse(localStorage.getItem('sessionUser'));
  }

  ngOnInit() {
    var html = document.getElementsByTagName("html")[0];
    html.classList.add("auth-layout");
    var body = document.getElementsByTagName("body")[0];
    body.classList.add("bg-default");
    this.Ruta.events.subscribe((event) => {
      this.isCollapsed = true;
    });
    this.userValidation();
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

  ngOnDestroy() {
    var html = document.getElementsByTagName("html")[0];
    html.classList.remove("auth-layout");
    var body = document.getElementsByTagName("body")[0];
    body.classList.remove("bg-default");
  }
}
