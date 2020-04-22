import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { User2 } from 'src/app/models/user2';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users: Array<User2> = new Array<User2>();
  constructor(private ruta: Router) { }

  ngOnInit(): void {
    this.users.push(
      {
        name: 'juan carlos',
        email: 'mendoza@gmail.com',
        passwd:'1234',
        image: 'asdasd',
        rol: 1
      },
      {
        name: 'no puedo',
        email: 'te@gmail.com',
        passwd:'564',
        image: 'sadsa',
        rol: 2}
    );
  }
  pasarParametro(userRecibido: User2){
    console.log(userRecibido);
    this.ruta.navigate(['profile',{user: JSON.stringify(userRecibido)}]);
  }
}
