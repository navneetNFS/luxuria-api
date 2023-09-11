module.exports.ProductApiFilter = (filter) => {
    const filterFunc = () => {
        if(filter) {
            if(filter['category'] && filter['price']){
                return {
                    category : {
                        $regex : filter.category,
                        $options: 'i'
                    },
                    price:{
                        $gte: filter.price.gt || 1,
                        $lte : filter.price.lt || 99999999
                    }
                }
            }
            else if(filter.category){
                return {
                    category : {
                        $regex : filter.category,
                        $options: 'i'
                    }
                }
            }
            else if(filter.price){
                return {
                    price:{
                        $gte: filter.price.gt || 1,
                        $lte : filter.price.lt || 99999999
                    }
                }
            }
            else{
                return {}
            }
        }
        else{
            return {}
        }
    }

    return filterFunc()
}

module.exports.paginateData = (data, page, pageSize) => {
    // Check if page and pageSize are valid
    if (page < 1 || pageSize < 1) {
        throw new Error('Page and pageSize must be positive integers.');
    }

    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const chunks = data.slice(startIndex, endIndex)
    // Use slice to extract the chunk of data for the requested page
    return {data:chunks,totalPages: Math.ceil(data.length/pageSize)};
}