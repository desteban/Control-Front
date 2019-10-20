import { Component, OnInit } from '@angular/core';
import { Articulos } from "../../../models/Articulos";
import * as Material from "../../../M.js"

@Component({
  selector: 'app-add-articulo',
  templateUrl: './add-articulo.component.html',
  styleUrls: ['./add-articulo.component.scss']
})
export class AddArticuloComponent implements OnInit {

  public articulo: Articulos
  public dirPicture: String
  private input: any
  public M: any
  public options: Object = {
    placeholderText: 'Puedes agregar una descripcion del producto',
    charCounterCount: true,
    toolbarButtons: ['bold', 'italic', 'underline', 'paragraphFormat','alert'],
    toolbarButtonsXS: ['bold', 'italic', 'underline', 'paragraphFormat','alert'],
    toolbarButtonsSM: ['bold', 'italic', 'underline', 'paragraphFormat','alert'],
    toolbarButtonsMD: ['bold', 'italic', 'underline', 'paragraphFormat','alert'],
  };

  constructor() {
    this.articulo = Articulos.articuloDefault()
    this.M = Material.getM()
   }

  ngOnInit() {
  }

  onSubmit(){

  }

  public toogleButtons () {
    //ocultar o mostrar botones
    document.getElementById('fileName').classList.toggle('hide')
    document.getElementById('btnUpload').classList.toggle('hide')
    document.getElementById('btnCancel').classList.toggle('hide')

    //pasar valor
    this.input =  document.getElementById('file')
    this.dirPicture = this.input.files[0].name
  }

}
