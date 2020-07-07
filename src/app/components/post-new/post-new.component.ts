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
  selector: 'app-post-new',
  templateUrl: './post-new.component.html',
  styleUrls: ['./post-new.component.css'],
  providers: [UserService, CategoryService, PostService]
})
export class PostNewComponent implements OnInit {

  public page_title: string;
  public identity;
  public token;
  public post: Post;
  //Conseguir categorias
  public categories;
  public status;
  public is_edit:boolean;
  //URL
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
    this.page_title = "Creacion de nueva entrada";
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.is_edit=false;
    this.url=global.url;
  }

  ngOnInit(): void {
    this.post = new Post(1, this.identity.sub, 1, '', '', null, null);

    //Conseguir categorias
    this.getCategories();



  }

  onSubmit(form) {
    this._postService.create(this.token, this.post).subscribe(
      response => {
        if (response.status == 'success') {
          this.post = response.post;
          this.status = 'success';
          this._router.navigate(['/inicio']);
        }
      },
        error => {
          this.status = 'error';

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

  //Subida de imagenes al post
  imageUpload(data) {
    let image_data = JSON.parse(data.response);
    this.post.image = image_data.image;

  }

}
