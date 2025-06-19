import Hapi from '@hapi/hapi';
import routes from './routes/index.js';
import { db } from './database.js'
import { applicationDefault, initializeApp} from 'firebase-admin/app';

initializeApp({
    credential: applicationDefault(),
});

let server;

const start = async () => {
    server = Hapi.server({
        port: 8000,
        host: '0.0.0.0',
    });

    routes.forEach(route => server.route(route));

    db.connect();
    await server.start();
    console.log(`Hapi server created. Listening on port ${server.info.uri}`);
}

process.on('unhandledRejection', err => {
    console.log(err);
    process.exit(1);
}); 

process.on('SIGINT', async () => {
    console.log('stopping server');
    await server.stop({ timeout: 10000});
    db.end();
    console.log('server stopped');
    process.exit(0);
});

start();