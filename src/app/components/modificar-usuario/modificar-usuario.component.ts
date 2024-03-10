import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario/usuario.service';
import { Router } from '@angular/router';
import { getUsuario } from '../../models/getUsuario';
import { Rol } from '../../models/rolModel';

import Swal from 'sweetalert2'
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
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'User updated successfully',
        showConfirmButton: false,
        timer: 1500
      })
    }, err => console.log(err));
  }

  cancelar() {
    $('#modalModificarusuario').modal('close');
  }
  modificarRol(rol: any,usuario: any){
    usuario.idRol = rol.idRol;
    for (const rol1 of this.roles) {
      if(rol1.idRol == rol.idRol){
        this.rol = rol1;
      }
    }
  }
  eliminarUsuario(idUsuario: any){

    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#4caf50',
      cancelButtonColor: '#f44336',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        this.usuarioService.delete(idUsuario).subscribe((resUsuario: any) => 
        {

          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'User deleted successfully',
            showConfirmButton: false,
            timer: 1500
          })
          this.usuarioService.list().subscribe((resUsuarios: any) =>
          {
            this.usuarios = resUsuarios;
            console.log(this.usuarios);
          }, err => console.log(err));
          
        }, err => console.log(err));
      }
    });



  }
  return(){
    $('modal2').modal('close');
  }
  getRol(idRol: any){
    this.usuarioService.getRol(idRol).subscribe((resRol: any) => {
      this.return();
    }, err => console.log(err));
  }
  
}

