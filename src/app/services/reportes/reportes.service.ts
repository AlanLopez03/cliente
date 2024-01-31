import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ReportesService {

  constructor(private http:HttpClient) { }
  verMasVendidos(fecha:any){
    return this.http.get(`${environment.API_URI}/compras/verMasVendidos`,fecha);
  }
  verMenosVendidos(fecha:any){
    return this.http.get(`${environment.API_URI}/compras/verMenosVendidos`,fecha);
  }
  verVentasPeriodo(fecha:any){
    return this.http.post(`${environment.API_URI}/compras/verVentas`,fecha);
  }
  list(){
    return this.http.get(`${environment.API_URI}/compras/`);
  }
  getEstado(id:any){
    return this.http.get(`${environment.API_URI}/estadosCompra/${id}`);
  }
  verComprasUsuario(id:any){
    return this.http.get(`${environment.API_URI}/compras/verCompras/${id}`);
  }

}
