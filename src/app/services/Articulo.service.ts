import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
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

        let header = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
            .set('Auth', this.token);

        return this._http.post(this.url + 'Articulo', params, { headers: header })
    }

    getAllArticulos(token): Observable<any> {

        let headers = new HttpHeaders().set('Content-Type', 'aplication/x-www-form-urlencoded')
            .set('Auth', token)

        return this._http.get(this.url + 'Articulo', { headers: headers })
    }

    getArticulo(id: number): Observable<any> {

        let header = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')

        return this._http.get(this.url + 'Articulo/' + id)
    }

    updateArticulo(articulo: Articulos, token): Observable<any> {

        let json = JSON.stringify(articulo)
        let params = `json=${json}`

        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
            .set('Auth', token)

        return this._http.put(this.url + 'Articulo/' + articulo.id, params, { headers: headers })
    }
}