import { Component } from '@angular/core';
import { UsuarioService } from '../../services/usuario/usuario.service';
import { loginModel } from '../../models/loginModel';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'})
export class LoginComponent {
login = new loginModel();
constructor(private usuarioService: UsuarioService,private router:Router) { }
logueo(){
  if (this.login.correo == '' || this.login.password == '') {
    alert('You must enter a username and password');
    return;
  }
  this.usuarioService.login(this.login.correo, this.login.password).subscribe(
    (res: any) => {
      if (res) 
      {
        this.usuarioService.listone(res.idUsuario).subscribe(res => 
        {console.log(res);},err => console.log(err));
        localStorage.setItem('idUsuario',res.idUsuario);
        console.log(res);
        if (res.idRol == 1){   
          this.router.navigateByUrl('/control');}
        else
          this.router.navigateByUrl('/home');
      } 
      else {
        alert('Invalid username or password');
      }
    }
  );
}
listone(){
  this.usuarioService.listone(1).subscribe(res => {console.log(res);},err => console.log(err));}
}
