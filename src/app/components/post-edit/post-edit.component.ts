import { Component, OnInit } from '@angular/core';
//Para trabajar con las rutas
import { Router, ActivatedRoute } from "@angular/router";
//Para trabajar con el servicio creado y conseguir token y autenticacion
import { UserService } from "../../services/user.service";
//Modelo de categoria
import { Category } from "../../models/category";
//Modelo de entrada
import { Post } from "../../models/post";
//Importar servicio de Entrada o Post
import { PostService } from "../../services/post.service";
//Importar servicio para registrar la categoria
import { CategoryService } from "../../services/category.service";
//URL global
import { global } from "../../services/global";

@Component({
  selector: 'app-post-edit',
  /* Entrar a la vista de creacion para edicion de post y no sobreescritura de codigo */
  templateUrl: '../post-new/post-new.component.html',
  providers: [UserService, CategoryService, PostService]
})
export class PostEditComponent implements OnInit {

  public page_title: string;
  public identity;
  public token;
  public post: Post;
  //Conseguir categorias
  public categories;
  public status;
  //Diferenciar si es edicion o creacion
  public is_edit:boolean;
  public url;

  //Editor de Texto
  public froala_options: Object = {
    charCounterCount: true,
    language:'es',
    toolbarButtons: ['bold', 'italic', 'underline', 'paragraphFormat'],
    toolbarButtonsXS: ['bold', 'italic', 'underline', 'paragraphFormat'],
    toolbarButtonsSM: ['bold', 'italic', 'underline', 'paragraphFormat'],
    toolbarButtonsMD: ['bold', 'italic', 'underline', 'paragraphFormat'],
  };


  //Subida de imagenes
  public afuConfig = {
    multiple: false,
    formatsAllowed: ".jpg,.png,.gif,.jpeg",
    maxSize: "50",//Tamano de archivo en mb
    uploadAPI: {
      url: global.url + 'post/upload',//Segun la url indicada para subir 
      headers: {
        "Authorization": this._userService.getToken()//Conseguir el JWTOKEN
      }
    },
    theme: "attachPin",
    hideProgressBar: false,
    hideResetBtn: true,
    hideSelectBtn: false,
    replaceTexts: {
      selectFileBtn: 'Select Files',
      resetBtn: 'Reset',
      uploadBtn: 'Upload',
      dragNDropBox: 'Drag N Drop',
      attachPinBtn: 'Sube la imagen del articulo...',
      afterUploadMsg_success: 'Successfully Uploaded !',
      afterUploadMsg_error: 'Upload Failed !'
    }
  };


  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _categoryService: CategoryService,
    private _postService: PostService
  ) {
    this.page_title = "Edicion de entrada";
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.is_edit=true;
    this.url=global.url;
  }

  ngOnInit(): void {
    
    //Conseguir categorias
    this.getCategories();
    
    this.post = new Post(1, this.identity.sub, 1, '', '', null, null);

    //Metodo para conseguir el post
    this.getPost();

  }

  //Para la edicion o actualizacion del post
  onSubmit(form) {
    this._postService.update(this.token, this.post,this.post.id).subscribe(
      response => {
        if (response.status == 'success') {
          this.post = response.post;
          this.status = 'success';
          this._router.navigate(['/entrada',this.post.id]);
        }else{
          this.status = 'error';

        }
      },
        error => {
          this.status = 'error';
          console.log(<any>error);
          

        }
    );
      
    }
  

  //Conseguir todas las categorias
  getCategories() {
    this._categoryService.getCategories().subscribe(
      response => {

        if (response.status == 'success') {
          this.categories = response.categories;
          console.log(this.categories);

        }

      },
      error => {
        console.log(<any>error);

      }
    );
  }

  imageUpload(data) {
    let image_data = JSON.parse(data.response);
    this.post.image = image_data.image;

  }

  
  //Conseguir post segun el id
  getPost(){
    //Obtener el id
    this._route.params.subscribe(params=>{
      //con el + se transforma en entero
       let id=+params['id'];
       console.log(id);
       
       //Peticion Ajax para obtener los datos del Post
       this._postService.getPost(id).subscribe(
         response=>{
          if(response.status=='success'){

            this.post=response.post;
            if(this.post.user_id!=this.identity.sub){

              this._router.navigate(['/inicio']);
            }
            
            

          }else{
            this._router.navigate(['/inicio']);
          }
        },
        error=>{
          this._router.navigate(['/inicio']);
          console.log(<any>error);
           
         }
       );
    });

  }

}
