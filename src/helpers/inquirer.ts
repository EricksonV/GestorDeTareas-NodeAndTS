import inquirer from 'inquirer';
import colors from 'colors';
import { Tarea } from '../domain/models/tarea';

const preguntas: {[keys:string]:any} = [
    {
        type: 'list',
        name: 'opcion',
        message: 'Que desea hacer?',
        choices: [
            {
                value: '1',
                name: `${colors.green('1.')} Crear Tarea`
            },
            {
                value: '2',
                name: `${colors.green('2.')} Lista de Tareas`
            },
            {
                value: '3',
                name: `${colors.green('3.')} Lista de Tareas Completadas`
            },
            {
                value: '4',
                name: `${colors.green('4.')} Lista de Tareas Pendientes`
            },
            {
                value: '5',
                name: `${colors.green('5.')} Completar Tarea`
            },
            {
                value: '6',
                name: `${colors.green('6.')} Borrar Tarea`
            },
            {
                value: '0',
                name: `${colors.green('0.')} Salir`
            }
        ]
    }
]

export const inquirerMenu = async() =>{
    console.clear();
    console.log(colors.green('=========================='));
    console.log(colors.white('   Seleccione la Opcion'));
    console.log(colors.green('==========================\n'));

    const {opcion} = await inquirer.prompt(preguntas);
    return opcion;
}

export const pausa = async() => {
    console.log('\n');
    await inquirer.prompt([
        {
            type: 'input',
            name: 'opcionPausa',
            message: `\nPresione ${colors.green('ENTER')} para continuar`
        }
    ]);
    
}

export const leerInput = async( message:string ) => {
    
    const { desc } = await inquirer.prompt([
        {
            type: 'input',
            name: 'desc',
            message,
            validate ( value:string ){
                if(value.length === 0){
                    return 'Ingrese un valor';
                }
                return true;
            }
        }
    ]);
    return desc;
}

export const listadoTareasBorrar = async(tareas:Tarea[]= []) => {
    const choices = tareas.map( (tarea, i) => {
        const idx:string = (tarea.completadoEn) 
                            ? `${i+1}.`.green
                            : `${i+1}.`.red;
        return {
            value: tarea.id,
            name: `${idx} ${tarea.desc}`
        }
    });

    choices.unshift({
        value: '0',
        name: '0.'.blue +' Cancelar'
    });

    

    const {id} = await inquirer.prompt([
        {
            type: 'list',
            name: 'id',
            message: 'Borrar',
            choices,
            
        }
    ]);
    return id;
    
}

export const confirmar = async(message:string) => {
    const { ok } = await inquirer.prompt([
        {
            type: 'confirm',
            name: 'ok',
            message
        }
    ]);
    return ok;
}

export const MostrarListadoCheck = async(tareas:Tarea[]= []) => {
    const choices = tareas.map( (tarea, i) => {
        const idx:string = (tarea.completadoEn) 
                            ? `${i+1}.`.green
                            : `${i+1}.`.red;
        return {
            value: tarea.id,
            name: `${idx} ${tarea.desc}`,
            checked: (tarea.completadoEn) ? true : false
        }
    });

    const { ids } = await inquirer.prompt([
        {
            type: 'checkbox',
            name: 'ids',
            message: 'Selecciones',
            choices,
            
        }
    ]);
    return ids;
    
}
