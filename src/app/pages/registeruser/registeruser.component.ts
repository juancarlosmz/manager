
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Rol } from 'src/app/models/rol';
import { User2 } from 'src/app/models/user2';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-registeruser',
  templateUrl: './registeruser.component.html',
  styleUrls: ['./registeruser.component.css']
})
export class RegisteruserComponent implements OnInit {
  formularioUsuario: FormGroup;
  esNuevo: boolean = true;
  posicionEditar: number = -1;
  Users: Array<User2> = new Array<User2>();
  UsersClass: Array<User> = new Array<User>();
  myUser: User = new User();
  //sesion
  idsesion: string;
  rol: number;
  iduser: number;

  rols: Rol[] = [
    { value: 1, viewValue: 'Manager' },
    { value: 2, viewValue: 'Customer support' },
    { value: 3, viewValue: 'Designer' },
    { value: 4, viewValue: 'Print operator' },
    { value: 5, viewValue: 'Cutter' },
    { value: 6, viewValue: 'Workshop' },
    { value: 7, viewValue: 'Packer' },
  ];

  constructor(
    private fb: FormBuilder,
    private UserInyected: UserService,
    private Ruta: Router
  ){
    //this.idsesion = JSON.parse(localStorage.getItem('sessionUser'));
    this.idsesion = localStorage.getItem('sessionUser');
  }

  ngOnInit(): void {
    this.f_crearFormulario();
    this.f_leerUsuarios();
    this.userValidation();
  }
  userValidation(){
    if(this.idsesion){
      this.UserInyected.leerUsuario(this.idsesion).subscribe(
        (User_api)=>{
          this.rol  = User_api[0].rol;
          if(this.rol == 1){
            this.iduser = User_api[0].id;
            this.Ruta.navigateByUrl('/users');
          }else{
            this.Ruta.navigateByUrl('/dashboard');
          }
        },
        error => {
          localStorage.removeItem('sessionUser');
          location.reload();
          this.Ruta.navigateByUrl('/');
        }
      );
    }else{
      this.Ruta.navigateByUrl('/dashboard');
    }
  }
  f_crearFormulario(){
    this.formularioUsuario = this.fb.group({
      id: [''],
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', Validators.compose([
        Validators.required, Validators.email
      ])],
      passwd: ['', Validators.required],
      rol: ['', Validators.required],
    });
  }
  f_leerUsuarios(){
    this.UserInyected.leerUsuarios().subscribe((Users_api)=>{
      this.UsersClass = Users_api;
    });
  }
  f_agregarUsuario(){
    this.myUser = this.formularioUsuario.value as User;
    this.UserInyected.guardarUsuario(this.myUser).subscribe((userRecibido)=>{
      this.formularioUsuario.reset();
      this.f_leerUsuarios();
    });
  }
  f_editarUsuario(){
    this.myUser = this.formularioUsuario.value as User;
    this.UserInyected.editarUsuario(this.myUser).subscribe((userRecibido)=>{
      console.log(userRecibido);
      this.formularioUsuario.reset();
      this.f_leerUsuarios();
      this.esNuevo = true;
      this.posicionEditar = -1;
    });
  }
  f_eliminarUsuario(id: number){
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        this.UserInyected.eliminarUsuario(id).subscribe((datos)=>{
          this.f_leerUsuarios();
          Swal.fire(
            'Deleted!',
            'User has been deleted.',
            'success'
          );
        });
      }else{

      }
    });
  }
  f_edit(posicion: number){
    this.formularioUsuario.setValue({
      id: this.UsersClass[posicion].id,
      firstname: this.UsersClass[posicion].firstname,
      lastname: this.UsersClass[posicion].lastname,
      email: this.UsersClass[posicion].email,
      passwd: this.UsersClass[posicion].passwd,
      rol: this.UsersClass[posicion].rol
    });
    this.posicionEditar = posicion;
    this.esNuevo = false;
  }
  f_verUsuario(UserRecibido: User){
    this.UserInyected.userService = UserRecibido;
    this.Ruta.navigateByUrl('/user-profile');
  }



}
