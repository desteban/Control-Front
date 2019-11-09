export class Recargo {
    constructor(
        public id: number,
        public id_prestamo: number,
        public damage: boolean,
        public fecha_pago: any,
        public total: number,
        public motivo: string,
        public pagado: boolean,
        public cantidad: number
    ) { }

    public static recargoDefault(): Recargo{
        return new Recargo(0,0,false,null,0,null,false,0)
    }
}