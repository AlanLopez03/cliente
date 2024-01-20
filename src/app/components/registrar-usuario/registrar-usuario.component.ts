import { Component } from '@angular/core';
import { UsuarioService } from '../../services/usuario/usuario.service';
import { Router } from '@angular/router';
import { Usuario } from '../../models/Usuario';
@Component({
  selector: 'app-registrar-usuario',
  templateUrl: './registrar-usuario.component.html',
  styleUrl: './registrar-usuario.component.css'
})
export class RegistrarUsuarioComponent {
  usuario: Usuario = new Usuario();
  constructor(private usuarioService: UsuarioService, private router: Router) { }

  registrarUsuario() {
  
    this.usuarioService.crearUsuario(this.usuario).subscribe(
      res => {
        console.log(res);
        //this.router.navigate(['/login']);
        console.log('Usuario creado');
        
      },
      err => console.log(err)
    )
  }
}
