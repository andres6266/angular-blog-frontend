import { Component, OnInit } from '@angular/core';
//Modelo Post
import { Post } from "../../models/post";
//Modelo Usuario
import { User } from "../../models/user";
//Servicio de Post
import { PostService } from "../../services/post.service";

//Para trabajar con las rutas
import { Router,ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css'],
  providers:[PostService]
})
export class PostDetailComponent implements OnInit {
  public post:Post;

  constructor(
    private _postService:PostService,
    private _route:ActivatedRoute,
    private _router:Router
  ) { }

  ngOnInit(): void {
    this.getPost();
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
            console.log(this.post);
            
            

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
