import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { Persona } from "../models/Persona";
import { global } from "./global";
import { Router } from "@angular/router";

@Injectable()
export class UserService {

    public url: string


    constructor(
        public _http: HttpClient,
        private _router: Router
    ) {
        this.url = global.Apiurl
    }

    test() {
        return "UserService"
    }

    register(persona: Persona): Observable<any> {

        //pasar datos a json
        let json = JSON.stringify(persona)
        let params = `json=${json}`

        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')

        return this._http.post(this.url + 'personas', params, { headers: headers })
    }

    login(persona, getToken = null): Observable<any> {

        if (getToken != null) {
            persona.getToken = true
        }

        let json = JSON.stringify(persona)
        let params = `json=${json}`

        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')

        return this._http.post(this.url + 'login', params, { headers: headers })
    }

    saveToken(token){
        localStorage.setItem('token', token)
    }

    saveIdentity(identity){
        localStorage.setItem('identity', JSON.stringify(identity))
    }

    getToken(){
        let token = localStorage.getItem('token')

        return token
    }

    getIdentity(){
        let identity = JSON.parse(localStorage.getItem('identity'))

        if(!identity && identity == 'undefined'){
            identity = null
        }

        return identity
    }

    clearDatos(){
        localStorage.removeItem('identity')
        localStorage.removeItem('token')
    }

    validate(route: string = 'inicio'){
        let identity = this.getIdentity()
        let status = false

        if(identity != null){
            this._router.navigate([route])
        }
    }

    sure(empleado = false){
        let identity = this.getIdentity()

        //validar si cuenta con credenciales
        if(identity == null){
            this._router.navigate(['login'])
        }else {
            //validar si la ruta solo se acede por empleados
            if(empleado == true){
                //verificar si es empleado
                if(!identity.rol){
                    this._router.navigate(['error'])
                }
            }
        }
    }
}