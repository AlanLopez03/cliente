import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from '../../services/usuario/usuario.service';
import { InventarioService } from '../../services/inventario/inventario.service';
import { ReportesService } from '../../services/reportes/reportes.service';
import { ventas } from '../../models/ventas';
import { Estados } from '../../models/estados';
import { intervaloFecha } from '../../models/ventas';
import { PedidosService } from '../../services/pedidos/pedidos.service';
import { Pedidos } from '../../models/pedidos';
import { Producto } from '../../models/producto';
import { Usuario } from '../../models/Usuario';

import Swal from 'sweetalert2';
import { error } from 'jquery';
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
  productos:Producto[] = [];
  producto:Producto = new Producto();
  cliente:Usuario=new Usuario();
  clientes:Usuario[]=[];
  pedidos:Pedidos[]=[];


constructor(private router: Router,private reportesService:ReportesService, private usuarioService: UsuarioService,private pedidosService:PedidosService,private inventarioService:InventarioService) { }

ngOnInit(): void {//Ya jala
  $(document).ready(function(){
    $('.datepicker').datepicker({
      format: 'yyyy-mm-dd'}
    );
    $('.modal').modal();
  });

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

}
buscar(){
  //funcion para buscar con un rango de fechas
  var inicio = $("#inicio").val();
  var fin = $("#fin").val();
  if (inicio != '' && fin != '') 
  {
  {this.fechas.setDatos(inicio,fin);
  this.reportesService.verVentasPeriodo(this.fechas).subscribe((res:any) => {
    if (res.length>0)
      this.ventas = res;
    else
      Swal.fire({
        icon: 'error',
        title: 'Oops... :(',
        text: 'We could not find any sales in the selected range of dates',
      })
    
  },
    err => console.log(err)
  );}
}
else
{
  Swal.fire({
    icon: 'error',
    title: 'Oops... :(',
    text: 'You must select a range of dates to search',
  })
}
}
verDetalles(id:number,idCliente:number)//Recibe el id de la compra y lo busca en los pedidos
{
  //Limpiar los arreglos de datos
  this.productos=[];
  this.cliente=new Usuario();
  this.pedidos=[];
  this.pedidosService.verPedidos(id).subscribe((res:any) => 
  {
    this.pedidos= res;
    for (const pedido of this.pedidos)
    {  
      var id=pedido.idProducto;//Obtiene el id del producto
      this.inventarioService.listone(id).subscribe((res:any) => 
    {
      this.productos.push(res);
    },err => console.log(err));
    }
    this.usuarioService.listone(idCliente).subscribe((res:any) =>{
      this.cliente=res;//Obtiene los datos del cliente

    },
    error => console.log(error)
    )
    $("#modal1").modal('open');
  }
  )
  
}


}
