import { Component,OnInit } from '@angular/core';
import { InventarioService } from '../../services/inventario/inventario.service';
import { Producto } from '../../models/producto';
import { Router } from '@angular/router';
declare var $:any;
@Component({
  selector: 'app-mostrar-productos',
  templateUrl: './mostrar-productos.component.html',
  styleUrl: './mostrar-productos.component.css'
})
export class MostrarProductosComponent implements OnInit{
producto= new Producto();
productos: Producto []= [];
constructor(private inventarioService: InventarioService,private router:Router) { }
  ngOnInit(): void {
    this.inventarioService.list().subscribe(
      (res:any) => {
        this.productos = res;
      },
      err => console.log(err)
    );
  }
}
