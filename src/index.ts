import { Tareas } from "./domain/models/tareas";
import { guardarInfo, leerDB } from './helpers/interaccionBD';
import { 
    MostrarListadoCheck,
    confirmar,
    inquirerMenu, 
    leerInput, 
    listadoTareasBorrar, 
    pausa
} from "./helpers/inquirer";

console.clear();

const main =async () => {

    let opt:any = '';
    const tareas = new Tareas();

    const tareaDb = leerDB();
    
    if(tareaDb){
        tareas.cargarTareasFromArrya( tareaDb );
    }
    
    

    do{
        opt = await inquirerMenu();

        switch (opt) {
            case '1':
                const desc = await leerInput('Descripcion:');
                tareas.crearTarea(desc);
                console.log(desc);
                break;
            case '2':
                tareas.listadoCompleta();
                break;
            case '3':
                tareas.listadoPendientesCompletadas(true);
                break;
            case '4':
                tareas.listadoPendientesCompletadas(false);
                break;
            case '5':
                const ids = await MostrarListadoCheck( tareas.listadoArr );
                tareas.toggleCompletadas(ids);
                break;
            case '6':
                const id = await listadoTareasBorrar( tareas.listadoArr );
                if (id !== '0' && await confirmar('¿Estás seguro de eliminar?')) {
                    tareas.borrarTarea(id);
                    console.log('\nTarea Eliminada Correctamente'.green);
                  }
                break;
            default:
                break;
        }

        guardarInfo( tareas.listadoArr );

        await pausa();

    }while( opt !== '0' );

}

main();