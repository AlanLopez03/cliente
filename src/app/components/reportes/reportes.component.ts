import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from '../../services/usuario/usuario.service';
import { InventarioService } from '../../services/inventario/inventario.service';
import { ReportesService } from '../../services/reportes/reportes.service';
import { ventas } from '../../models/ventas';
import { intervaloFecha } from '../../models/ventas';
@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrl: './reportes.component.css'
})
export class ReportesComponent implements OnInit{
  ventas:ventas[] = [];
  fecha:intervaloFecha = new intervaloFecha();
constructor(private router: Router, private usuarioService: UsuarioService, private inventarioService: InventarioService, private reportesService: ReportesService) { }

ngOnInit() {
  this.reportesService.verVentas(this.fecha).subscribe( 
    (res:any) => {
      this.ventas = res;
    },
    err => console.error(err)
  );
}
}
