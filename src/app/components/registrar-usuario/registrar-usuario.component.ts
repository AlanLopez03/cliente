import { Component } from '@angular/core';
import { UsuarioService } from '../../services/usuario/usuario.service';
import { Router } from '@angular/router';
import { Usuario } from '../../models/Usuario';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-registrar-usuario',
  templateUrl: './registrar-usuario.component.html',
  styleUrl: './registrar-usuario.component.css'
})
export class RegistrarUsuarioComponent {
  usuario: Usuario = new Usuario();
  constructor(private usuarioService: UsuarioService, private router: Router) { }

  registrarUsuario() {
  if (this.usuario.nombre != null &&  this.usuario.correo != null && this.usuario.password != null && this.usuario.username!=null) 
    this.usuarioService.crearUsuario(this.usuario).subscribe(
      res => {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Your user has been created successfully',
          showConfirmButton: false,
          timer: 1500
        })
        this.router.navigateByUrl('/home');

        
      },
      err => console.log(err)
    )
  else
    Swal.fire({
      position: 'center',
      icon: 'error',
      title: 'You must fill all the fields',
      showConfirmButton: true,
      timer: 1500
    })
  }
}
