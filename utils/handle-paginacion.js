const paginationCustom = (req) => {

    const pageAsNumber = Number.parseInt(req.query.page)
    const limitAsNumber = Number.parseInt(req.query.limit)

    let page = 0
    if (!Number.isNaN(pageAsNumber) && pageAsNumber > 0) {
        page = pageAsNumber
    }

    let limit = 10
    if (!Number.isNaN(limitAsNumber) && limitAsNumber > 0 && limit < 200) {
        limit = limitAsNumber
    }

    return {page, limit}


}

module.exports = paginationCustom