function getPaginate(data, pages, limit) {
    return {
        data: data.rows,
        totalData: data.count,
        currentPage: parseInt(pages),
        totalPages: Math.ceil(data.count / limit)
    };
}

module.exports = {
    getPaginate,   
};