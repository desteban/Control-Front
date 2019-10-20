import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { observable } from "rxjs";
import { Articulos } from "../models/Articulos";
import { global } from "./global";

@Injectable()
export class ArticuloService {

    public url: string

    constructor(
        public _http: HttpClient
    ) {
        this.url = global.Apiurl
    }
}