import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { RegistrarUsuarioComponent } from './components/registrar-usuario/registrar-usuario.component'; 
import { InventarioComponent } from './components/inventario/inventario.component';
import { ControlComponent } from './components/control/control.component';
import { ModificarUsuarioComponent } from './components/modificar-usuario/modificar-usuario.component';
import { CarritoComponent } from './components/carrito/carrito.component';
import { MostrarProductosComponent } from './components/mostrar-productos/mostrar-productos.component';
<<<<<<< HEAD
import { ReportesComponent } from './components/reportes/reportes.component';
import { PedidosComponent } from './components/pedidos/pedidos.component';
=======
import { PedidosComponent } from './components/pedidos/pedidos.component';
import { ReportesComponent } from './components/reportes/reportes.component';
>>>>>>> buena
const routes: Routes = [
{path:"",redirectTo: "login",pathMatch: "full"},{path:'login',component: LoginComponent,},

{path:'home',component:InicioComponent,
children:
[
  {path:'carrito',redirectTo: 'carrito',pathMatch: 'full'},
  {path:'carrito',component:CarritoComponent,},
  {path:"",component:MostrarProductosComponent,},
]
},
{path:'control',component:ControlComponent,children:
[
  {path:'inventario',redirectTo: 'inventario',pathMatch: 'full'},{path:'inventario',component:InventarioComponent,},
  {path:'pedidos',redirectTo: 'pedidos',pathMatch: 'full'},{path:'pedidos',component:PedidosComponent,},
  {path:'reportes',redirectTo: 'reportes',pathMatch: 'full'},{path:'reportes',component:ReportesComponent,},
  {path:'modificarUsuario',redirectTo: 'modificarUsuario',pathMatch: 'full'},{path:'modificarUsuario',component:ModificarUsuarioComponent,},
]
},
{path:'nuevoUsuario',component:RegistrarUsuarioComponent,},

//{path:'control',redirectTo: 'control',pathMatch: 'full'},{path:'control',component:ControlComponent,},



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
