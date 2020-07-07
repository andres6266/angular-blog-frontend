import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
//Para Rutas
import { routing,appRoutingProvider } from "./app.routing";
//Para Formulario 
import { FormsModule } from "@angular/forms";
//Comunicacion con el backend http
import { HttpClientModule } from "@angular/common/http";
//Subir Imagenes
import { AngularFileUploaderModule } from "angular-file-uploader";
//Editor de texto enriquecido
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';
//Para entrar segun el rol de usuario
import { IdentityGuard } from "./services/identity.guard";
//Servicio de Usuario
import { UserService } from './services/user.service';

//Componentes
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { ErrorComponent } from './components/error/error.component';
import { UserEditComponent } from './components/user-edit/user-edit.component';
import { CategoryNewComponent } from './components/category-new/category-new.component';
import { PostNewComponent } from './components/post-new/post-new.component';
import { PostDetailComponent } from './components/post-detail/post-detail.component';
import { PostEditComponent } from './components/post-edit/post-edit.component';
import { CategoryDetailComponent } from './components/category-detail/category-detail.component';
import { ProfileComponent } from './components/profile/profile.component';
import { PostListComponent } from './components/post-list/post-list.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    ErrorComponent,
    UserEditComponent,
    CategoryNewComponent,
    PostNewComponent,
    PostDetailComponent,
    PostEditComponent,
    CategoryDetailComponent,
    ProfileComponent,
    PostListComponent
  ],
  imports: [
    BrowserModule,
    routing,
    FormsModule,
    HttpClientModule,
    //Editor de Texto
    FroalaEditorModule.forRoot(), 
    FroalaViewModule.forRoot(),
     AngularFileUploaderModule 
  ],
  providers: [
    appRoutingProvider,
    IdentityGuard,
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
