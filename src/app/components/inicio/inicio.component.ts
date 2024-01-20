import { Component,OnInit } from '@angular/core';
declare var $:any;
@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent implements OnInit {
constructor(){}
ngOnInit(): void {
  $(document).ready(function(){
    $('.sidenav').sidenav();
    $(".dropdown-trigger").dropdown();
        
      
  });
}
prueba(){
  console.log("prueba");
}

}
