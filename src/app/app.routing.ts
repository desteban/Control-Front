//rutas
import { ModuleWithProviders } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

//COMPONENTES
import { HomeComponent } from "./components/home/home.component";
import { LoginComponent } from "./components/login/login.component";
import { ErrorComponent } from "./components/error/error.component";
import { AddPersonaComponent } from "./components/add-persona/add-persona.component";

//DEFINIR RUTAS
const appRoutes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'persona/crear', component: AddPersonaComponent },
    { path: 'login', component: LoginComponent },
    { path: '**', component: ErrorComponent }
]

//exportar rutas
export const appRoutingProviders: any[] = []
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes)