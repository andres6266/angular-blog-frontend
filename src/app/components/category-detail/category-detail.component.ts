import { Component, OnInit } from '@angular/core';
//Rutas
import { Router, ActivatedRoute, Params } from "@angular/router";
//Modelo
import { Category } from "../../models/category";
//Modelo de post
import { Post } from "../../models/post";
//Servicio Categoria
import { CategoryService } from "../../services/category.service";
//Servicio Usuario
import { UserService } from "../../services/user.service";
//Servicio de Post
import { PostService } from "../../services/post.service";
//URL global
import { global } from "../../services/global";

@Component({
  selector: 'app-category-detail',
  templateUrl: './category-detail.component.html',
  styleUrls: ['./category-detail.component.css'],
  providers: [CategoryService, PostService, UserService]
})
export class CategoryDetailComponent implements OnInit {
  public page_title: string;
  public category: Category;
  public posts: Post;
  public url: string;
  public identity;
  public token;
  public cuantity:boolean;
 


  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _categoryService: CategoryService,
    private _postService: PostService,
    private _userService: UserService
  ) {
    this.url = global.url;
    //Identidad de Usuario
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    
  }

  ngOnInit(): void {
    //Inicializar el metodo
    this.getPostByCategory();

  }


  getPosts() {
    this._postService.getPosts().subscribe(
      response => {
        if (response.status == 'success') {
          this.posts = response.posts;
          
          
        }
      },
      error => {
        console.log(<any>error);
        

      }
    );
  }

  //Post segun la categoria
  getPostByCategory() {
    this._route.params.subscribe(params => {
      let id = +params['id'];
      this._categoryService.getCategory(id).subscribe(
        response => {
          if (response.status == 'success') {
            this.category = response.categories;
            
            
            //Conseguir los Post
            this._categoryService.getPosts(id).subscribe(
              response => {
                
                if (response.status == 'success') {

                  this.posts = response.posts;
                  this.cuantity=response.cuantity;
                  
                } else {

                  this._router.navigate(['inicio/']);
                }


              },
              error => {
                console.log(<any>error);

              }
            );

          } else {
            this._router.navigate(['inicio/']);
          }
        },
        error => {
          console.log(<any>error);

        }
      );
    });
  }

  deletePost(id) {
    this._postService.delete(this.token, id).subscribe(
      response => {
        //Cuando se borre se vuele a cargar todos los posts
        this.getPosts();
      },
      error => {
        console.log(<any>error);

      }
    );
  }

}
