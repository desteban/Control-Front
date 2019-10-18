import { Component, OnInit } from '@angular/core';

import { Persona } from "../../models/Persona";

@Component({
  selector: 'app-add-persona',
  templateUrl: './add-persona.component.html',
  styleUrls: ['./add-persona.component.scss']
})
export class AddPersonaComponent implements OnInit {

  public persona:Persona
  public role:string
  public datos:any


  constructor() {
    this.persona = Persona.PersonaDefault()
    this.role = 'Empleado'
   }

  ngOnInit() {
  }

  onSubmint(form){

    console.log(this.persona)
    //limpiar formulario
  }

  getRol(role){
    
    if(role){
      this.role = 'Estudiante'
      this.persona.rol = ''
    }else{
      this.role = 'Empleado'
      this.persona.rol = ''
      this.persona.carrera = null
      this.persona.semestre = null
    }
  }

  getSeleccion(data){
    
    //autocomplete
    setTimeout(() => {
      this.datos = document.getElementById('autocomplete')
      this.datos = this.datos.value
      console.log(this.datos)

      if(this.role == 'Estudiante'){
        this.persona.carrera = this.datos
        this.persona.rol = 'Estudiante'
      }else{
        this.persona.rol = this.datos
      }
    }, 50)}

}
