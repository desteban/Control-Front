//rutas
import { ModuleWithProviders } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

//COMPONENTES
import { HomeComponent } from "./components/home/home.component";
import { LoginComponent } from "./components/login/login.component";
import { NotFoundComponent } from "./components/error/not-found/not-found.component";
import { SureComponent } from "./components/error/sure/sure.component";
import { AddPersonaComponent } from "./components/add-persona/add-persona.component";
import { AddArticuloComponent } from "./components/articulo/add-articulo/add-articulo.component";
import { ListadoComponent } from "./components/articulo/listado/listado.component";
import { UpdateArticuloComponent } from "./components/articulo/update-articulo/update-articulo.component";
import { PerfilComponent } from "./components/perfil/perfil.component";

//DEFINIR RUTAS
const appRoutes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'inicio', component: HomeComponent },
    { path: 'persona/crear', component: AddPersonaComponent },
    { path: 'login', component: LoginComponent },
    { path: 'perfil', component: PerfilComponent },
    { path: 'logout/:sure', component: LoginComponent },
    { path: 'articulo/nuevo', component: AddArticuloComponent },
    { path: 'articulos', component: ListadoComponent },
    { path: 'articulo/editar', component: UpdateArticuloComponent },
    { path: 'error', component: SureComponent },
    { path: '**', component: NotFoundComponent }
]

//exportar rutas
export const appRoutingProviders: any[] = []
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes)