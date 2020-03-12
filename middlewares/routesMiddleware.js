const notFound = (req, res, next) => {
    const error = new Error(`Cannot find ${req.originalUrl} path!`)
    res.status(404);
    next(error);
}

const errorMiddleware = (error, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500: res.statusCode;
    res.status(statusCode);
    res.json({
        message: error.message
    });
}


module.exports = {
    errorMiddleware,
    notFound
}