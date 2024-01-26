import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { RegistrarUsuarioComponent } from './components/registrar-usuario/registrar-usuario.component'; 
import { InventarioComponent } from './components/inventario/inventario.component';
import { ControlComponent } from './components/control/control.component';
import { ModificarUsuarioComponent } from './components/modificar-usuario/modificar-usuario.component';
const routes: Routes = [
{path:"",redirectTo: "login",pathMatch: "full"},{path:'login',component: LoginComponent,},
{path:'nuevoUsuario',redirectTo:'nuevoUsuario', pathMatch:'full'},{path:'nuevoUsuario',component:RegistrarUsuarioComponent,},
{path:'home',redirectTo: 'home',pathMatch: 'full'},{path:'home',component:InicioComponent,},
{path:'inventario',redirectTo: 'inventario',pathMatch: 'full'},{path:'inventario',component:InventarioComponent,},
{path:'control',redirectTo: 'control',pathMatch: 'full'},{path:'control',component:ControlComponent,},
{path:'modificarUsuario',redirectTo: 'modificarUsuario',pathMatch: 'full'},{path:'modificarUsuario',component:ModificarUsuarioComponent,},
{path:"modificarInventario",redirectTo:"modificarInventario",pathMatch:"full"},{path:"modificarInventario",component:InventarioComponent,}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
