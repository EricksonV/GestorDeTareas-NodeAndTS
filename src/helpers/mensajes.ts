import * as readline from 'readline';
import colors from 'colors';



export const mostrarMenu = () => {

    return new Promise((resolve=>{
        console.clear();

        console.log(colors.magenta('=========================='));
        console.log(colors.magenta('   Seleccione la Opcion'));
        console.log(colors.magenta('==========================\n'));

        console.log(`${colors.magenta('1.')} Crear Tarea`);
        console.log(`${colors.magenta('2.')} Lista de Tareas`);
        console.log(`${colors.magenta('3.')} Lista de Tareas completadas`);
        console.log(`${colors.magenta('4.')} Lista de Tareas pendientes`);
        console.log(`${colors.magenta('5.')} Completar tarea(s)`);
        console.log(`${colors.magenta('6.')} Borrar Tarea`);
        console.log(`${colors.magenta('0.')} Salir \n`)

        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });

        rl.question('Seleccione una opcion: ', (opt:any)=>{
            rl.close();
            resolve(opt);
        });


    }));  
}

export const pausa = () =>{
    return new Promise((resolve)=>{
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
    
        rl.question(`\nPresione ${'ENTER'} para continuar\n`, (opt:any)=>{
            rl.close();
            resolve(opt);
        });
    });
    
}