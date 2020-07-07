import { Component, OnInit } from '@angular/core';
//Modelo de Post
import { Post } from "../../models/post";
//Servicio de Post
import { PostService } from "../../services/post.service";
//Servicio de Usuarios
import { UserService } from "../../services/user.service";
//URL Global
import { global } from "../../services/global";
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [PostService, UserService]
})
export class HomeComponent implements OnInit {
  public url;
  //Se define como array para traer a todos los datos y enlistar en array
  public posts: Array<Post>;

  public page_title: string;

  //Para el token e identidad de esta manera el usuario tiene que estar identificado para realizar zcciones
  public identity;
  public token;


  constructor(
    private _postService: PostService,
    private _userService: UserService
  ) {
    this.page_title = "Home|Inicio";
    this.url = global.url;
    //Identidad de Usuario
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
  }

  ngOnInit(): void {
    this.getPosts();
  }

  getPosts() {
    this._postService.getPosts().subscribe(
      response => {
        if (response.status == 'success') {
          this.posts = response.posts;
          console.log(this.posts);


        }
      },
      error => {
        console.log(<any>error);

      }
    );
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
