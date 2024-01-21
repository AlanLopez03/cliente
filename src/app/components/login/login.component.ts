import { Component } from '@angular/core';
import { UsuarioService } from '../../services/usuario/usuario.service';
import { loginModel } from '../../models/loginModel';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent {
login = new loginModel();

constructor(private usuarioService: UsuarioService,private router:Router) { }
logueo(){
  if (this.login.correo == '' || this.login.password == '') {
    alert('Debe ingresar todos los datos');
    return;
  }
  this.usuarioService.login(this.login.correo, this.login.password).subscribe(
    //res => {
    //  console.log(res);
    //},
    //err => console.log(err)
    (res: any) => {
      if (res) 
      {
        //localStorage.setItem('correo',this.login.correo);
        console.log(res);
        if (res.idRol == 1){
          console.log('Administrador');
          this.router.navigateByUrl('/control');}
        else
          this.router.navigateByUrl('/home');
      } 
      else {
        alert('Usuario o contraseña incorrectos');
      }
    }
  );
}
listone(){
  this.usuarioService.listone(1).subscribe(res => {console.log(res);},err => console.log(err));

}

}
