import { Component,OnInit,DoCheck } from '@angular/core';
//Importar el servicio del usuario para que aparezcan los datos en el componente
import { UserService } from "./services/user.service";
import { User } from './models/user';
import { global } from "./services/global";
//Importar servicio de categoria para enlazar
import { CategoryService } from "./services/category.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [UserService, CategoryService]
})
export class AppComponent implements OnInit,DoCheck{
  public title = 'Blog de Angular';
  //Variables que van a aparecer en la vista del componente
  public identity;
  public token;

  //Url API
  public url;


  public categories;

  constructor(
    //Iniciar la variable para traer metodos y propiedades del servicio de user
    private _userService:UserService,
    //Cargar el servicio de categoria en el cosntructor
    private _categoryService:CategoryService
    ){
      
      this.loadUser();
      //Iniciarlizar url con variable global
      this.url=global.url;

    }
    
    ngOnInit(){
      console.log('Aplicacion cargada correctamente');
      //Llamar al metodo getCategories para que cargue todas las categorias
      this.getCategories();
    
    }
  loadUser(){
      
      //Variable a invocar en la vista
    this.identity=this._userService.getIdentity();
    this.token=this._userService.getToken();
    
  }
  //Se  ejecuta frecuentemente para actualizar la barra de navegacion
 
  ngDoCheck(){
    this.loadUser();
  }

  //Listar categorias
  getCategories(){
    this._categoryService.getCategories().subscribe(
      response=>{
        if(response.status=="success"){
          this.categories=response.categories;
          
          
        }
      },
      error=>{
        console.log(<any>error);
        
        
      }
    );
  }

}
