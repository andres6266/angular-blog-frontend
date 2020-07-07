import { Injectable } from "@angular/core";
import { HttpClient,HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { User } from "../models/user";
//Importar url global
import { global } from "./global";

@Injectable()
export class UserService{
    public url:string;
    public identity;
    public token;



    constructor(
        public _http:HttpClient
    ){
        this.url=global.url;
    }

    

    register(user): Observable<any>{
        let json=JSON.stringify(user);
        let params = 'json=' + json;

        let headers=new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');

        //Peticion|Parametros|Envio de cabeceras
        return this._http.post(this.url+'register',params,{headers:headers});
    }
    
    //Metodo para devolver datos de login 
    signup(user,gettoken=null):Observable<any>{

        if(gettoken!=null){
            user.gettoken='true';
        }
        let json=JSON.stringify(user);
        let params = 'json=' + json;
        
        let headers=new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');
        
        //Peticion|Parametros|Envio de cabeceras
        return this._http.post(this.url+'login',params,{headers:headers});
        
    }
    
    //Conseguir identidad del usuario identificado
    
    getIdentity(){
        //Convertir a JSON el string en el localstorage y validarlo
        let identity=JSON.parse(localStorage.getItem('identity'));
        
        if(identity && identity !='undefined'){
            this.identity=identity;
        }else{
            this.identity=null;
        }
        
        return this.identity;
    }
    
    
    //Conseguir el token del usuario identificado
    getToken(){
        let token=localStorage.getItem('token');
        
        if(token && token !='undefined'){
            this.token=token;
        }else{
            this.token=null;
        }
        
        return this.token;
    }
    
    
    //Actualizar Ajustes de usuario mediante token
        //Hay que poner observable para poder manejar las respuesats o errores que se obtenga
    update(token,user): Observable<any>{
        //Limpiar campo content  (editor de txto enriquecido ) htmlEntities > utf8
        user.description=global.htmlEntities(user.description);
        
        let json=JSON.stringify(user);
        let params = 'json=' + json;

        //Autoriza el token desde la cabecera
        let headers=new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded').set('Authorization',token);
        
        //Peticion|Parametros|Envio de cabeceras
        return this._http.put(this.url+'user/update',params,{headers:headers});
    }

    //Todos los post pertenecientes a un usuario
    getPosts(id):Observable<any>{
        let headers=new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');

        return this._http.get(this.url+'post/user/'+id,{headers:headers});

    }


    //Todos los post pertenecientes a un usuario
    getUser(id):Observable<any>{
        let headers=new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');

        return this._http.get(this.url+'user/detail/'+id,{headers:headers});

    }


}