// Third Party Imports
import { query, body, check  } from 'express-validator';

// export const createClassicLinkSchema = {
//     'links.*.title': {
//         isLength: {
//             errorMessage: 'Title should not be longer than 144 characters',
//             options: {max: 144}
//         }
//     }
// }

export const createClassicLinkSchema = [
    body('links.title').isLength({ max: 144 })
];