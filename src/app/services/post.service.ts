import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
//Importar url global
import { global } from "./global";
import { Post } from "../models/post";

@Injectable()
export class PostService {
    public url: string;
    public identity;
    public token;



    constructor(
        private _http: HttpClient
    ) {
        this.url = global.url;


    }

    pruebaPost() {
        console.log('Metodo Post valido');

    }

    create(token, post): Observable<any> {
        //Limpiar campo content  (editor de txto enriquecido ) htmlEntities > utf8
        post.content=global.htmlEntities(post.content);
        let json = JSON.stringify(post);
        let params = "json=" + json;
        
        //Conseguir cabeceras y autorizacion mediante el token
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
        .set('Authorization', token);
        
        return this._http.post(this.url + 'post', params, { headers: headers });
    }
    
    
    //Metodo para listar post
    
    getPosts(): Observable<any> {
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
        return this._http.get(this.url + 'post', { headers: headers });
    }
    
    getPost(id): Observable<any> {
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
        return this._http.get(this.url + 'post/' + id, { headers: headers });
        
    }
    
    
    //Metodo para editar el post
    update(token, post, id):Observable<any> {
        //Limpiar campo content  (editor de txto enriquecido ) htmlEntities > utf8
        post.content=global.htmlEntities(post.content);
        let json = JSON.stringify(post);
        let params = "json=" + json;
        
        //Autorizar por medio del token
        let headers = new HttpHeaders()
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .set('Authorization', token);
        
        //Peticion Ajax
        return this._http.put(this.url + 'post/' + id , params, { headers: headers });
        
    }
    
    //Metodo para eliminar un post
    delete(token,id){
        let headers = new HttpHeaders()
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .set('Authorization', token);
        return this._http.delete(this.url+'post/'+id,{headers:headers});
    }




}