import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
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

    if(this.idsesion){
      this.UserInyected.leerUsuario(this.idsesion).subscribe((User_api)=>{
        this.UsersClass[0] = User_api[0];
        this.validateRol = this.UsersClass[0].rol;
      });
    }else{
      this.Ruta.navigateByUrl('/');
    }

  }

}
