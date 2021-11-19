// Import Libraries
import express from "express";
import { checkSchema } from 'express-validator';

import { createLink, getLinks } from "../controllers/linksController.js";
import { createClassicLinkSchema } from "../validators/createLinkValidator.js";
import { validateRequest } from "../validators/validateRequest.js";

const getRoutes = () => {
    // Initialise express router
    const router = express.Router();

    // Route to create new link
    router.post('/user/:userId/link', createClassicLinkSchema, validateRequest, createLink);
    
    // Route to get links for user
    router.get('/user/:userId/links', getLinks);

    return router;
}

export { getRoutes };