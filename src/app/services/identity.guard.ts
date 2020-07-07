import { Injectable } from "@angular/core";
import { Router, CanActivate } from '@angular/router';
import { UserService } from './user.service';
import { User } from '../models/user';

@Injectable()
export class IdentityGuard implements CanActivate {

    constructor(
        //Acceder a las rutas
        private _router: Router,
        private _userService: UserService
    ) {

    }

    //Metodo indispensable para la validacion
    canActivate() {
        let identity = this._userService.getIdentity();

        //De acuerdo al booleano depende si hay acceso o no
        
        if (identity) {
            return true;
        } else {
            this._router.navigate(['/error']);
            return false;
        }
    }
}
