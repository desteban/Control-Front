//rutas
import { ModuleWithProviders } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

//COMPONENTES
import { HomeComponent } from "./components/home/home.component";
import { LoginComponent } from "./components/login/login.component";
import { ErrorComponent } from "./components/error/error.component";
import { AddPersonaComponent } from "./components/add-persona/add-persona.component";
import { AddArticuloComponent } from "./components/articulo/add-articulo/add-articulo.component";
import { UpdateArticuloComponent } from "./components/articulo/update-articulo/update-articulo.component";

//DEFINIR RUTAS
const appRoutes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'inicio', component: HomeComponent },
    { path: 'persona/crear', component: AddPersonaComponent },
    { path: 'login', component: LoginComponent },
    { path: 'logout/:sure', component: LoginComponent },
    { path: 'articulo/nuevo', component: AddArticuloComponent },
    { path: 'articulos', component: UpdateArticuloComponent },
    { path: '**', component: ErrorComponent }
]

//exportar rutas
export const appRoutingProviders: any[] = []
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes)