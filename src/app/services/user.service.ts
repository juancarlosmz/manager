import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  //mi local
  // ruta: string = 'http://localhost:50/backend_manager/api/server';
  //apolo
  //ruta: string = 'https://apolomultimedia-server1.info/jeremy/BackEnd_manager/api/server';
  //jeremy
  ruta: string = 'https://canvasandmorephotos.co.za/BackEnd_manager/api/server';


  userService: User = new User();
  constructor(private http: HttpClient) { }

  leerUsuarios(): Observable<User[]>{
    return this.http.get<User[]>(this.ruta + '/users.php');
  }

  leerUsuario(token: string): Observable<User[]>{
    return this.http.post<User[]>(this.ruta + '/user.php',
      {
        token: token
      },
      {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' }
      }
    );
  }
/*
  leerUsuario(id: number): Observable<User[]>{
    return this.http.post<User[]>(this.ruta + '/user.php',
      {
       id: id
      },
      {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' }
      }
    );
  }
*/

  guardarUsuario(usuario: User): Observable<User>{
    return this.http.post<User>(this.ruta + '/registrarUser.php',
    usuario,
    {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' }
    }
    );
  }
  editarUsuario(usuario: User): Observable<User>{
    return this.http.post<User>(this.ruta + '/editarUser.php',
    usuario,
    {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' }
    }
    );
  }

  editarUsuariobyid(usuario: User): Observable<User>{
    return this.http.post<User>(this.ruta + '/editarUserbyid.php',
    usuario,
    {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' }
    }
    );
  }

  eliminarUsuario(id: number): Observable<User>{
    return this.http.get<User>(this.ruta + '/eliminarUser.php?id=' + id);
  }

  validateEmail(email: string): Observable<any>{
    return this.http.get<any>(this.ruta + '/validate_email.php?txt_email=' + email);
  }

  loginUsuario(email: string, passwd: string): Observable<any>{
    return this.http.post<any>(this.ruta + '/login.php',
      {
       email: email,
       password: passwd
      },
      {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' }
      }
    );
  }

}
