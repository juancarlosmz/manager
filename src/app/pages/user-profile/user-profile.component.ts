import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user';
import { Rol } from 'src/app/models/rol';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  //El usuario
  UsersClass: User = new User();
  idsesion: string;
  firstname: string = '';
  email: string = '';
  rol: number;

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
    private Ruta: Router,
    private rutaActiva: ActivatedRoute,
    private UserInyected: UserService
  ) {
    //this.idsesion = JSON.parse(localStorage.getItem('sessionUser'));
    this.idsesion = localStorage.getItem('sessionUser');
  }
  ngOnInit() {
    this.userValidation();
  }

  userValidation(){
    if(this.idsesion){
      this.UserInyected.leerUsuario(this.idsesion).subscribe(
        (User_api)=>{
          this.UsersClass[0] = User_api[0];
          this.firstname = this.UsersClass[0].firstname;
          this.email  = this.UsersClass[0].email;
          this.rol  = this.UsersClass[0].rol;
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

}
