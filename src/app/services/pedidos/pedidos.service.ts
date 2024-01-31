import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class PedidosService {

  constructor(private http: HttpClient ) { }
  list(){
    return this.http.get(`${environment.API_URI}/pedidos/`);
  }
  listone(id : any) {
    return this.http.get(`${environment.API_URI}/pedidos/${id}`);
  }
  crearPedido(pedido: any) {
    return this.http.post(`${environment.API_URI}/pedidos/crearpedido/`, pedido);
  } 
  eliminarPedido(idPedido: any){
    return this.http.delete(`${environment.API_URI}/pedidos/eliminar/${idPedido}`);
  }
}
