import { Component } from '@angular/core';
import { UserService } from "./services/UserService";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [UserService]
})
export class AppComponent {

  public title = 'Control-Front';
  public token;
  public identity

  constructor(
    public _userService: UserService
  ){
    this.token = this._userService.getToken()
    this.identity = this._userService.getIdentity()
  }
}
