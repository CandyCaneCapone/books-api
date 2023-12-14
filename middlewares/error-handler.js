const errorHandler = (err , req , res , next) => {
    const error = {
        message : err.message || "Internal server error" ,  
        status : err.statusCode || 500, 
    }

    res.status(error.status).json({message : error.message})
}

module.exports = errorHandler ; 