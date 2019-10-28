import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { UserService } from "./UserService";

@Injectable()
export class IdentityGuard {

    constructor(
        private _router: Router,
        private _userService: UserService
    ){}

    sure(url = 'login', empleado = false){
        
        //obtener credenciales
        let identity = this._userService.getIdentity()

        //validar credenciales
        if(identity == null){
            this._router.navigate([url])
        }else{
            //validar si la ruta solo se acede por empleados
            if(empleado){
                //valar si es un empleado
                if(!identity.rol){
                    this._router.navigate(['error'])
                }
            }
        }
    }
    
}