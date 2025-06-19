import { db } from '../database.js';
import Boom from '@hapi/boom';

export const getUserListingsRoute = {
    method: 'GET',
    path: '/api/users/{userId}/listings',
    handler: async (req, h) => {
        const userId = req.params.userId;

        const { results } = await db.query(
            'SELECT * FROM listings WHERE user_id=?',
            [userId]
        );

        if (!results) throw Boom.notFound('No listings for user');
        return results;
    }
}