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

  public personaData: Persona
  public prestamo: Prestamo
  public articulos: Array<Articulos>
  public url: string
  private M
  private carga: boolean
  public persona_status: boolean

  constructor(
    private _identityGuard: IdentityGuard,
    private _articuloService: ArticuloService,
    private _userService: UserService,
    private _prestamoService: PrestamoService
  ) { }

  ngOnInit() {

    this.url = global.ImageArticulo
    this.personaData = Persona.PersonaDefault()
    this.prestamo = Prestamo.prestamoDefault()
    this.persona_status = true

    this.M = Material.getM()
    this.carga = false

    this.getArticulos()
  }

  onSubmit(form){
    if(this.persona_status){

      this._prestamoService.addPrestamo(this.prestamo, this._userService.getToken()).subscribe(
        response => {
          this.M.toast({html: response.message, classes: 'rounded'})
          form.reset()
          this.persona_status = null
        },
        error => {
          console.error(error)
        }
      )
    }else{
      this.M.toast({ html: 'Persona no registrada', classes: 'rounded'})
    }
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

  findPersona(){
    if(this.prestamo.codigo_persona){
      this._userService.getPersona(this.prestamo.codigo_persona).subscribe(
        response => {
          this.persona_status = true
          this.personaData.id = response.persona.id
          this.personaData.nombre = response.persona.nombre
          this.personaData.apellido = response.persona.apellido
        },
        error => { 
          this.persona_status = false
          this.personaData = Persona.PersonaDefault()
        })
    }else{
      this.persona_status = false
    }
  }

}
