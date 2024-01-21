export class Producto{
    idProducto: number;
    nombre: string;
    descripcion: string;
    stock: number;
    precio: number;
    descuento: number;
    inicio_descuento: Date;
    fin_descuento: Date;
    idMaterial: number;
    idCategoria: number;
    idMarca: number;
    constructor(){
        this.idProducto = 1;
        this.nombre = '';
        this.descripcion = '';
        this.stock = 1;
        this.precio = 1;
        this.descuento = 1;
        this.inicio_descuento = new Date();
        this.fin_descuento = new Date();
        this.idMaterial = 1;
        this.idCategoria = 1;
        this.idMarca = 1;
    }
}