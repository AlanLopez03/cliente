import { Component,OnInit } from '@angular/core';
import { InventarioService } from '../../services/inventario/inventario.service';
import { Router } from '@angular/router';
import { Producto } from '../../models/producto';
import { CategoriaService } from '../../services/categoria/categoria.service';
import { Categoria } from '../../models/categoria';
import { Material } from '../../models/material';
import { Marca } from '../../models/marca';
import { MaterialService } from '../../services/material/material.service';
import { MarcaService } from '../../services/marca/marca.service';

declare var $:any;

@Component({
  selector: 'app-inventario',
  templateUrl: './inventario.component.html',
  styleUrls: ['./inventario.component.css']
})
export class InventarioComponent  implements OnInit{
  categoria:Categoria = new Categoria();
  categorias:Categoria[]= [];
  material:Material = new Material();
  materiales:Material[]= [];
  marca:Marca = new Marca();
  marcas:Marca[]= [];
  producto = new Producto();
  productos:Producto[]= []; 
  fecha = String;
  constructor(private inventarioService:InventarioService ,private categoriaService:CategoriaService,private materialService:MaterialService,private marcaService:MarcaService,private router:Router ) { }
  ngOnInit(): void {
    $(document).ready(function(){
      $('.dropdown-trigger').dropdown();
      $('.modal').modal();  
      $('.datepicker').datepicker({
        format: 'yyyy-mm-dd'
      });      
    });
    this.inventarioService.list().subscribe((resProductos:any) => {
      this.productos = resProductos;
      //console.log(this.productos);
    }, err => console.log(err));

    this.categoriaService.list().subscribe((resCategorias:any) => {
      this.categorias = resCategorias;
      //console.log(this.categorias);
    }, err => console.log(err));

    this.materialService.list().subscribe((resMateriales:any) => {
      this.materiales = resMateriales;
      //console.log(this.materiales);
    }, err => console.log(err));

    this.marcaService.list().subscribe((resMarcas:any) => {
      this.marcas = resMarcas;
      //console.log(this.marcas);
    }, err => console.log(err));

  }

  listone()
  {
    this.inventarioService.listone(this.producto).subscribe(res => {
      //console.log(res);
    },err => console.log(err));
  }
  modificarProducto(idProducto:any)
  {
    this.inventarioService.listone(idProducto).subscribe((resProducto:any) => {
      this.producto = resProducto;
      this.categoriaService.listone(this.producto.idCategoria).subscribe((resCategoria:any) => {
        this.categoria = resCategoria;
      }, err => console.log(err));
      this.materialService.listone(this.producto.idMaterial).subscribe((resMaterial:any) => {
        this.material = resMaterial;
      }, err => console.log(err));
      this.marcaService.listone(this.producto.idMarca).subscribe((resMarca:any) => {
        this.marca = resMarca;
      }, err => console.log(err));
      $('#modal1').modal('open');
    }, err => console.log(err));
  }
  modificarCategoria(categoria:any,producto:any){
    producto.idCategoria = categoria.idCategoria;
    for (const i in this.categorias) {
      if (this.categorias[i].idCategoria == categoria.idCategoria) {
        this.categoria = this.categorias[i];
      }
    }

  }
  modificarMaterial(material:any,producto:any){
    producto.idMaterial = material.idMaterial;
    for (const i in this.materiales) {
      if (this.materiales[i].idMaterial == material.idMaterial) {
        this.material = this.materiales[i];
      }
    }
  }
  modificarMarca(marca:any,producto:any){
    producto.idMarca = marca.id;
    for (const i in this.marcas) {
      if (this.marcas[i].idMarca == marca.id) {
        this.marca = this.marcas[i];
      }
    }
  }


  guardarProducto()
  {
    this.producto.inicio_descuento=$("#inicio_descuento").val();
    this.producto.fin_descuento=$("#fin_descuento").val();
    this.inventarioService.actualizar(this.producto).subscribe(
      res => {console.log(res);
      $('#modal1').modal('close');
      },err => console.log(err)
      );
  }
  eliminarProducto(idProducto:any)
  {
    console.log(idProducto);
    this.inventarioService.eliminar(idProducto).subscribe(
      res => 
      {console.log("proiducto eliminado");
      $('#modal2').modal('close');
      },err => console.log(err)
      );

  }
  return(){
    $('#modal1').modal('close');

  }
 
}
