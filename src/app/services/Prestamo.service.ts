import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Prestamo } from "../models/Prestamo";
import { Observable } from "rxjs";
import { global } from "./global";

@Injectable()
export class PrestamoService {

    constructor(
        private _http: HttpClient
    ) { }

    addPrestamo(prestamo: Prestamo, token): Observable<any> {

        let json = JSON.stringify(prestamo)
        let params = `json=${json}`

        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
            .set('Auth', token)

        return this._http.post(global.Apiurl + 'Prestamo', params, { headers: headers })
    }

    getPrestamos(codigo: number, token): Observable<any> {

        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
            .set('Auth', token)

        return this._http.get(`${global.Apiurl}Prestamo/${codigo}/pendiente`, { headers: headers })
    }

    update(prestamo: Prestamo, token): Observable<any> {

        prestamo.articulo = null
        prestamo.recargo = null

        let json = JSON.stringify(prestamo)
        let params = `json=${json}`

        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
            .set('Auth', token)

        return this._http.put(`${global.Apiurl}Prestamo/${prestamo.id}`, params, {headers:headers})
    }
}