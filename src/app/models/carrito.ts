export class Carrito{
    idProducto:number;
    nombre:string;
    cantidad:number;
    precio:number;
    stock:number;
    descuento:number;
    subtotal:number;

    constructor(){
        this.idProducto=1;
        this.nombre="";
        this.cantidad=0;
        this.precio=0;
        this.stock=0;
        this.descuento=0;
        this.subtotal=0;
    }

}
export class addProducto{
    idCliente:number;
    idProducto:number;
    cantidad:number;
    constructor(){
        this.idCliente=0;
        this.idProducto=0;
        this.cantidad=0;
    }
    setAtributos(idCliente:number,idProducto:number,cantidad:number){
        this.idCliente=idCliente;
        this.idProducto=idProducto;
        this.cantidad=cantidad;
    }
}