// Sort links by date
export const sortByDate = (links, order) => {
    if(order === "ASC") {
        return [...links].sort((a, b) => {
            // Sort all dates by least to most recent
            return new Date(a.createdAt) - new Date(b.createdAt);
        });
    }
    else {
        return [...links].sort((a, b) => {
            // Sort all dates by least to most recent
            return new Date(b.createdAt) - new Date(a.createdAt);
        });
    }
}