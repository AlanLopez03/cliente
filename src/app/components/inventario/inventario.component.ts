import { Component,OnInit } from '@angular/core';
import { InventarioService } from '../../services/inventario/inventario.service';
import { getId } from '../../models/getId';
import { Router } from '@angular/router';
declare var $:any;
@Component({
  selector: 'app-inventario',
  templateUrl: './inventario.component.html',
  styleUrls: ['./inventario.component.css']
})
export class InventarioComponent  implements OnInit{
  idProducto = new getId();
  constructor(private inventarioService:InventarioService ,private router:Router ) { }
  ngOnInit(): void {
    $(document).ready(function(){
      $('.dropdown-trigger').dropdown();
        
    });
  }
  listone()
  {
    this.inventarioService.listone(this.idProducto.id).subscribe(res => {console.log(res);},err => console.log(err));
  }

 
}
