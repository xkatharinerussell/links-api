import { Validator } from "express-json-validator-middleware";
import createLinkSchema from '../src/schemas/createLinkSchema.js';
import getLinkSchema from '../src/schemas/getLinkSchema.js';

describe('Validate Links Request', () => {
    // Create new validator
    const validateCreateMiddleware = new Validator().validate({ body: createLinkSchema });
    const validateGetMiddleware = new Validator().validate({ query: getLinkSchema });

    let mockRequest;
    let mockResponse;
    let next = jest.fn();

    beforeEach(() => {
        mockRequest = {};
        mockResponse = {
            json: jest.fn()
        };
    });

    test('Invalid Classic Link Request, return title too long', async () => {
        // Assign
        mockRequest = {
            body: {
                links: {
                    type: "classic",
                    attributes: {
                        title: "short title short title short title short title short title short title short title short title short title short title short title short title short title",
                        url: "another url"
                    }
                }
            }
        };

        // Act
        validateCreateMiddleware(mockRequest, mockResponse, next = (error) => {
            // Assert
            expect(error).toBeTruthy();
            expect(error.name).toBe("JsonSchemaValidationError");
            expect(error.validationErrors.body[0].message).toBe("should NOT be longer than 144 characters");
        });
    });

    test('Invalid Shows Link Request, missing show url', async () => {
        // Assign
        mockRequest = {
            body: {
                links: {
                    type: "shows",
                    attributes: {
                        showList: [
                            {
                                date: "19 December 2021",
                                venue: "Agganis Arena",
                                status: "Available"
                            }
                        ]
                    }
                }
            }
        };

        // Act
        validateCreateMiddleware(mockRequest, mockResponse, next = (error) => {
            // Assert
            expect(error).toBeTruthy();
            expect(error.name).toBe("JsonSchemaValidationError");
            expect(error.validationErrors.body[1].message).toBe("should have required property 'url'");
        });
    });

    test('Invalid Shows Link Request, invalid status', async () => {
        // Assign
        mockRequest = {
            body: {
                links: {
                    type: "shows",
                    attributes: {
                        showList: [
                            {
                                date: "19 December 2021",
                                venue: "Agganis Arena",
                                status: "Not Yet",
                                url: "https://banana.com/getTickets"
                            }
                        ]
                    }
                }
            }
        };

        // Act
        validateCreateMiddleware(mockRequest, mockResponse, next = (error) => {
            // Assert
            expect(error).toBeTruthy();
            expect(error.name).toBe("JsonSchemaValidationError");
            expect(error.validationErrors.body[1].dataPath).toBe(".links.attributes.showList[0].status");
            expect(error.validationErrors.body[1].params).toStrictEqual({"allowedValues": ["Sold Out", "Available", "Coming Soon"]})
            expect(error.validationErrors.body[1].message).toBe("should be equal to one of the allowed values");
        });
    });

    test('Invalid Music Player Link Request, invalid link type', async () => {
        // Assign
        mockRequest = {
            body: {
                links: {
                    type: "anothertype",
                    attributes: {
                        
                    }
                }
            }
        };

        // Act
        validateCreateMiddleware(mockRequest, mockResponse, next = (error) => {
            // Assert
            expect(error).toBeTruthy();
            expect(error.name).toBe("JsonSchemaValidationError");
            expect(error.validationErrors.body[2].dataPath).toBe(".links.type");
            expect(error.validationErrors.body[2].params).toStrictEqual({"allowedValues": ["music"]})
            expect(error.validationErrors.body[2].message).toBe("should be equal to one of the allowed values");
        });
    });

    test('Invalid Music Player Link Request, missing featured attribute', async () => {
        // Assign
        mockRequest = {
            body: {
                links: {
                    type: "music",
                    attributes: {
                        musicLinks: [
                        {
                            title: "Spotify",
                            icon: "spotify.png",
                            url: "lnktree.com"
                        },
                        {
                            title: "Spotify",
                            icon: "spotify.png",
                            url: "lnktree.com"
                        }
                        ]
                    }
                }
            }
        };

        // Act
        validateCreateMiddleware(mockRequest, mockResponse, next = (error) => {
            // Assert
            expect(error).toBeTruthy();
            expect(error.name).toBe("JsonSchemaValidationError");
            expect(error.validationErrors.body[2].dataPath).toBe(".links.attributes");
            expect(error.validationErrors.body[2].message).toBe("should have required property 'featured'");
        });
    });

    test('Invalid Get Link Request, invalid sortBy value', async () => {
        // Assign
        mockRequest = {
            query: {
                sortBy: "other",
            }
        };

        // Act
        validateGetMiddleware(mockRequest, mockResponse, next = (error) => {
            // Assert
            expect(error).toBeTruthy();
            expect(error.name).toBe("JsonSchemaValidationError");
            expect(error.validationErrors.query[0].dataPath).toBe(".sortBy");
            expect(error.validationErrors.query[0].params).toStrictEqual({"allowedValues": ["createdAt"]})
            expect(error.validationErrors.query[0].message).toBe("should be equal to one of the allowed values");
        });
    });

    test('Invalid Get Link Request, invalid orderBy value', async () => {
        // Assign
        mockRequest = {
            query: {
                orderBy: "other",
            }
        };

        // Act
        validateGetMiddleware(mockRequest, mockResponse, next = (error) => {
            // Assert
            expect(error).toBeTruthy();
            expect(error.name).toBe("JsonSchemaValidationError");
            expect(error.validationErrors.query[0].dataPath).toBe(".orderBy");
            expect(error.validationErrors.query[0].params).toStrictEqual({"allowedValues": ["ASC", "DESC"]})
            expect(error.validationErrors.query[0].message).toBe("should be equal to one of the allowed values");
        });
    });
})