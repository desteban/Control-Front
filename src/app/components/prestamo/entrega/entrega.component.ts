import { Component, OnInit } from '@angular/core';
import { Prestamo } from "../../../models/Prestamo";
import { PrestamoService } from "../../../services/Prestamo.service";
import { UserService } from "../../../services/User.service";
import { IdentityGuard } from "../../../services/identity.guard";
import { Persona } from "../../../models/Persona";
import { global } from "../../../services/global";
import * as Material from "../../../M.js";

@Component({
  selector: 'app-entrega',
  templateUrl: './entrega.component.html',
  styleUrls: ['./entrega.component.scss'],
  providers: [PrestamoService, UserService, IdentityGuard]
})
export class EntregaComponent implements OnInit {

  public prestamos: Array<Prestamo>
  public persona: Persona
  public busqueda: boolean
  private M
  public url: string

  constructor(
    private _identityGuard: IdentityGuard,
    private _prestamoService: PrestamoService,
    private _userService: UserService
  ) { }

  ngOnInit() {

    this._identityGuard.sure(true, '/login/entrega', true)

    this.url = global.ImageArticulo
    this.busqueda = false
    this.persona = Persona.PersonaDefault()
    this.persona.id = null
    this.M = Material.getM()
  }

  onSubmit(form) {

  }

  findPersona() {
    this._userService.getPersona(this.persona.id).subscribe(
      response => {

        //validar persona
        if (response.status == "succes" && response.code == 200) {

          this.persona.nombre = response.persona.nombre
          this.persona.apellido = response.persona.apellido

          //buscar prestamos pendientes
          this.busqueda = true
          this.getPrestamos()
        }
      },
      error => {
        this.M.toast({ html: 'Persona no encontrada', classes: 'rounded' })
        this.prestamos = []
        this.persona = Persona.PersonaDefault()
      }
    )
  }

  getPrestamos() {
    this._prestamoService.getPrestamos(this.persona.id, this._userService.getToken()).subscribe(
      response => {
        this.prestamos = response.prestamos
        this.busqueda = false
        console.log(this.prestamos)
        this.tooltip()
      },
      error => {
        console.error(error)
      }
    )
  }

  tooltip(){
    setTimeout(() => {
      let prestamos = document.getElementById('prestamos')

      if(prestamos && !this.busqueda){
        console.log('tooltip')
        var elems = document.querySelectorAll('.tooltipped');
        var instances = this.M.Tooltip.init(elems);
      }
    }, 30);
  }

  //prestamos


}
