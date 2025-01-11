import ApiError from "../utils/ApiError.js";

const errorHandler=(err,req,res,next)=>{
    let error=err

    if(!(error instanceof ApiError)){
        const statusCode=error.statusCode || error instanceof mongoose.Error ? 400 : 500;
        error = new ApiError(statusCode, error.message);
    }

    res.status(error.statusCode).json({ message: error.message });
    next();
}

export {errorHandler}