import { db } from '../database.js'
import Boom from '@hapi/boom';

export const getListingRoute = {
    method: 'GET',
    path: '/api/listings/{id}',
    handler: async (req, h) => {
        const id = req.params.id;
        const { results } = await db.query('SELECT * FROM listings WHERE id=?', [id]);
        const foundListing = results[0];
        if (!foundListing) throw Boom.notFound(`Listing does not exist with id ${id}`);
        return foundListing;
    }
};