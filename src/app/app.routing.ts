//Importar dependencias necesarias
import { ModuleWithProviders } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";


//Importar componentes
import { LoginComponent } from "./components/login/login.component";
import { RegisterComponent } from "./components/register/register.component";
import { HomeComponent } from "./components/home/home.component";
import { UserEditComponent } from "./components/user-edit/user-edit.component";
import { CategoryNewComponent } from "./components/category-new/category-new.component";
import { PostDetailComponent } from "./components/post-detail/post-detail.component";
import { PostNewComponent } from "./components/post-new/post-new.component";
import { PostEditComponent } from "./components/post-edit/post-edit.component";
import { CategoryDetailComponent } from "./components/category-detail/category-detail.component";
import { ProfileComponent } from "./components/profile/profile.component";
//Servicio que valida las rutas segun los permisos de usuario
import { IdentityGuard } from './services/identity.guard';
//Componente pagina no encontrada
import { ErrorComponent } from "./components/error/error.component";


//Definir las rutas 
const appRoutes: Routes=[
    {path: '',component: HomeComponent},
    {path: 'inicio',component: HomeComponent},
    {path: 'login',component: LoginComponent},
    //Ruta para cerrar sesion con un parametro
    {path: 'logout/:sure',component: LoginComponent},
    {path: 'registro',component: RegisterComponent},
    
    //Ruta para crear nueva categoria
    {path: 'crear-categoria',component: CategoryNewComponent,canActivate:[IdentityGuard]},
    //Ruta para crear nueva entrada
    {path: 'crear-entrada',component: PostNewComponent,canActivate:[IdentityGuard]},
    //detalle de entrada
    {path: 'entrada/:id',component: PostDetailComponent},
    //Editar entrada
    {path: 'editar-entrada/:id',component: PostEditComponent,canActivate:[IdentityGuard]},
    //Ruta para la categoria y los post que contiene
    {path: 'categoria/:id',component: CategoryDetailComponent},


    //Ruta para editar usuario
    {path: 'ajustes',component: UserEditComponent,canActivate:[IdentityGuard]},
    //Ruta para perfil de usuario
    {path: 'mi-perfil/:id',component: ProfileComponent,canActivate:[IdentityGuard]},

    //Pagina no encontrada
    {path: '**',component: ErrorComponent}
];

//Exportar la configuracion
export const appRoutingProvider:any[]=[];
export const routing:ModuleWithProviders=RouterModule.forRoot(appRoutes);
