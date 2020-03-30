const notFound = (req, res, next) => {
    const error = new Error(`Cannot find ${req.originalUrl} path!`)
    res.status(404);
    next(error);
}

const errorMiddleware = (error, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500: res.statusCode;
    res.status(statusCode);
    res.json({
        message: error.message,
        stack: error.stack
    });
}

const envCheck = (req, res, next) => {
    if(!(process.env.TOKEN && process.env.V1_PRICES_URL && process.env.V1_CALENDAR_URL && process.env.AIRLINES_URL && process.env.CITIES_URL && process.env.COUNTRIES_URL))
   res.json({
            message: "Set all the env variables properly"
        });
        next();
}


module.exports = {
    errorMiddleware,
    notFound,
    envCheck
}