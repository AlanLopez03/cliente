import { Component,OnInit } from '@angular/core';
import { InventarioService } from '../../services/inventario/inventario.service';
import { Router } from '@angular/router';
import { Producto } from '../../models/producto';
import { CategoriaService } from '../../services/categoria/categoria.service';
import { Categoria } from '../../models/categoria';
declare var $:any;
@Component({
  selector: 'app-inventario',
  templateUrl: './inventario.component.html',
  styleUrls: ['./inventario.component.css']
})
export class InventarioComponent  implements OnInit{
  categoria:Categoria = new Categoria();
  categorias:Categoria[]= [];
  producto = new Producto();
  productos:Producto[]= []; 
  constructor(private inventarioService:InventarioService ,private categoriaService:CategoriaService,private router:Router ) { }
  ngOnInit(): void {
    $(document).ready(function(){
      $('.dropdown-trigger').dropdown();
      $('.modal').modal();
        
    });
    this.inventarioService.list().subscribe((resProductos:any) => {
      this.productos = resProductos;
      console.log(this.productos);
    }, err => console.log(err));

    this.categoriaService.list().subscribe((resCategorias:any) => {
      this.categorias = resCategorias;
      console.log(this.categorias);
    }, err => console.log(err));
  }
  listone()
  {
    this.inventarioService.listone(this.producto).subscribe(res => {console.log(res);},err => console.log(err));
  }
  modificarProducto(idProducto:any)
  {
    this.inventarioService.listone(idProducto).subscribe((resProducto:any) => {
      this.producto = resProducto;
      this.categoriaService.listone(this.producto.idCategoria).subscribe((resCategoria:any) => {
        this.categoria = resCategoria;
      }, err => console.log(err));
      $('#modalModificarProducto').modal('open');
    }, err => console.log(err));
  }


 
}
