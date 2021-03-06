import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { UserService } from "../../../services/User.service";
import { ArticuloService } from "../../../services/Articulo.service";
import { IdentityGuard } from "../../../services/identity.guard";
import { Articulos } from "../../../models/Articulos";
import { global } from "../../../services/global";
import * as Material from "../../../M.js";

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.scss'],
  providers: [
    UserService,
    ArticuloService,
    IdentityGuard,
  ]
})
export class ListadoComponent implements OnInit {

  private M;
  private token;
  public articulos: Array<Articulos>
  public url: string
  public urlHistorial: string

  constructor(
    private _userService: UserService,
    private _articuloService: ArticuloService,
    private _identityGuard: IdentityGuard,
    private _router: Router,
  ) {
    this.M = Material.getM()
  }

  ngOnInit() {

    this.url = global.ImageArticulo
    this.urlHistorial = global.Apiurl
    this._identityGuard.sure(true, 'login/articulos', true)

    this.token = this._userService.getToken()
    this.getArticulos()
  }

  private getArticulos() {
    this._articuloService.getAllArticulos(this.token).subscribe(
      response => {
        if (response.status == "succes") {
          this.articulos = response.articulos
        }
      },
      error => {
        console.error(error)
      }
    )
  }

  historial(){
    this.M.toast({ html: 'Generando reporte', classes: 'rounded' })
  }

  updateArticulo(id) {
    this._router.navigate([`articulo/editar/${id}`])
  }

}
