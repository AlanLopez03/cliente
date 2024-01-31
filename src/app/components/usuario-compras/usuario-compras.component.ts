import { Component,OnInit } from '@angular/core';
import { ReportesService } from '../../services/reportes/reportes.service';
import { Router } from '@angular/router';
import { ventas } from '../../models/ventas';
import { Estados } from '../../models/estados';
@Component({
  selector: 'app-usuario-compras',
  templateUrl: './usuario-compras.component.html',
  styleUrl: './usuario-compras.component.css'
})
export class UsuarioComprasComponent implements OnInit{
  constructor(private router: Router, private reportesService: ReportesService) { }
  ngOnInit(): void {
    this.reportesService.verComprasUsuario(localStorage.getItem('id')).subscribe((res:any) => {
      
    });
  }
}
