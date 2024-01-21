import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario/usuario.service';
import { Router } from '@angular/router';
import { getUsuario } from '../../models/getUsuario';
import { Rol } from '../../models/rolModel';
declare var $: any;

@Component({
  selector: 'app-modificar-usuario',
  templateUrl: './modificar-usuario.component.html',
  styleUrls: ['./modificar-usuario.component.css']
})
export class ModificarUsuarioComponent implements OnInit {
  constructor(private usuarioService: UsuarioService, private router: Router) { }

  usuarios: getUsuario[] = [];
  usuario: getUsuario = new getUsuario();
  rol: Rol = new Rol();
  roles: Rol[] = [];
  ngOnInit(): void {
    // Inicializa los modales en ngOnInit
    $(document).ready(function(){
      $('.dropdown-trigger').dropdown();
      $('.modal').modal();  
    });

    this.usuarioService.list().subscribe((resUsuarios: any) =>
     {
      this.usuarios = resUsuarios;
      console.log(this.usuarios);
    }, err => console.log(err));
    this.usuarioService.getRoles().subscribe((resRoles: any) => {
      this.roles = resRoles;
      console.log(this.roles);
    }, err => console.log(err));
  }
  modificarUsuario(idUsuario: any) {
    this.usuarioService.listone(idUsuario).subscribe((resUsuario: any) => {
      this.usuario = resUsuario;
      $('#modalModificarusuario').modal('open');
      this.usuarioService.getRol(this.usuario.idRol).subscribe((resRol: any) => {
        this.rol = resRol;
      }, err => console.log(err));

    }, err => console.log(err));
  }
  guardar() {
    this.usuarioService.update(this.usuario).subscribe((resUsuario: any) => 
    {
      $('#modalModificarusuario').modal('close');
      console.log("Usuario modificado correctamente")
    }, err => console.log(err));
  }

  cancelar() {
    $('#modalModificarusuario').modal('close');
  }
  modificarRol(idRol: any,usuario: any){
    usuario.idRol = idRol;
  }
  eliminar(idUsuario: any){
    this.usuarioService.delete(idUsuario).subscribe((resUsuario: any) => 
    {
      console.log("Usuario eliminado correctamente")
      
    }, err => console.log(err));
  }
}

