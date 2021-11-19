import { v4 as uuidv4 } from 'uuid';

import { sortByDate } from './linksHelpers.js';

// Store user and links in a map
const map = new Map();

// Create Link
export const createLink = (req, res) => {
    const { userId } = req.params;
    if(!map.has(userId)) {
        map.set(userId, []);
    }
    // Generate id for link
    const id = uuidv4();
    // Generate date for link
    const createdAt = new Date();
    const result = {
        links: {
            id: id,
            type: req.body.links.type,
            createdAt: createdAt,
            attributes: req.body.links.attributes
        }
    }
    // Store new link for user
    map.get(userId).push(result.links);

    res.stjson(result);
}

export const getLinks = (req, res) => {
    const { userId } = req.params;
    const { sortBy, orderBy } = req.query;
    if(!map.has(userId)) {
        map.set(userId, []);
    }
    // Get all links for user
    const userLinks = map.get(userId);

    let result = { links: userLinks };

    let sortedUserLinks;
    // Current assumption is that we can only sort by date
    if(sortBy !== undefined && orderBy !== undefined) {
        sortedUserLinks = sortByDate(userLinks, orderBy);
        result = { links: sortedUserLinks };
    }

    //console.log(map);
    res.json(result);
}