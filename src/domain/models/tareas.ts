import { Tarea } from './tarea'
import colors from 'colors';

export class Tareas{

    private _listado: any = {};

    constructor(){
        this._listado = {};
    }

    get listadoArr() {
        const listado: any[] = [];
        Object.keys(this._listado).forEach( key => {
            listado.push ( this._listado[key] );
        } );
        return listado;
    }

    crearTarea ( desc:string = '' ): void{
        const tarea = new Tarea(desc);

        this._listado[tarea.id] = tarea
    }

    cargarTareasFromArrya( tareas = [] ):void{
        if(tareas.length > 0){
            tareas.forEach( (tarea:Tarea) => {
                this._listado[tarea.id] = tarea;
            });
        }   
    }
    
    listadoCompleta():void {
        console.log('');
        for(let i:number = 0; i<this.listadoArr.length; i++){
            const estado:string = (this.listadoArr[i]['completadoEn']) 
                            ? '=> Completado'.green
                            : '=> Pendiente'.red;
            const idx:string = (this.listadoArr[i]['completadoEn']) 
                            ? `${i+1}`.green
                            : `${i+1}`.red;
            
            console.log(`${idx}. ${this.listadoArr[i]['desc']} ${estado}`);
        }
        
    }

    listadoPendientesCompletadas( completadas:boolean = true ):void{
        console.log();
        let contador:number = 0;
        this.listadoArr.forEach((valor:Tarea, i:number)=>{
            const {desc, completadoEn} = valor;
            const condicion = (completadoEn)
                                ? `=> ${completadoEn}`.green
                                : '=> Pendiente'.red
            
            if(completadas){
                if(completadoEn){
                    contador += 1;
                    console.log(`${(contador + '.').green} ${desc} ${condicion}`);
                }
            }else{
                if(!completadoEn){
                    contador += 1;
                    console.log(`${(contador + '.').red} ${desc} ${condicion}`);
                }
            }
        });
    }

    borrarTarea( id:string = ''){
        if(this._listado[id]){
            delete this._listado[id];
        }
    }

    toggleCompletadas ( ids:string[] = []){
        ids.forEach(id => {
            const tarea:Tarea = this._listado[id];
            if( !tarea.completadoEn ){
                tarea.completadoEn = new Date().toISOString();

            }
        });

        this.listadoArr.forEach( (tarea:Tarea) => {
            if(!ids.includes(tarea.id)){
                const tareas = this._listado['id'];
                tarea.completadoEn = null;
            }
        });

    }
}