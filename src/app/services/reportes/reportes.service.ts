import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
<<<<<<< HEAD
export class ReportesService {//usados para obtener las ventas del sistema

  constructor(private http: HttpClient) { }
  list(datos: any){
    return this.http.get(`${environment.API_URI}/compras/verVentas`,datos);
  }
  listone(id : any) {
    return this.http.get(`${environment.API_URI}/compras/${id}`);
  }
  verMasVendidos(fechas: any){
    return this.http.get(`${environment.API_URI}/compras/verMasVendidos`,fechas);
  }
  verMenosVendidos(fechas: any){
    return this.http.get(`${environment.API_URI}/compras/verMenosVendidos`,fechas);
=======
export class ReportesService {

  constructor(private http:HttpClient) { }
  verMasVendidos(fecha:any){
    return this.http.get(`${environment.API_URI}/compras/verMasVendidos`,fecha);
  }
  verMenosVendidos(fecha:any){
    return this.http.get(`${environment.API_URI}/compras/verMenosVendidos`,fecha);
  }
  verVentas(fecha:any){
    return this.http.get(`${environment.API_URI}/compras/verVentas`,fecha);
>>>>>>> buena
  }

}
