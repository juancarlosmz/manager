import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-user-profile-editor',
  templateUrl: './user-profile-editor.component.html',
  styleUrls: ['./user-profile-editor.component.css']
})
export class UserProfileEditorComponent implements OnInit {
  formularioUsuario: FormGroup;
  //El usuario
  UsersClass: User = new User();
  idsesion: number;
  carga: boolean = false;
  checkpasswd: boolean = false;

  id: number = 0;
  firstname: string = '';
  lastname: string = '';
  email: string = '';
  constructor(
    private Ruta: Router,
    private fb: FormBuilder,
    private rutaActiva: ActivatedRoute,
    private UserInyected: UserService
  ) {
    this.idsesion = JSON.parse(localStorage.getItem('sessionUser'));
  }

  ngOnInit(): void {
    this.userValidation();
    this.f_crearFormulario();
  }


  userValidation(){
    if(this.idsesion){
      this.UserInyected.leerUsuario(this.idsesion).subscribe((User_api)=>{
        this.UsersClass[0] = User_api[0];
        this.id  = User_api[0].id;
        this.firstname = User_api[0].firstname;
        this.lastname = User_api[0].lastname;
        this.email  = User_api[0].email;

        this.formularioUsuario.setValue({
          id: User_api[0].id,
          firstname: User_api[0].firstname,
          lastname: User_api[0].lastname,
          email: User_api[0].email,
          passwd: '',
          confirmpasswd: '',
          validatorPasswd: '',
        });

      });
    }else{
      this.Ruta.navigateByUrl('/');
    }
  }

  f_crearFormulario(){
    this.formularioUsuario = this.fb.group({
      id: '',
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', Validators.compose([
        Validators.required, Validators.email
      ])],
      passwd: ['', Validators.required],
      confirmpasswd: ['', Validators.required],
      validatorPasswd: ['', Validators.required],
    });
  }

  f_editarUsuario(){
    this.UsersClass = this.formularioUsuario.value as User;
    this.carga = true;
    this.UserInyected.editarUsuariobyid(this.UsersClass).subscribe((userRecibido)=>{
      localStorage.removeItem('sessionUser');
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'The password has been changed successfully.',
        showConfirmButton: false,
        timer: 1500
      })
      setTimeout(() => {
        this.carga = false;
        this.Ruta.navigateByUrl('/');
      },1500);
    });
  }

  f_checkpassw(){
    if (this.formularioUsuario.value.passwd == this.formularioUsuario.value.confirmpasswd) {
      this.checkpasswd = false;
      this.formularioUsuario.setValue({
        id: this.formularioUsuario.value.id ,
        firstname: this.formularioUsuario.value.firstname ,
        lastname: this.formularioUsuario.value.lastname ,
        email: this.formularioUsuario.value.email ,
        passwd: this.formularioUsuario.value.passwd ,
        confirmpasswd: this.formularioUsuario.value.confirmpasswd ,
        validatorPasswd: 'validate',
      });
    }else{
      this.checkpasswd = true;
      this.formularioUsuario.setValue({
        id: this.formularioUsuario.value.id ,
        firstname: this.formularioUsuario.value.firstname ,
        lastname: this.formularioUsuario.value.lastname ,
        email: this.formularioUsuario.value.email ,
        passwd: this.formularioUsuario.value.passwd ,
        confirmpasswd: this.formularioUsuario.value.confirmpasswd ,
        validatorPasswd: '',
      });

    }




  }

}
