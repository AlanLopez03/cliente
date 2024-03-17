import { Component } from '@angular/core';
import { UsuarioService } from '../../services/usuario/usuario.service';
import { Rol } from '../../models/rolModel';
import { Domicilio } from '../../models/domicilio';
import { getUsuario } from '../../models/getUsuario';
import Swal from 'sweetalert2';

declare var $: any;

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css'
})
export class PerfilComponent {
  usuario: getUsuario = new getUsuario();
  rol: Rol = new Rol();
  direcciones: Domicilio[] = [];
  direccion : Domicilio = new Domicilio();
  idUsuario = 0;
  flagD = 0;

  constructor(private usuarioService:UsuarioService){
    this.usuarioService.listone(localStorage.getItem('idUsuario')).subscribe((resusuario: any) => {
      this.usuario = resusuario;
      this.idUsuario = resusuario.idUsuario;
      this.usuarioService.getRol(this.usuario.idRol).subscribe((resRol: any) =>{
        this.rol = resRol;
        this.usuarioService.getDomicilio(localStorage.getItem('idUsuario')).subscribe((resDir: any) => {
          this.direcciones = resDir;
          this.flagD = 0;
          console.log(this.direcciones);
        },err => this.flagD= 1)
      },err => console.log(err))
    }, err => console.log(err));
  }

  abrirND() {
    $('#modalN').modal().modal('open');
  }

  abrirActP() {
    this.usuarioService.listone(this.idUsuario).subscribe((resusuario: any) => {
      this.usuario = resusuario;
      $('#modalActP').modal();
      $('#modalActP').modal().modal('open');
    },
      err => console.error(err)
    );
  }

  cerrarND() {
    $('#modalN').modal().modal('close');
  }
  cerrarActP() {
    $('#modalActP').modal().modal('close');
  }

  abrirActD(id: any) {
    this.usuarioService.getDireccion(id).subscribe((resdir: any) => {

      this.direccion = resdir;
      $('#modalAct').modal();
      $('#modalAct').modal().modal('open');
    },
      err => console.error(err)
    );
  }

  cerrarActD() {
    $('#modalAct').modal().modal('close');
  }

  agregarDireccion() {
    this.direccion.idCliente = this.idUsuario;
    this.usuarioService.crearDomicilio(this.direccion).subscribe((resD: any) =>{
      this.cerrarND();
      this.usuarioService.getDomicilio(localStorage.getItem('idUsuario')).subscribe((resDir: any) =>{
        this.direcciones = resDir
        Swal.fire({
          title: "Exito!",
          text: "Direccion agregada!.",
          icon: "success"
        });
      })
    })
  }

  actualizarDireccion() {
    this.direccion.idCliente = this.idUsuario;
    this.usuarioService.actualizarDomicilio(this.direccion).subscribe((resD: any) =>{
      this.cerrarActD();
      this.usuarioService.getDomicilio(localStorage.getItem('idUsuario')).subscribe((resDir: any) =>{
        this.direcciones = resDir
        Swal.fire({
          title: "Exito!",
          text: "Direccion actualizada!.",
          icon: "success"
        });
      })
    })
  }

  eliminarDir(id: any){
    Swal.fire({
      title: "¿Estas seguro de eliminar esta direccion?",
      text: "No será posible revertir este cambio!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Eliminar direccion!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.usuarioService.eliminaDireccion(id).subscribe((resproducto: any) => {
          console.log("resproducto: ", resproducto);
          this.usuarioService.getDomicilio(localStorage.getItem('idUsuario')).subscribe((resdir: any) => {
            this.direcciones = resdir;
            //console.log(resproducto);
          },
            err => console.error(err)
          );
        },
          err => console.error(err)
        );
        Swal.fire({
          title: "Eliminado!",
          text: "Direccion eliminada!.",
          icon: "success"
        });
      }
    });
  }

  actualizar(){
    Swal.fire({
      title: "¿Estas seguro de editar el perfil?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Actualizar!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.cerrarActP()
        this.usuarioService.update(this.usuario).subscribe((resproducto: any) => {
          this.usuarioService.listone(localStorage.getItem('idUsuario')).subscribe((resdir: any) => {
            this.usuario = resdir
            //console.log(resproducto);
          },
            err => console.error(err)
          );
        },
          err => console.error(err)
        );
        Swal.fire({
          title: "Actualizado!",
          text: "Usuario actualizado!.",
          icon: "success"
        });
      }
    });
  }

  ngOnInit(): void {
    $(document).ready(function () {
      $('.collapsible').collapsible();
    });
  }

}
