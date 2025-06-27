import { getAuth } from 'firebase-admin/auth';
import { db } from '../database.js';
import Boom from '@hapi/boom';

export const deleteListingRoute = {
    method: 'DELETE',
    path: '/api/listings/{id}',
    handler: async (req, h) => {
        const id = req.params.id;
        const token = req.headers.authtoken;

        const decryptedToken = await getAuth().verifyIdToken(token);
        if (! decryptedToken || !decryptedToken.uid) throw Boom.badRequest('Invalid request');
        const user_id = decryptedToken.uid;
        
        await db.query(
            'DELETE FROM listings WHERE id=? and user_id=?',
            [id, user_id]
        );

        return  { message: 'Listing deleted successfully!'};
    }
}