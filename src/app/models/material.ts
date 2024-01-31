export class Material {
    idMaterial: number;
    nombre: string;
    constructor(){
        this.idMaterial = 1;
        this.nombre = '';
    }
    set(idMaterial: number) {
        this.idMaterial = idMaterial;
    }
}