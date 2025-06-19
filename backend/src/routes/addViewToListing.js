import { db } from '../database.js'
import Boom from '@hapi/boom';

export const addViewToListingRoute = {
    method: 'POST',
    path: '/api/listings/{id}/add-view',
    handler: async (req, h) => {
        const id = req.params.id;
        await db.query(
            'UPDATE listings SET views=views+1 WHERE id=?',
            [id]
        );

        const { results } = await db.query('SELECT * from listings WHERE id=?', [id]);
        const foundListing = results[0];
        if (!foundListing) throw Boom.notFound(`No listing found with id ${id}`);

        return foundListing;
    }
}