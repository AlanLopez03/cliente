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
  verVentas(fecha:any){
    return this.http.get(`${environment.API_URI}/compras/verVentas`,fecha);
  }

}
