import { Component, OnInit } from '@angular/core';
//Para trabajar con las rutas
import { Router, ActivatedRoute, Params } from "@angular/router";
//Para trabajar con el servicio creado y conseguir token y autenticacion
import { UserService } from "../../services/user.service";
//Modelo de categoria
import { Category } from "../../models/category";
//Importar servicio para registrar la categoria
import { CategoryService } from "../../services/category.service";

@Component({
  selector: 'app-category-new',
  templateUrl: './category-new.component.html',
  styleUrls: ['./category-new.component.css'],
  //cargar servicios
  providers: [UserService, CategoryService]
})
export class CategoryNewComponent implements OnInit {
  public page_title:string;
  public identity;
  public token;
  public category:Category;
  public status:string;
  

  constructor(
    private _route:ActivatedRoute,
    private _router:Router,
    private _userService:UserService,
    private _categoryService:CategoryService

  ) { 
    this.page_title="Crear nueva Categoria";
    this.identity=this._userService.getIdentity();
    this.token=this._userService.getToken(); 
    this.category=new Category(1,'');

  }

  ngOnInit(): void {
  }

  onSubmit(form){
    this._categoryService.create(this.token,this.category).subscribe(
      respose=>{
        if(respose.status=='success'){
          this.category=respose.category;
          this.status='success';
          this._router.navigate(['/inicio']);
        }else{
          this.status='error';
        }
      }
      ,error=>{
        this.status='error';
        console.log(<any>error);
        
      }
    );
  }

}
