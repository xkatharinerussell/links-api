// Import Libraries
import express from "express";
import { Validator } from "express-json-validator-middleware";

// Local imports
import { createLink, getLinks } from "../controllers/linksController.js";
import createLinkSchema from "../schemas/createLinkSchema.js";
import getLinkSchema from "../schemas/getLinkSchema.js";

// Create new validator
const { validate } = new Validator();

const getRoutes = () => {
    // Initialise express router
    const router = express.Router();

    // Route to create new link
    router.post('/user/:userId/link', validate({ body: createLinkSchema }), createLink);

    // Route to get links for user
    router.get('/user/:userId/links', validate({ query: getLinkSchema }), getLinks);

    return router;
}

export { getRoutes };