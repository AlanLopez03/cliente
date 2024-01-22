import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { get } from 'jquery';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http: HttpClient) { }
  login(correo: any, password: any) {
    return this.http.get(`${environment.API_URI}/usuarios/login/${correo}/${password}`);
  }

  listone(id : any) {
    return this.http.get(`${environment.API_URI}/usuarios/${id}`);
    }
  crearUsuario(usuario: any) {
    return this.http.post(`${environment.API_URI}/usuarios/crearusuario/`, usuario);
  }
  list(){
    return this.http.get(`${environment.API_URI}/usuarios/`);
  }
  update(usuario: any) {
    return this.http.put(`${environment.API_URI}/usuarios/actualizar/${usuario.idUsuario}`, usuario);
  }
  getRoles(){
    return this.http.get(`${environment.API_URI}/roles/`);
  }
  getRol(idRol: any){
    return this.http.get(`${environment.API_URI}/roles/${idRol}`);
  }
  getDirecciones(idUsuario: any){
    return this.http.get(`${environment.API_URI}/usuarios/domicilios/${idUsuario}`);
  }
  delete(idUsuario: any){
    return this.http.delete(`${environment.API_URI}/usuarios/eliminar/${idUsuario}`);
  }
  recomendaciones(idUsuario: any){
    return this.http.get(`${environment.API_URI}/usuarios/recomendaciones/${idUsuario}`);
  }
}
