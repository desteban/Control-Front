import { Component, OnInit, DoCheck } from '@angular/core';
import { UserService } from "./services/UserService";
import * as Material from "./M.js"

/**
 * DoCheck permite realizar acciones cuando re registre un cambio en la aplcacion
 * por ejemplo si borramos o escribimos datos (localstorage)
 */

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [UserService]
})
export class AppComponent implements OnInit, DoCheck {

  
  public title = 'Control-Front';
  public token;
  public identity
  public M;
  
  constructor(
    public _userService: UserService
    ){
      this.getIdentity()
      this.M = Material.getM()
    }
    
    ngOnInit() {
      this.getIdentity()
      console.log('app cargada')
    }

    ngDoCheck() {
      this.getIdentity()
    }

    private getIdentity(){
      this.token = this._userService.getToken()
      this.identity = this._userService.getIdentity()
    }

  }
