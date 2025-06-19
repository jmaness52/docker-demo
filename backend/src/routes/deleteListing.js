import { db } from '../database.js';

export const deleteListingRoute = {
    method: 'DELETE',
    path: '/api/listings/{id}',
    handler: async (req, h) => {
        const id = req.params.id;

        await db.query(
            'DELETE FROM listings WHERE id=?',
            [id]
        );

        return  { message: 'Listing deleted successfully!'};
    }
}