export class Persona {
    constructor(
        public id: number,
        public nombre: string,
        public apellido: string,
        public cc: string,
        public foto: string,
        public activo: boolean,
        public password: string,
        public rol: string,
        public carrera: string,
        public semestre: number
    ) {

    }
    
    public static PersonaDefault(){
        return new Persona(0,'','','','',true,'','','',1)
    }
}