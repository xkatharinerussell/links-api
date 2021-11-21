import { v4 as uuidv4 } from 'uuid';

import { sortByDate } from './linksHelpers.js';

// Store user and links in a map
// Note: this is a temporary way to mock some responses
// TODO: use a database to store data along with a service to reach out to the database
const map = new Map();

// Create Link
export const createLink = (req, res) => {
    const { userId } = req.params;
    // Create user if it doesn't exist
    if(!map.has(userId)) {
        map.set(userId, []);
    }
    // Generate id for link
    const id = uuidv4();
    // Generate date for link
    const createdAt = new Date();
    // TODO: Create a DTO object and refactor to enforce format for response
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

    res.status(201).json(result);
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
    // TODO: refactor this to be part of service level code
    if(sortBy !== undefined && orderBy !== undefined) {
        sortedUserLinks = sortByDate(userLinks, orderBy);
        result = { links: sortedUserLinks };
    }

    res.status(200).json(result);
}