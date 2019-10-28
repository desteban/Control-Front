import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { UserService } from "./UserService";

@Injectable()
export class IdentityGuard {

    constructor(
        private _router: Router,
        private _userService: UserService
    ){}

    //rutas reguras
    //acces: se puede acceder a la ruta si cuenta con credenciales
    sure(acces: boolean = true ,url: string = 'login', empleado: boolean = false){
        
        //obtener credenciales
        let identity = this._userService.getIdentity()

        if(!acces){
            if(identity != null){
                this._router.navigate(['perfil'])
            }
        }else{
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

    verifyUrl(urlSucces, urldefault:string = 'inicio'){
        switch (urlSucces) {
          case 'perfil':
              this._router.navigate(['perfil'])
            break;
  
            case 'articulos':
              this._router.navigate(['articulos'])
              break;
        
          default:
              this._router.navigate([urldefault])
            break;
        }
    }
}