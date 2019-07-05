export class UsuarioModel {
    id: string;
    email: string;
    password: string;
    nombre: string;
    apPaterno: string;
    apMaterno: string;
    nombreCompleto: string;
    matricula: string;
    curp: string;
    telefono: string;
    abreviatura: string;
    tiempoCompleto: boolean;
    tipo: number;

    constructor() {
        this.tiempoCompleto = true;
        this.tipo = 5;
    }
}
