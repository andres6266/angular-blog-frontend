import { Component, OnInit } from '@angular/core';
//Modelo
import { User } from 'src/app/models/user';
//Llamar servicio
import { UserService } from "../../services/user.service";
//Importar la url de la API
import { global } from "../../services/global";

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css'],
  providers: [UserService]
})
export class UserEditComponent implements OnInit {

  public page_title: string;
  public user: User;
  public identity;
  public token;
  public status;
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
    uploadAPI:  {
      url:global.url+'user/upload',//Segun la url indicada para subir 
      headers: {
     "Authorization" : this._userService.getToken()//Conseguir el JWTOKEN
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
      attachPinBtn: 'Sube tu avatar de Usuario...',
      afterUploadMsg_success: 'Successfully Uploaded !',
      afterUploadMsg_error: 'Upload Failed !'
    }
};



  constructor(
    private _userService: UserService
  ) {
    this.page_title = 'Ajustes|Usuario';
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();

    //Rellenar objeto usuario con valores actualizados
    this.user = new User(this.identity.sub, this.identity.name, this.identity.surname, this.identity.role, this.identity.email, this.identity.description, this.identity.image, '');
    //Confirmar url
    this.url=global.url;

  }

  ngOnInit(): void {
  }
  onSubmit(form) {
    this._userService.update(this.token, this.user).subscribe(
      response => {
        if (response) {
          this.status = 'success';

          //Actualizar usuario

          if (response.changes.name) {
            this.user.name = response.changes.name;
          }

          if (response.changes.surname) {
            this.user.surname = response.changes.surname;
          }

          if (response.changes.email) {
            this.user.email = response.changes.email;
          }

          if (response.changes.description) {
            this.user.description = response.changes.description;
          }

          if (response.changes.image) {
            this.user.image = response.changes.image;
          }

          this.identity = this.user;

          localStorage.setItem('identity', JSON.stringify(this.identity));
        } else {

        }

      },
      error => {
        this.status = 'error';
        console.log(<any>error);

      }
    );
  }

  avatarUpload(datos){
    let data=JSON.parse(datos.response);
    this.user.image=data.image;
    
  }

}
