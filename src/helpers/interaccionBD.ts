import fs from 'fs';

const archivo ='src/domain/database/db.json';

export const guardarInfo = (data:any) => {
    fs.writeFileSync(archivo, JSON.stringify(data));
}

export const leerDB = ():any => {
    if(!fs.existsSync(archivo)){
        null;
    }
    const info = fs.readFileSync(archivo, {encoding: 'utf-8'});
    return JSON.parse(info);
}