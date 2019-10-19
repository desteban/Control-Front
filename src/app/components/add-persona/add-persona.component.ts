import { Component, OnInit } from '@angular/core';

import { Persona } from "../../models/Persona";
import { UserService } from "../../services/UserService";

@Component({
  selector: 'app-add-persona',
  templateUrl: './add-persona.component.html',
  styleUrls: ['./add-persona.component.scss'],
  providers: [UserService]
})
export class AddPersonaComponent implements OnInit {

  public persona:Persona
  public role:string
  public datos:any


  constructor(
    private _userService: UserService
  ) {
    this.persona = Persona.PersonaDefault()
    this.role = 'Empleado'
   }

  ngOnInit() {
  }

  onSubmint(form){

    //password por defecto
    this.persona.password = this.persona.cc

    //enviar datos
    this._userService.register(this.persona).subscribe(
      response => {

        console.log(response)
        //limpiar formulario
        form.reset()
        M.toast({html: 'Persona creada exitosamente', classes: 'rounded'})
      },
      error => {
        console.log('Tenemos un error')
        console.error(error);
      })
  }

  getRol(role){
    
    if(role){
      this.role = 'Estudiante'
      this.persona.carrera = ''
    }else{
      this.role = 'Empleado'
      this.persona.carrera = ''
      this.persona.carrera = null
      this.persona.semestre = null
    }
  }

  getSeleccion(){
    
    //autocomplete
    setTimeout(() => {
      this.datos = document.getElementById('autocomplete')
      this.datos = this.datos.value

      if(this.role == 'Estudiante'){

        this.persona.rol = 'Estudiante'
        this.persona.carrera = this.datos
      }else{

        this.persona.rol = this.datos
      }
    }, 10)}

}
