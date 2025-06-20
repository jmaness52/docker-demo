import { db } from '../database.js';
import Boom from '@hapi/boom';

export const updateListingRoute = {
    method: 'POST',
    path: '/api/listings/{id}',
    handler: async (req, h) => {
        const id = req.params.id;
        const { name, description, price } = req.payload;

        if(!name || !description || !price) throw Boom.badRequest('Invalid Request');

        const userId = '12345';
        await db.query(`
            UPDATE listings
            SET name = ?, description = ?, price=?
            WHERE id=? and user_id=?
        `, [name, description, price, id, userId]);
        
        const { results } = await db.query(
            'SELECT * FROM listings WHERE id=? AND user_id=?',
            [id, userId]
        );

        return results[0];
    }
}