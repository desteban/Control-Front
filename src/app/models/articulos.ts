export class Articulos {
    constructor(
        public id: number,
        public codigo_empleado: number,
        public nombre: string,
        public descripcion: string,
        public foto: string,
        public precio: number,
        public cantidad: number,
        public cantidad_disponible: number
    ) {
        
    }

    public static articuloDefault(){
        return new Articulos(0,null,'','','',null,null,null)
    }
}