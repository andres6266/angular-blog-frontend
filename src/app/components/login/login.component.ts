import { Component, OnInit } from '@angular/core';
//Importar modelo de Usuario
import { User } from "../../models/user";
//Importar el servicio
import { UserService } from "../../services/user.service";
//Importar el servicio de rutas para realizar el logout
import { Router,ActivatedRoute,Params } from "@angular/router";

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  //Cargar el servicio en el componente
  providers: [UserService]
})
export class LoginComponent implements OnInit {
  //Declarar un variable tipo User para trabajar con el modelo
  public user: User;
  public page_title: string;

  public status: string;

  public token;
  public identity;


  
  
  constructor(
    //Servicio de Usuario
    private _userService: UserService,
    //Variables Tipo Rutas
    private _router:Router,
    private _route:ActivatedRoute
    ) {



    this.page_title = 'Identificate|Login';
    this.user = new User(1, '', '', 'ROLE_USER', '', '', '', '');


  }

  ngOnInit(): void {
    //Siempre se ejecuta y cierra sesion cuando llega el parametro sure por la url
    this.logout();
  }

  onSubmit(form) {
    this._userService.signup(this.user).subscribe(
      response => {
        //Comprobar Token
        if (response.status != 'error') {
          this.status = 'success';
          //Devuelve el token que es de la sesion
          this.token = response;

          //Traer datos del usuario, se vuele a llamar al mismo metodo pero ahora con tru para que response de como resultado los datos relacionados al login
          this._userService.signup(this.user, true).subscribe(
            response => {
              //Datos de usuario
              this.identity = response;

              
              console.log(this.token);
              console.log(this.identity);
              
              //Persistir o almacenar datos del usuario en el navegador
              localStorage.setItem('token',this.token);
              localStorage.setItem('identity',JSON.stringify(this.identity));
              //Redireccion a la pagina de inicio
              this._router.navigate(['inicio']);
              

            },
            error => {
              this.status = 'error';
              console.log(<any>error);

            }
          );
        } else {

          this.status = 'error';
          console.log(response);
          
          
        }

      },
      error => {
        this.status = 'error';
        console.log(<any>error);

      }
    );

  }

  logout(){
    this._route.params.subscribe(
      params=>{
        //convertir en entero
        let logout= +params['sure'];

        if(logout==1){
          localStorage.removeItem('identity');
          localStorage.removeItem('token');

          this.identity=null;
          this.token=null;

          //Redireccion a la pagina de inicio
          this._router.navigate(['inicio']);
        }
      }
    );
  }

}
