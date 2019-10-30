import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { IdentityGuard } from "../../../services/identity.guard";
import { ArticuloService } from "../../../services/Articulo.service";
import { UserService } from "../../../services/User.service";
import { Articulos } from "../../../models/Articulos";
import { global } from "../../../services/global";
import * as Material from "../../../M.js";

@Component({
  selector: 'app-update-articulo',
  templateUrl: './update-articulo.component.html',
  styleUrls: ['./update-articulo.component.scss'],
  providers: [IdentityGuard, ArticuloService, UserService]
})
export class UpdateArticuloComponent implements OnInit {

  public articulo: Articulos
  public afuConfig
  public url: string
  public options;
  public carga: boolean
  private M;

  constructor(
    private _identityGuard: IdentityGuard,
    private _router: Router,
    private _route: ActivatedRoute,
    private _articuloService: ArticuloService,
    private _userService: UserService
  ) { }

  ngOnInit() {

    this.articulo = Articulos.articuloDefault()
    this.getArticulo()
    this._identityGuard.sure(true, 'articulo/editar', true)

    //cargar complementos de estetica
    this.optionUpload()
    this.M = Material.getM()
    this.url = global.Apiurl + 'Articulo/foto/'
    this.carga = false
    this.options = {
      placeholderText: 'Puedes agregar una descripcion del producto',
      charCounterCount: true,
      toolbarButtons: ['bold', 'italic', 'underline', 'paragraphFormat', 'alert'],
      toolbarButtonsXS: ['bold', 'italic', 'underline', 'paragraphFormat', 'alert'],
      toolbarButtonsSM: ['bold', 'italic', 'underline', 'paragraphFormat', 'alert'],
      toolbarButtonsMD: ['bold', 'italic', 'underline', 'paragraphFormat', 'alert'],
    }


  }

  private getId() {
    //obtener id del articulo
    this._route.params.subscribe(param => {
      this.articulo.id = +param['id']
    })
  }

  private getArticulo() {

    this.getId()
    this._articuloService.getArticulo(this.articulo.id).subscribe(
      response => {

        let articuloDB = response.articulo

        this.articulo.nombre = articuloDB.nombre
        this.articulo.descripcion = articuloDB.descripcion
        this.articulo.foto = articuloDB.foto
        this.articulo.cantidad = articuloDB.cantidad
        this.articulo.precio = articuloDB.precio

        this.carga = true

      },
      error => {
        this._router.navigate([`articulo/editar`])
      }
    )
  }

  onSubmit(form) {
    this._articuloService.updateArticulo(this.articulo, this._userService.getToken()).subscribe(
      response => {
        this.M.toast({ html: response.message, classes: 'rounded' })
      },
      error => {
        console.error(error)
      }
    )
  }

  private optionUpload() {
    this.afuConfig = {
      multiple: false,
      formatsAllowed: ".jpg,.png",
      maxSize: 5, //tamaño en mb
      uploadAPI: {
        url: global.Apiurl + 'Articulo/upload/' + this.articulo.id,
        headers: {
          "Auth": this._userService.getToken()
        }
      },
      theme: "attachPin",
      hideProgressBar: false,
      hideResetBtn: true,
      hideSelectBtn: false,
      replaceTexts: {
        attachPinBtn: 'Sube una foto'
      }
    }
  }

  upload(datos) {
    let response = JSON.parse(datos.response)

    this.M.toast({ html: `${response.message}`, classes: 'rounded' })

  }

}
