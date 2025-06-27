import { getAuth } from 'firebase-admin/auth';
import { db } from '../database.js';
import Boom from '@hapi/boom';

export const updateListingRoute = {
    method: 'POST',
    path: '/api/listings/{id}',
    handler: async (req, h) => {
        const id = req.params.id;
        const { name, description, price } = req.payload;

        if (!name || !description || !price) throw Boom.badRequest('Invalid Request');

        const token = req.headers.authtoken;
        if (!token) throw Boom.badRequest('Invalid Request');
        const decodedToken = await getAuth().verifyIdToken(token);
        const user_id = decodedToken.uid
        if (!user_id) throw Boom.badRequest('Invalid Request');
        
        await db.query(`
            UPDATE listings
            SET name = ?, description = ?, price=?
            WHERE id=? and user_id=?
        `, [name, description, price, id, user_id]);

        const { results } = await db.query(
            'SELECT * FROM listings WHERE id=? AND user_id=?',
            [id, user_id]
        );
        return results[0];
    }
}