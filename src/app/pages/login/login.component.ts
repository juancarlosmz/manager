import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  formularioLogin: FormGroup;
  UsersClass: Array<User> = new Array<User>();
  alerta: boolean = false;
  textAlerta: string = '';
  carga: boolean = false;
  idsesion: string;

  constructor(
    private Ruta: Router,
    private location: Location,
    private fb: FormBuilder,
    private UserInyected: UserService
  ) {
    //this.idsesion = JSON.parse(localStorage.getItem('sessionUser'));
    this.idsesion = localStorage.getItem('sessionUser');
  }

  ngOnInit() {
    this.crearFormulario();
    this.userValidation();
  }
  ngOnDestroy() {
  }

  userValidation(){
    if(this.idsesion){
      this.UserInyected.leerUsuario(this.idsesion).subscribe((User_api)=>{
        this.Ruta.navigateByUrl('/dashboard');
      });
    }else{
      this.Ruta.navigateByUrl('/');
    }
  }

  crearFormulario(){
    this.formularioLogin = this.fb.group({
      email: ['', Validators.compose([
        Validators.required, Validators.email
      ])],
      passwd: ['', Validators.required],
    });
  }

  f_login(){
    this.carga = true;
    if(this.formularioLogin.valid){
      this.UserInyected.loginUsuario(this.formularioLogin.value.email, this.formularioLogin.value.passwd).subscribe((login_api)=>{

        console.log(login_api);
        if(login_api){
          localStorage.setItem('sessionUser', login_api);
          setTimeout(() => {
            this.carga = false;
            this.Ruta.navigateByUrl('/dashboard');
          },1000);
        }else{
          this.alerta = true;
          this.textAlerta = 'User does not exists';
          setTimeout (() => {
            this.alerta = false;
          }, 3000);
          this.carga = false;
          this.formularioLogin.reset();
        }
/*
        if(login_api){
          localStorage.setItem('sessionUser', login_api[0].id );
          setTimeout(() => {
            this.carga = false;
            this.Ruta.navigateByUrl('/dashboard');
          },1000);
        }else{
          this.alerta = true;
          this.textAlerta = "User doesn't exists";
          setTimeout (() => {
            this.alerta = false;
          }, 3000);
          this.carga = false;
          this.formularioLogin.reset();
        }
*/

      });
    }else{
      this.alerta = true;
      this.textAlerta = "Required fields";
      setTimeout (() => {
        this.alerta = false;
      }, 3000);
      this.carga = false;
    }

  }

  f_leersessionUser(){
    console.log(JSON.parse(localStorage.getItem('sessionUser')));
  }
  f_eliminarsessionUser(){
    localStorage.removeItem('sessionUser');
    //elimina todo
    //localStorage.clear();
  }

}
