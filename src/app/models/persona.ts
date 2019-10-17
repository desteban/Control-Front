export class Persona {
    constructor(
        public id: number,
        public nombre: string,
        public apellido: string,
        public cc: string,
        public foto: string,
        public activo: boolean,
        public password: string
    ) {

    }
    
    public static PersonaDefault(){
        return new Persona(0,'','','','',false,'')
    }
}