import { v4 as uuid } from 'uuid';
import { db } from '../database.js';
import { getAuth } from 'firebase-admin/auth';

export const createNewListingRoute = {
    method: 'POST',
    path: '/api/listings',
    handler: async (req, h) => {
        const id = uuid();
        const token = req.headers.authtoken;
        const decodedToken = await getAuth().verifyIdToken(token);
        if (!decodedToken.uid) return;
        const userId = decodedToken.uid;

        const {name = '', description = '', price = 0} = req.payload;
        const views = 0;
        await db.query(`
            INSERT INTO listings (id, name, description, price, user_id, views)
            VALUES(?, ?, ?, ?, ?, ?)
        `,
            [id, name, description, price, userId, views]
        );
        
        return { id, name, description, price, user_id: userId, views };
    }
}