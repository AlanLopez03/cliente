import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

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
}
