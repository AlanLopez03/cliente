import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from '../../services/usuario/usuario.service';
import { InventarioService } from '../../services/inventario/inventario.service';
import { ReportesService } from '../../services/reportes/reportes.service';
import { ventas } from '../../models/ventas';
import { Estados } from '../../models/estados';
import { intervaloFecha } from '../../models/ventas';
import Swal from 'sweetalert2';
declare var $: any;
@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrl: './reportes.component.css'
})
export class ReportesComponent implements OnInit
{
  estados:Estados[] = [];
  ventas:ventas[] = [];
  fechas:intervaloFecha = new intervaloFecha();
  fecha:intervaloFecha = new intervaloFecha();
constructor(private router: Router, private usuarioService: UsuarioService, private inventarioService: InventarioService, private reportesService: ReportesService) { }

ngOnInit(): void {//Ya jala
  $(document).ready(function(){
    $('.datepicker').datepicker({
      format: 'yyyy-mm-dd'}
    );
  });
  console.log("Hola");
  this.reportesService.list().subscribe((res:any) => {
    this.ventas = res;
    for (const venta1 of this.ventas)
    {
      this.reportesService.getEstado(venta1.idEdo).subscribe((res:any) => 
      {
        this.estados.push(res);
      },
        err => console.log(err)
      );
    }
  });
  console.log(this.ventas);

}
buscar(){

  var inicio = $("#inicio").val();
  var fin = $("#fin").val();
  if (inicio != '' && fin != '') 
  {
  {this.fechas.setDatos(inicio,fin);
  this.reportesService.verVentasPeriodo(this.fechas).subscribe((res:any) => {
    this.ventas = res;
    
  },
    err => console.log(err)
  );}
}
else
{
  Swal.fire({
    icon: 'error',
    title: 'Oops... :(',
    text: 'Debes establecer un rango de fechas',
  })
}}
}
