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

    update(persona:Persona, token): Observable<any>{

        let json = JSON.stringify(persona)
        let params = `json=${json}`

        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
            .set('Auth', token)

        return this._http.put(this.url + 'personas/' +persona.id, params, {headers: headers})
    }
}