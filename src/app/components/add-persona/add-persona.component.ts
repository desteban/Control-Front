import { Component, OnInit } from '@angular/core';

import { Persona } from "../../models/Persona";
import { UserService } from "../../services/User.service";
import * as Material from "../../M.js";

@Component({
  selector: 'app-add-persona',
  templateUrl: './add-persona.component.html',
  styleUrls: ['./add-persona.component.scss'],
  providers: [UserService]
})
export class AddPersonaComponent implements OnInit {

  public persona: Persona
  public role: string
  public datos: any
  public M: any

  constructor(
    private _userService: UserService
  ) {
    this.persona = Persona.PersonaDefault()
    this.role = 'Empleado'
    this.M = Material.getM()
  }

  ngOnInit() {
  }

  onSubmint(form) {

    //password por defecto
    this.persona.password = this.persona.cc

    //enviar datos
    this._userService.register(this.persona).subscribe(
      response => {

        console.log(response)
        //limpiar formulario
        form.reset()
        //Mostrar un toast con infomacio
        this.M.toast({ html: 'Persona creada exitosamente', classes: 'rounded toatPers' })
      },
      error => {
        console.log(this.persona)
        console.error(error)

        if (error.error.error.cc) {
          this.M.toast({ html: `<span>Esta cedula ya fue registrada</span>`, classes: 'rounded toatPers' })
        }

      })
  }

  getRol(role) {

    if (role) {
      this.role = 'Estudiante'
      this.persona.carrera = ''
    } else {
      this.role = 'Empleado'
      this.persona.carrera = ''
      this.persona.carrera = null
      this.persona.semestre = null
    }
  }

  getSeleccion() {

    //autocomplete
    setTimeout(() => {
      this.datos = document.getElementById('autocomplete')
      this.datos = this.datos.value

      if (this.role == 'Estudiante') {

        this.persona.rol = 'Estudiante'
        this.persona.carrera = this.datos
      } else {

        this.persona.rol = this.datos
      }
    }, 10)
  }

}
