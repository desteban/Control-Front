import { Component, OnInit } from '@angular/core';
import { Articulos } from "../../../models/Articulos";
import * as Material from "../../../M.js"
import { global } from "../../../services/global";
import { UserService } from "../../../services/UserService";
import { ArticuloService } from "../../../services/ArticuloService";
import { Router } from "@angular/router";

@Component({
  selector: 'app-add-articulo',
  templateUrl: './add-articulo.component.html',
  styleUrls: ['./add-articulo.component.scss'],
  providers: [
    UserService,
    ArticuloService
  ]
})
export class AddArticuloComponent implements OnInit {

  public articulo: Articulos
  public dirPicture: String
  private input: any
  public M: any
  public options: Object;
  public afuConfig;
  public errorFile: boolean
  public peso: number = 5
  private token;

  constructor(
    private _userService: UserService,
    private _articuloService: ArticuloService,
    private _router:Router
  ) {
    this.articulo = Articulos.articuloDefault()
    this.M = Material.getM()
    this.errorFile = false
    this.token = this._userService.getToken()
  }

  ngOnInit() {

    this.options = {
      placeholderText: 'Puedes agregar una descripcion del producto',
      charCounterCount: true,
      toolbarButtons: ['bold', 'italic', 'underline', 'paragraphFormat', 'alert'],
      toolbarButtonsXS: ['bold', 'italic', 'underline', 'paragraphFormat', 'alert'],
      toolbarButtonsSM: ['bold', 'italic', 'underline', 'paragraphFormat', 'alert'],
      toolbarButtonsMD: ['bold', 'italic', 'underline', 'paragraphFormat', 'alert'],
    }
  }

  onSubmit() {

    this._articuloService.createArticulo(this.articulo, this.token).subscribe(
      response => {

        console.log(response)
        this.articulo.id = response.articulo.id
        console.log(`El id es: ${this.articulo.id}`)
        this.optionUpload()
      },
      error => {
        this.M.toast({ html: `<span>${error.error.message}</span>`, classes: 'rounded toatPers' })
      }
    )
  }

  public toogleButtons() {
    //ocultar o mostrar botones
    document.getElementById('fileName').classList.toggle('hide')
    document.getElementById('btnUpload').classList.toggle('hide')
    document.getElementById('btnCancel').classList.toggle('hide')
  }

  upload(datos) {
    let response = JSON.parse(datos.response)

    this.M.toast({ html: `<span>${response.message}</span>`, classes: 'rounded toatPers' })
    this._router.navigate(['inicio'])
  }

  private optionUpload(){
    this.afuConfig = {
      multiple: false,
      formatsAllowed: ".jpg,.png",
      maxSize: this.peso, //tamaño en mb
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

}
