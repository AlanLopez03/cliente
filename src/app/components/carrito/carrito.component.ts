import { Component,OnInit } from '@angular/core';
import { CarritoService } from '../../services/carrito/carrito.service';
import { InventarioService } from '../../services/inventario/inventario.service';
import { Router } from '@angular/router';
import { Carrito,addProducto } from '../../models/carrito';
import { Producto } from '../../models/producto';
import { Compra } from '../../models/compra';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrl: './carrito.component.css'
})
export class CarritoComponent implements OnInit{
  producto=new Producto();
  carrito1:Carrito = new Carrito();
  carrito:Carrito[]=[];
constructor(private carritoService: CarritoService, private inventarioService: InventarioService, private router: Router) { }
  inserta=new addProducto();
  ngOnInit(): void {
    this.carritoService.listone(localStorage.getItem('idUsuario')).subscribe(
      (res:any) => {
        this.carrito = res;
        console.log("hola");
        console.log(this.carrito);
      },
      err => console.log(err)
    );
  }
  eliminarProducto(id:any){
   // console.log(id);
    Swal.fire({
      title: '¿Está seguro que desea eliminar el producto del carrito?',
      text: "Esta acción no se puede revertir",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      cancelButtonText:'Cancelar',
      confirmButtonText: 'Eliminar'
    }).then((result) => {
      
      if (result.isConfirmed)
    {
      this.carritoService.eliminarProducto(id).subscribe(
        (res:any) => {
          Swal.fire(
            'Producto eliminado',
            'El producto se ha eliminado con éxito',
            'success'
          ).then((result) => {
          this.ngOnInit();})
        },err => console.log(err));
      }
    })


  }
  insertarProducto(id:any,decremento?:any){//Se debe mandar un objeto de tipo addProducto
    var a=localStorage.getItem('idUsuario')??'1';
    var stock=0;
    this.inserta.setAtributos(id,parseInt(a),1);
    this.inventarioService.listone(id).subscribe(
      (res:any) => 
      {
        stock = res.stock;//Obtiene el stock del producto
        if (stock>0)
        {  
          this.carritoService.insertar(this.inserta).subscribe((res:any) => 
          {
            this.ngOnInit();
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
  limpiarCarrito(){
    var id=localStorage.getItem('idUsuario');
    Swal.fire({
      title: '¿Está seguro que desea limpiar el carrito?',
      text: "Esta acción no se puede revertir",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      cancelButtonText:'Cancelar',
      confirmButtonText: 'Limpiar'
    }).then((result) => {
    if (result.isConfirmed)
    {
      this.carritoService.limpiarCarrito(id).subscribe(
      (res:any) => {
        
        this.ngOnInit();
        Swal.fire(
          'Carrito limpiado',
          'El carrito se ha limpiado con éxito',
          'success'
        )
      },
      err => console.log(err)
    );
  }
})
  }
  pagar(){
    this.router.navigate(['/pagar']);
  }
  comprarCarrito(){
    var objeto=new Compra();
    objeto.set("2024-01-30",1);//Cambiar fecha
    this.carritoService.comprar(localStorage.getItem('idUsuario'),objeto).subscribe(
      (res:any) => {
        if (res==false)
        {
          Swal.fire(
            'Error',
            'No hay suficiente stock',
            'error'
          )
        }
        else{
        Swal.fire(
          'Compra realizada',
          'La compra se ha realizado con éxito',
          'success'
        )
        this.ngOnInit();
      }
        
      },
      err => console.log(err)
    );
  }
}
