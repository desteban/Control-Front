export class Prestamo {
    constructor(
        public id: number,
        public codigo_empleado: number,
        public codigo_persona: number,
        public id_articulo: number,
        public cantidad: number,
        public fecha_limite: any,
        public fecha_entrega: any,
        public visible: boolean,
        public created_at: any
    ) {

    }
}