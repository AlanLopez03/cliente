import { Component } from '@angular/core';
import { UsuarioService } from '../../services/usuario/usuario.service';
import { loginModel } from '../../models/loginModel';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent {
login = new loginModel();

constructor(private usuarioService: UsuarioService) { }
logueo(){
  this.usuarioService.login(this.login.correo, this.login.password).subscribe(
    res => {
      console.log(res);
    },
    err => console.log(err)
  );
}
listone(){
  this.usuarioService.listone(1).subscribe(
    res => {
      console.log(res);
    },
    err => console.log(err)
  );}




}
