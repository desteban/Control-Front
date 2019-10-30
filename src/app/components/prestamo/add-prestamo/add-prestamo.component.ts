import { Component, OnInit } from '@angular/core';
import { Persona } from "../../../models/Persona";
import { Articulos } from "../../../models/Articulos";
import { Prestamo } from "../../../models/Prestamo";
import { IdentityGuard } from "../../../services/identity.guard";
import { ArticuloService } from "../../../services/Articulo.service";
import { UserService } from 'src/app/services/User.service';
import { PrestamoService } from 'src/app/services/Prestamo.service';
import { global } from "../../../services/global";
import * as Material from "../../../M.js";

@Component({
  selector: 'app-add-prestamo',
  templateUrl: './add-prestamo.component.html',
  styleUrls: ['./add-prestamo.component.scss'],
  providers: [IdentityGuard, ArticuloService, UserService, PrestamoService]
})
export class AddPrestamoComponent implements OnInit {

  public estudiante: Persona
  public prestamo: Prestamo
  public articulos: Array<Articulos>
  public url: string
  private M
  private carga: boolean

  constructor(
    private _identityGuard: IdentityGuard,
    private _articuloService: ArticuloService,
    private _userService: UserService,
    private _prestamoService: PrestamoService
  ) { }

  ngOnInit() {

    this.url = global.ImageArticulo
    this.estudiante = Persona.PersonaDefault()
    this.prestamo = Prestamo.prestamoDefault()

    this.M = Material.getM()
    this.carga = false

    this.getArticulos()
  }

  onSubmit(form){
    console.log(this.prestamo)
  }

  private getArticulos(){
    this._articuloService.getAllArticulos(this._userService.getToken()).subscribe(
      response => {
        if(response.status == "succes"){
          this.articulos = response.articulos
          this.selectCharge()
        }
      },
      error => {
        console.error(error)
      }
    )
  }

  select(){
    console.log('show')
    if (!this.carga){
      var elems = document.querySelectorAll('select');
      var instances = this.M.FormSelect.init(elems);
      this.carga = true
    }
  }

  selectCharge(){
    setTimeout(() => {
      let formulario = document.getElementById('prestamoForm')
      if(formulario){
        this.select()
      }
    }, 30);
  }

}
