import { Component, OnInit } from '@angular/core';
import { UserService } from "../../services/User.service";
import { IdentityGuard } from "../../services/identity.guard";
import { Persona } from "../../models/Persona";
import { global } from "../../services/global";
import * as Material from "../../M.js"

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss'],
  providers: [UserService, IdentityGuard]
})
export class PerfilComponent implements OnInit {

  public persona: Persona;
  public url: string;
  public afuConfig;
  public identity;
  private M;

  constructor(
    private _userService: UserService,
    private _identityGuard: IdentityGuard
  ) { 
    this.persona = Persona.PersonaDefault()
  }

  ngOnInit() {
    //this._userService.sure()
    this._identityGuard.sure(true, '/login/perfil')
    
    //obtener datos del local storage
    this.getIdentity()
    this.url = global.Avatar
    this.uploader()

    this.M = Material.getM()
  }

  onSubmit(form){

    this._userService.update(this.persona, this._userService.getToken())
    .subscribe(
      response => {
        if(response.status == "succes" && response.code == 200){
          this.M.toast({html: 'Contraseña actualizada', classes: 'rounded'})

          this.persona.password = null
        }else{
          this.M.toast({ html: response.message, classes: 'rounded' })
        }
      }, 
      error => {
        console.error(error)
      }
    )
  }

  getIdentity(){
    this.identity = this._userService.getIdentity()

    this.persona.id = this.identity.sub
    this.persona.nombre = this.identity.nombre
    this.persona.apellido = this.identity.apellido
    this.persona.cc = this.identity.cc
    this.persona.foto = this.identity.foto
  }

  uploader(){
    this.afuConfig = {
      multiple: false,
      formatsAllowed: ".jpg,.png",
      maxSize: 5 , //tamaño en mb
      uploadAPI: {
        url: global.Apiurl + 'persona/upload',
        headers: {
          "Auth": this._userService.getToken()
        }
      },
      theme: "attachPin",
      hideProgressBar: false,
      hideResetBtn: true,
      hideSelectBtn: false,
      replaceTexts: {
        attachPinBtn: 'Cambiar foto'
      }
    }

  }

  upload(datos) {
    let response = JSON.parse(datos.response)
    console.log(response)

    if(response.code == 200 && response.status == "succes"){
      this.M.toast({ html: `<span>${response.message}</span>`, classes: 'rounded toatPers' })

      //guardar cambios
      this.identity.foto = response.file
      this._userService.saveIdentity(this.identity)
    }else{
      this.M.toast({ html: `<span>No se puede actualizar la foto en estos momentos</span>`, classes: 'rounded toatPers' })      
    }
  }

}
