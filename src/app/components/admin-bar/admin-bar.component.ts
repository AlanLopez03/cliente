import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from '../../models/Usuario';
import { UsuarioService } from '../../services/usuario/usuario.service';
@Component({
  selector: 'app-admin-bar',
  templateUrl: './admin-bar.component.html',
  styleUrl: './admin-bar.component.css'
})
export class AdminBarComponent implements OnInit{
  usuario = new Usuario();
  idUsuario = localStorage.getItem('idUsuario');

constructor(private usuarioService:UsuarioService ,private router:Router ) { }
  ngOnInit(): void 
  {
    this.usuarioService.listone(this.idUsuario).subscribe((resUsuarios:any) => {
      this.usuario = resUsuarios;
      console.log(this.usuario);
    }, err => console.log(err));
  }
  logOut(){//Funciona para cerrar sesion pero no se como hacer para que se cierre la sesion en el servidor
    console.log('salir');
    console.log(localStorage.getItem('idUsuario'));
    localStorage.removeItem('idUsuario');
    this.router.navigateByUrl('/');

  }
}
