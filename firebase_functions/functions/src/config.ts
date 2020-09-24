import { ConnectionOptions, Connection, createConnection, getConnection } from "typeorm";
// tslint:disable-next-line:no-import-side-effect
import 'reflect-metadata';

export const prod = process.env.NODE_ENV === 'production';


export const config: ConnectionOptions = {
    name: 'fun',
    
    synchronize: true,
    logging: false,
    entities: [
       'lib/entity/**/*.js'
    ],

    // Production Mode
    ...(prod && {
        database: 'flickbait',
        logging: false,
        // synchronize: false,
        extra: {
            socketPath: // change this value
        },
    })
 }

//  createConnection(config).then()

export const connect = async () => {

    let connection: Connection;

    try {
        connection = getConnection(config.name)
        console.log(connection)
    } catch(err) {
        connection = await createConnection(config);
    }

    return connection;


}