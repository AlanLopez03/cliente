export class ventas{
    idCompra: number;
    fechaCompra: Date;
    total: number;
    idEstadoCompra: number;
    idCliente: number;
    constructor(){
        this.idCompra = 0;
        this.fechaCompra = new Date();
        this.total = 0;
        this.idEstadoCompra = 0;
        this.idCliente = 0;
    }
}
export class intervaloFecha{
    fechaInicio: string;
    fechaFin: string;
    constructor(){
        this.fechaInicio = '';
        this.fechaFin = '';
    }
}
