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
import Swal from 'sweetalert2'
import { data } from 'jquery';

declare var $:any;

@Component({
  selector: 'app-inventario',
  templateUrl: './inventario.component.html',
  styleUrls: ['./inventario.component.css']
})
export class InventarioComponent  implements OnInit{

  idProducto = Number;
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
  ngOnInit(): void 
  {
    $(document).ready(function(){
      $('.dropdown-trigger').dropdown();
      $('.modal').modal();  
      $('.datepicker').datepicker({
        format: 'yyyy-mm-dd'
      });      
    });
    this.inventarioService.list().subscribe((resProductos:any) => {
      this.productos = resProductos;
      for(let i=0;i<this.productos.length;i++){
        let aux=new Date(this.productos[i].inicio_descuento) ;
        let aux2=new Date(this.productos[i].fin_descuento );
        this.productos[i].inicio_descuento=aux.toLocaleDateString()
        this.productos[i].fin_descuento=aux2.toLocaleDateString()
      }
    

    }, err => console.log(err));

    this.categoriaService.list().subscribe((resCategorias:any) => {
      this.categorias = resCategorias;
    }, err => console.log(err));

    this.materialService.list().subscribe((resMateriales:any) => {
      this.materiales = resMateriales;
    }, err => console.log(err));

    this.marcaService.list().subscribe((resMarcas:any) => {
      this.marcas = resMarcas;
    }, err => console.log(err));

  }
  buscarProducto(id:any){
    this.inventarioService.listone(id).subscribe((resProducto:any) => {
      if (resProducto ) {
      this.producto = resProducto;
      this.openModificarProducto();
    }
      else{
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Product not found',
          showConfirmButton: true,
          timer: 1500
        })
      }
    }, err => console.log(err));
  }

  listone()
  {
    this.inventarioService.listone(this.producto).subscribe(res => {
    },
    err => console.log(err));
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
      this.openModificarProducto();

    }, err => console.log(err));
  }

  openModificarProducto(){
    $('#modal1').modal('open');
  }
  modificarCategoria(categoria:any,producto?:any){
      for (const i in this.categorias) 
      {
        if (this.categorias[i].idCategoria == categoria.idCategoria) 
        {
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
  modificarFechaInicio(date:any)
  {
    this.producto.inicio_descuento = date;
  }

  guardarProducto()
  {
    this.producto.inicio_descuento=$("#inicio_descuento").val();
    this.producto.fin_descuento=$("#fin_descuento").val();
    if (this.producto!=null && this.producto.nombre.length>0 && this.producto.precio!=null && this.producto.stock!=null && this.producto.idProducto!=null)
    {
      this.inventarioService.actualizar(this.producto).subscribe(
      res => {
      $('#modal1').modal('close');
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Product updated',
        showConfirmButton: true,
        timer: 1500
      }).then((result) =>{
      this.inventarioService.list().subscribe((resProductos:any) => {
        this.productos = resProductos;
        
      });
    });},err => console.log(err));
    }
    else
    
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Error trying to update product',
        showConfirmButton: true,
        timer: 1500
      });
    
  }
  limpiarFecha(){

    for (const i of this.productos) {
      let fecha = i.inicio_descuento;
      
    }
    
  }
  eliminarProducto(idProducto:any)
  {
    Swal.fire(
      {
      title: 'Are you sure?',
      text: "¡You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ff9800',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel'
      }).then((result) => 

      {
        if (result.isConfirmed)
        {
        this.inventarioService.eliminar(idProducto).subscribe(
        res =>
        {
          if (result.isConfirmed)
          {
            Swal.fire(
            {
              position: 'center',
              icon: 'success',
              title: 'Deleted',
              showConfirmButton: true,
              timer: 1500
            }
          ).then((result) => 
          {
            this.inventarioService.list().subscribe
            (
              (resProductos:any) => 
              {
                this.productos = resProductos;
              }, 
                err => console.log(err)
            );
          }
          );
        }
        },);
    }}
    );
  }
  return(){
    $('#modal1').modal('close');

  }

  openCrearProducto(){
    this.producto = new Producto();//limpiar el objeto
    $('#crearProducto').modal('open');
  }
  crearProducto(){
    this.producto.inicio_descuento=$("#inicio_descuento").val();
    this.producto.fin_descuento=$("#fin_descuento").val();
    this.inventarioService.crear(this.producto).subscribe(
      res => {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Product created',
          showConfirmButton: true,
          
        }).then((result) =>{
          this.inventarioService.list().subscribe((resProductos:any) => {
            this.productos = resProductos;
          }, err => console.log(err));
  
        }
        
        
        );

      $('#crearProducto').modal('close');

      },err => console.log(err)
      );


  }
 
}
