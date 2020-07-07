import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/services/post.service';
import { UserService } from 'src/app/services/user.service';
import { Post } from 'src/app/models/post';
import { User } from 'src/app/models/user';
//Rutas
import { Router, ActivatedRoute, Params } from "@angular/router";
import { global } from 'src/app/services/global';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers: [UserService, PostService]
})
export class ProfileComponent implements OnInit {

  public url:string;
  //Se define como array para traer a todos los datos y enlistar en array
  public posts: Array<Post>;

  public page_title: string;

  //Para el token e identidad de esta manera el usuario tiene que estar identificado para realizar zcciones
  public identity;
  public token;

  //Usuario
  public user: User;


  constructor(
    private _postService: PostService,
    private _userService: UserService,
    private _route: ActivatedRoute,
    private _router: Router,
  ) {
    this.page_title = "Perfil|Usuario-Post";
    this.url = global.url;
    console.log('url'+this.url);
    
    //Identidad de Usuario
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
  }

  ngOnInit(): void {

    //Sacar el id del usuario que esta en la url
    this.getProfileUser();
  }

  getProfileUser() {
    //Sacar el id del usuario que esta en la url
    this._route.params.subscribe(params => {
      let userId = +params['id'];

      console.log({ userId });
      this.getPosts(userId);
      this.getUser(userId);
    });
  }

  //Conseguir post segun el usuario autor
  getPosts(userId) {
    this._userService.getPosts(userId).subscribe(
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


  //Conseguir detalles de usuario
  getUser(userId) {
    this._userService.getUser(userId).subscribe(
      response => {
        this.user = response.user;
        console.log(this.user);
        
      },
      error => {
        console.log(<any>error);

      }
    );
  }

  deletePost(id) {
    this._postService.delete(this.token, id).subscribe(
      response => {
        //Sacar el id del usuario que esta en la url
        this.getProfileUser();
      },
      error => {
        console.log(<any>error);

      }
    );
  }

}
