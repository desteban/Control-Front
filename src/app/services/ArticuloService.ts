import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { observable, Observable } from "rxjs";
import { Articulos } from "../models/Articulos";
import { global } from "./global";

@Injectable()
export class ArticuloService {

    public url: string
    private token;

    constructor(
        public _http: HttpClient
    ) {
        this.url = global.Apiurl
    }

    createArticulo(articulo, token): Observable<any> {

        this.token = token
        let json = JSON.stringify(articulo)
        let params = `json=${json}`

        /*let header = new HttpHeaders({
            'Auth': this.token,
            'Content-Type': 'application/x-www-form-urlencoded'
        })*/

        let header = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded')
                                        .set('Auth', this.token);

        return this._http.post(this.url + 'Articulo', params, { headers: header })
    }

    getAllArticulos(token){
    }
}