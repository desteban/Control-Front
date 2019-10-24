import { Component, OnInit } from '@angular/core';
import { UserService } from "../../services/UserService";
import { Router, ActivatedRoute, Params } from "@angular/router";
import * as Material from "../../M.js"

//importar modelo de persona
import { Persona } from "../../models/persona";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [UserService]
})
export class LoginComponent implements OnInit {

  public page_tittle: string
  public persona: Persona
  private token: string
  private identity: any
  public M: any

  constructor(
    private _userService: UserService,
    private _router: Router,
    private _route: ActivatedRoute
  ) {
    this.persona = Persona.PersonaDefault()
    this.M = Material.getM()
  }

  ngOnInit() {
    //cerrar secion cuando llega sure por la url
    this.logout()
    this._userService.validate()
  }

  onSubmit(form) {

    this._userService.login(this.persona).subscribe(
      response => {

        //validar si tenemos errores de validacion
        if (response.status) {
          this.M.toast({ html: response.message, classes: 'rounded toatPers' })
        } else {

          //obtener token
          this.token = response

          //obtener identity de la persona
          this._userService.login(this.persona, true).subscribe(
            response => {

              this.identity = response
              
              //Guardar datos en localStorage
              this._userService.saveToken(this.token)
              this._userService.saveIdentity(this.identity)

              //vaciar el formulario
              form.reset()
              //window.location.reload()
            },
            error => {  }
          )
        }
      },
      error => {
        console.error(error)})
  }

  logout(){

    this._route.params.subscribe(params => {

      //cast a int
      let logout = +params['sure']

      if(logout == 1){
        this._userService.clearDatos()
        this.identity = null,
        this.token = null

        //redireccion a inicio
        this._router.navigate(['inicio'])
      }
    })
  }
}
