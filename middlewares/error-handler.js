const errorHandler = (err , req , res , next) => {
    const error = {
        message : err.message || "Internal server error" ,  
        status : err.statusCode || 500, 
    }

    if (err.code === "LIMIT_FILE_SIZE") {
        error.status = 400 ; 
        error.message = "File size exceeds the limit (1 MB)"
    }

    if (err.name === "ValidationError") {
        error.status = 400 ; 
        error.message = Object.values(err.errors)
        .map((item) => item.message)
        .join(',')
    }

    if (err.name === "CastError") {
        error.status = 404 ;
        error.message = `no book found with id ${err.value}`
    }
    res.status(error.status).json({message : error.message})
}

module.exports = errorHandler ; 