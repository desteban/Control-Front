import { Component, OnInit } from '@angular/core';

//importar modelo de persona
import { Persona } from "../../models/persona";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  
  public page_tittle:string
  public persona:Persona

  constructor() { 
    this.page_tittle = 'Login'
    this.persona = Persona.PersonaDefault()
  }

  ngOnInit() {
  }

  onSubmit(){

  }
}
