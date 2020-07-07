import { Component, OnInit } from '@angular/core';
//Llamar al modelo en el que se va a registrar los datos
import { User } from "../../models/user";

//Importar el servicio
import { UserService } from "../../services/user.service";

import { error } from '@angular/compiler/src/util';

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [UserService]
})
export class RegisterComponent implements OnInit {
  public page_title:string;
  //Declarar un variable tipo User para trabajar con el modelo
  public user:User;
  //variable para mensajes de exito o error
  public status:string;


  constructor(
    private _userService:UserService
  ) { 
    this.page_title='Registro|Blog';
   
    this.user=new User(1,'','','ROLE_USER','','','','');
   }

  ngOnInit(): void {
    console.log('Componente de registro lanzado');
    

  }

  //Metodo que recibe el formulario
  public onSubmit(form){
    
    this._userService.register(this.user).subscribe(
      response=>{

        if(response.status=="success"){
          this.status=response.status;
          form.reset();
        }else{
          this.status='error';
        }
        
      },error=>{
        this.status='error';
        console.log(<any>error);
        
      }
    );
    
  }

}
