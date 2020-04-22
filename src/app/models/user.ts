//import { Rol } from 'src/app/models/rol';
export class User{
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  passwd: string;
  //rol: Rol;
  rol: number;
  status: number;
  created_at: Date;
  updated_at: Date;
  constructor(){
    this.id = this.id;
    this.firstname = this.firstname;
    this.lastname = this.lastname;
    this.email = this.email;
    this.passwd = this.passwd;
    this.rol = this.rol;
    this.status = this.status;
    this.created_at = this.created_at;
    this.updated_at = this.updated_at;
  }
}
