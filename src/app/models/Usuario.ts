export class Usuario {
    nombre: string;
    //apellido: string;
    correo: string;
    username: string;
    password: string;
    idRol: number;
    constructor() {

        this.nombre = '';//Unir nombre y apellido
        //this.apellido = '';
        this.correo = '';
        this.username = '';
        this.password = '';
        this.idRol = 2;
    }
}