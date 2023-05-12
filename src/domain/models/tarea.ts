import { v4 as uuidv4 } from 'uuid';

export class Tarea {
    id:any = '';
    desc:any = '';
    completadoEn:null|string;

    constructor( desc:string ){
        this.id = uuidv4();
        this.desc = desc;
        this.completadoEn = null;
    }
}