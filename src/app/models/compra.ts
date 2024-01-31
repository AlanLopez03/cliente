export class Compra{

    fecha: string;
    idEdo: number;

    constructor(){
 
        this.fecha="";
        this.idEdo=0;
    }
    set(fecha:string,idEdo:number){
  
        this.fecha=fecha;
        this.idEdo=idEdo;
    }
}