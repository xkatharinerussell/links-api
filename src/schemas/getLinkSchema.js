const getLinkSchema = {
    type: "object",
    properties: {
        sortBy: {
            type: "string",
            enum: ["createdAt"]
        },
        orderBy: {
            type: "string",
            enum: ["ASC", "DESC"]
        }
    }
}

export default getLinkSchema;