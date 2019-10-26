import { Component, OnInit } from '@angular/core';
import { UserService } from "../../../services/UserService";
import { ArticuloService } from "../../../services/ArticuloService";
import * as Material from "../../../M.js";

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.scss'],
  providers: [
    UserService,
    ArticuloService
  ]
})
export class ListadoComponent implements OnInit {

  private M;

  constructor(
    private _userService: UserService,
    private _articuloService: ArticuloService
  ) {
    this.M = Material.getM()
   }

  ngOnInit() {

    this._userService.sure(true)
  }

}
