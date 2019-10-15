import { persona } from './persona';

export class empleado extends persona {
    constructor(
        id: number,
        nombre: string,
        apellido: string,
        cc: string,
        foto: string,
        activo: boolean,
        password: string,
        public codigo: number,
        public rol: string
    ) {
        super(id, nombre, apellido, cc, foto, activo, password);
    }
}