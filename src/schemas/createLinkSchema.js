/* TODO: Refactor to stop using "oneOf" from jsonSchema.
This produces some confusing errors including each link type returned in the API.*/

// Json validation schema for creating a link
const createLinkSchema = {
    type: "object",
    required: ["links"],
    properties: {
        links: {
            oneOf: [
                { $ref: "#/definitions/ClassicLink" },
                { $ref: "#/definitions/ShowsLink" },
                { $ref: "#/definitions/MusicPlayer" }
            ]
        }
    },
    definitions: {
        ClassicLink: {
            type: "object",
            required: ["type", "attributes"],
            properties: {
                type: {
                    type: "string",
                    enum: ["classic"]
                },
                attributes: {
                    type: "object",
                    required: ["title", "url"],
                    properties: {
                        title: {
                            type: "string",
                            maxLength: 144,
                        },
                        url: {
                            type: "string"
                        }
                    }
                }
            }
        },
        ShowsLink: {
            type: "object",
            properties: {
                type: {
                    type: "string",
                    enum: ["shows"]
                },
                attributes: {
                    type: "object",
                    required: ["title", "showList"],
                    properties: {
                        title: {
                            type: "string",
                            maxLength: 144,
                        },
                        showList: {
                            type: "array",
                            items: {
                                type: "object",
                                required: ["date", "venue", "status", "url"],
                                properties: {
                                    date: {
                                        type: "string",
                                    },
                                    venue: {
                                        type: "string"
                                    },
                                    status: {
                                        type: "string",
                                        enum: ["Sold Out", "Available", "Coming Soon"]
                                    },
                                    url: {
                                        type: "string"
                                    }
                                }
                            }
                        }
                    }
                }
            }
        },
        MusicPlayer: {
            type: "object",
            properties: {
                type: {
                    type: "string",
                    enum: ["music"]
                },
                attributes: {
                    type: "object",
                    required: ["title", "musicLinks"],
                    properties: {
                        title: {
                            type: "string",
                            maxLength: 144,
                        },
                        musicLinks: {
                            type: "array",
                            items: {
                                type: "object",
                                required: ["title", "icon", "url", "featured"],
                                properties: {
                                    title: {
                                        type: "string",
                                    },
                                    icon: {
                                        type: "string"
                                    },
                                    url: {
                                        type: "string"
                                    },
                                    featured: {
                                        type: "boolean"
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
};

export default createLinkSchema;