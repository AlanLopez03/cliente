import { Component,OnInit } from '@angular/core';
import { InventarioService } from '../../services/inventario/inventario.service';
import { Producto } from '../../models/producto';
import { Router } from '@angular/router';
import { addProducto} from '../../models/carrito';
import { CarritoService } from '../../services/carrito/carrito.service';
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
constructor(private inventarioService: InventarioService,private carritoService:CarritoService,private router:Router) { }
  ngOnInit(): void {
    this.inventarioService.list().subscribe(
      (res:any) => {
        this.productos = res;
      },
      err => console.log(err)
    );
  }
  agregarProducto(id:any){//Recibe el id del producto
    var a=localStorage.getItem('idUsuario')??'1';
    this.inserta.setAtributos(parseInt(a),id,1);
    console.log(this.inserta);
    this.carritoService.insertar(this.inserta).subscribe(
      (res:any) => {
        console.log(res);
        this.router.navigateByUrl('home/carrito');
      },
      err => console.log(err)
    );
  }
  hola(){
    console.log("hola");//Ya detecta el click
  }
}
