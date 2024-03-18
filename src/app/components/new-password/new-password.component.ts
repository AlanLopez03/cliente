import { Component,OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario/usuario.service';
import { Router } from '@angular/router';
import { UsuarioPassword } from '../../models/Usuario';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.component.html',
  styleUrl: './new-password.component.css'
})
export class NewPasswordComponent {

  usuario: UsuarioPassword = new UsuarioPassword();
  constructor(private usuarioService: UsuarioService, private router: Router) { }

  enviarPassword() {
  
      if (this.usuario.password == this.usuario.password1)
        alert('Contraseña restablecida');
      else
        alert('Contraseña incorrecta');
  }
}
