export class Categoria {
    idCategoria: number;
    nombre: string;

    constructor() {
        this.idCategoria = 1;
        this.nombre = "";

    }
    set(idCategoria: number) {
        this.idCategoria = idCategoria;

    }
}