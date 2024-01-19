import { Component,OnInit } from '@angular/core';
declare var $:any;
@Component({
  selector: 'app-inventario',
  templateUrl: './inventario.component.html',
  styleUrls: ['./inventario.component.css']
})
export class InventarioComponent  implements OnInit{
  constructor() { }
  ngOnInit(): void{
    $ (document).ready(function(){
      $ ('.modal').modal();
  });}


 
}
