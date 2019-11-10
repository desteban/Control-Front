import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from "@angular/common/http";
import { routing, appRoutingProviders } from "./app.routing";
import { FormsModule } from "@angular/forms";
//editor de texto
import { FroalaEditorModule, FroalaViewModule } from "angular-froala-wysiwyg";
//file uploader
import { AngularFileUploaderModule } from "angular-file-uploader";

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { AddPersonaComponent } from './components/add-persona/add-persona.component';
import { AddArticuloComponent } from './components/articulo/add-articulo/add-articulo.component';
import { UpdateArticuloComponent } from './components/articulo/update-articulo/update-articulo.component';
import { UpdatePersonaComponent } from './components/usuario/update-persona/update-persona.component';
import { ListadoComponent } from './components/articulo/listado/listado.component';
import { SureComponent } from './components/error/sure/sure.component';
import { NotFoundComponent } from './components/error/not-found/not-found.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { AddPrestamoComponent } from './components/prestamo/add-prestamo/add-prestamo.component';
import { EntregaComponent } from './components/prestamo/entrega/entrega.component';

//https://github.com/froala/angular-froala-wysiwyg/issues/305
import 'froala-editor/js/plugins/char_counter.min.js';
import 'froala-editor/js/plugins/lists.min.js';
import 'froala-editor/js/plugins/paragraph_format.min.js';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    AddPersonaComponent,
    AddArticuloComponent,
    UpdateArticuloComponent,
    UpdatePersonaComponent,
    ListadoComponent,
    SureComponent,
    NotFoundComponent,
    PerfilComponent,
    AddPrestamoComponent,
    EntregaComponent,
  ],
  imports: [
    BrowserModule,
    routing,
    FormsModule,
    HttpClientModule,
    FroalaEditorModule.forRoot(),
    FroalaViewModule.forRoot(),
    AngularFileUploaderModule
  ],
  providers: [
    appRoutingProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
