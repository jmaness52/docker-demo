import { getAllListingsRoute } from './getAllListings.js';
import { getListingRoute } from './getListing.js';
import { addViewToListingRoute } from './addViewToListing.js';
import { getUserListingsRoute } from './getUserListings.js';
import { createNewListingRoute } from './createNewListing.js';
import { updateListingRoute } from './updateListing.js';
import { deleteListingRoute } from './deleteListing.js';

export default [
    getAllListingsRoute,
    getListingRoute,
    getUserListingsRoute,
    addViewToListingRoute,
    createNewListingRoute,
    updateListingRoute,
    deleteListingRoute,
];