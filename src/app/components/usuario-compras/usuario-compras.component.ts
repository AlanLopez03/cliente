import { Component,OnInit } from '@angular/core';
import { ReportesService } from '../../services/reportes/reportes.service';
import { Router } from '@angular/router';
import { ventas } from '../../models/ventas';
import { Estados } from '../../models/estados';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-usuario-compras',
  templateUrl: './usuario-compras.component.html',
  styleUrl: './usuario-compras.component.css'
})
export class UsuarioComprasComponent implements OnInit{
  compras:ventas[] = [];
  constructor(private router: Router, private reportesService: ReportesService) { }
  ngOnInit(): void {
    var id = localStorage.getItem('idUsuario');
    console.log(id);
    this.reportesService.verComprasUsuario(id).subscribe((res:any) => 
    {
      if (res.length > 0) 
      {
        this.compras = res;//Ya tenemos todas las compras realizadas por el usuario
        
      }
      else
      Swal.fire({
        icon: 'error',
        title: '?...',
        text: 'No se han encontrado compras',
      });
    });
  }
}
