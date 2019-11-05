import { Component, OnInit } from '@angular/core';
import { Prestamo } from "../../../models/Prestamo";
import { PrestamoService } from "../../../services/Prestamo.service";
import { UserService } from "../../../services/User.service";
import { IdentityGuard } from "../../../services/identity.guard";
import { Persona } from "../../../models/Persona";
import { global } from "../../../services/global";
import * as Material from "../../../M.js";
import { Recargo } from 'src/app/models/Recargo';

@Component({
  selector: 'app-entrega',
  templateUrl: './entrega.component.html',
  styleUrls: ['./entrega.component.scss'],
  providers: [PrestamoService, UserService, IdentityGuard]
})
export class EntregaComponent implements OnInit {

  public prestamos: Array<Prestamo>
  public prestamo: Prestamo
  public persona: Persona
  public busqueda: boolean
  private M
  public url: string
  public total: number
  public status: boolean

  constructor(
    private _identityGuard: IdentityGuard,
    private _prestamoService: PrestamoService,
    private _userService: UserService
  ) { }

  ngOnInit() {

    this._identityGuard.sure(true, '/login/entrega', true)

    this.prestamo = Prestamo.prestamoDefault()
    this.url = global.ImageArticulo
    this.busqueda = false
    this.persona = Persona.PersonaDefault()
    this.persona.id = null
    this.M = Material.getM()
    this.total = 0
    this.status = true
  }

  onSubmit(form) {
    this.total = this.costo()
    this.prestamo.valor = this.total
    console.log(this.prestamo)

    this._prestamoService.update(this.prestamo, this._userService.getToken()).subscribe(
      Response => {
        console.log(Response)

        if (Response.status == "succes" && Response.code == 200) {
          for (let index = 0; index < this.prestamos.length; index++) {
            if (this.prestamos[index].id == this.prestamo.id) {
              this.prestamos.splice(index, 1)
            }
          }
          form.reset()
          this.prestamo = Prestamo.prestamoDefault()
          this.M.toast({ html: Response.message, classes: 'rounded' })
        }
      },
      error => {
        console.error(error)
      }
    )
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
        this.tooltip()
      },
      error => {
        if (error.error.message) {
          this.busqueda = false
        }
      }
    )
  }

  tooltip() {
    setTimeout(() => {
      let prestamos = document.getElementById('prestamos')

      if (prestamos && !this.busqueda) {
        var elems = document.querySelectorAll('.tooltipped');
        var instances = this.M.Tooltip.init(elems);
      }
    }, 30);
  }

  entregaPrestamo(idPrestamo) {

    //obtener prestamo
    this.prestamos.forEach(prestamo => {
      if (prestamo.id == idPrestamo) {
        this.prestamo = prestamo
      }
    });

    this.prestamo.damage = false
    this.total = this.costo()
  }

  back() {
    this.prestamo = Prestamo.prestamoDefault()
    this.total = 0
  }

  damage(estado = true) {
    if(estado){
      this.prestamo.recargo = []
      console.log(this.prestamo.recargo)
    }else{
      let danio = Recargo.recargoDefault()
  
      danio.id_prestamo = this.prestamo.id
      danio.damage = true
      danio.motivo = 'Articulo dañado'
      danio.total = this.prestamo.articulo.precio
      this.prestamo.damage = true
      this.prestamo.motivo = 'Articulo dañado'
      this.prestamo.valor = this.costo()
  
      this.prestamo.recargo.push(danio)
      this.total = this.costo()
    }
  }

  costo() {
    let total: number = +0

    this.prestamo.recargo.forEach(Recargo => {
      total = +total + +Recargo.total
    })

    return total
  }

}
