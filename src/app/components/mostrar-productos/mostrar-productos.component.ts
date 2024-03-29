import { Component,OnInit } from '@angular/core';
import { InventarioService } from '../../services/inventario/inventario.service';
import { Producto } from '../../models/producto';
import { Router } from '@angular/router';
import { addProducto} from '../../models/carrito';
import { CarritoService } from '../../services/carrito/carrito.service';
import Swal from 'sweetalert2';
import { ChangeDetectorRef } from '@angular/core';
declare var $:any;
@Component({
  selector: 'app-mostrar-productos',
  templateUrl: './mostrar-productos.component.html',
  styleUrl: './mostrar-productos.component.css'
})
export class MostrarProductosComponent implements OnInit{
inserta=new addProducto();
producto= new Producto();
productos: Producto []= [];
buscar:string='';
constructor(private inventarioService: InventarioService,private carritoService:CarritoService,private router:Router) { }
  ngOnInit(): void {
    $(document).ready(function(){
      $('.carousel').carousel({
}
      );
    });
    if(localStorage.getItem("Categoria")==null || localStorage.getItem("Categoria")=='0' ){
        this.inventarioService.list().subscribe(
          (res:any) => {
            this.productos = res;
          },
          err => console.log(err)
      );
    }else{
      this.inventarioService.buscarporCategoria(localStorage.getItem("Categoria")).subscribe((res:any)=>{
        this.productos= res
      },err => console.log(err)
      );
      localStorage.removeItem("Categoria")
    } 
    this.inventarioService.flagObservable$.subscribe((res:any) => {
      this.listarOfertas();
    })

  }
  listarOfertas(){
    this.inventarioService.obtenerOfertas().subscribe(
      (res:any) => {
        if (res.length>0)
          this.productos = res;
        else
        Swal.fire(
          'Error',
          'No hay ofertas disponibles',
          'error')
      
      },
      err => console.log(err)
    );
  }

  agregarProducto(id:any){//Recibe el id del producto
    var a=localStorage.getItem('idUsuario')??'1';
    var stock=0;
    this.inserta.setAtributos(id,parseInt(a),1);
    this.inventarioService.listone(id).subscribe(
      (res:any) => 
      {
        stock = res.stock;
        console.log(stock);
        if (stock>0)
        {  
          this.carritoService.insertar(this.inserta).subscribe((res:any) => 
          {
            Swal.fire(
              'Producto agregado',
              'El producto se ha agregado con éxito',
              'success')
          },
          err => console.log(err));
        }
        else
        {
          Swal.fire(
            'Error',
            'No hay stock suficiente',
            'error')
          }
      },
      err=>console.log(err)
      
    );

    
  }
  filtrarProductos(id:any){
    this.inventarioService.filtrarProductos(id).subscribe(
      (res:any) => {
        this.productos = res;
        console.log(this.productos);
      },
      err => console.log(err)
    );
  }

}
