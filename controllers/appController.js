const request = require('request');



const root = (req, res) => {
    res.json({
        message: "root"
    });
}

const cheap = async (req, res) => {
    await request(`${process.env.V1_PRICES_URL}?origin=${req.query.origin}&destination=${req.query.destination}&
    depart_date=${req.query.depart_date}&return_date=${req.query.return_date}&token=${process.env.TOKEN}`, (error, response, body) => {
        if(error){
            res.json({
                message: error
            });
        }
        let data = JSON.parse(body);
        res.json(data);
    });
}

const calendar = async(req, res) => {
    await request(`${process.env.V1_CALENDAR_URL}?depart_date=${req.query.depart_date}&origin=${req.query.origin}&destination=${req.query.destination}&
    calendar_type=${req.query.calendar_type}&token=${process.env.TOKEN}`, (error, response, body) => {
        if(error){
            res.json({
                message: error
            });
        }
        let data = JSON.parse(body);
        if(!body.success)
        res.status(404).json({
            message: "Not found"
        });
        res.send(data);
    });
}

const allCountries = async (req, res) => {
    await request(`${process.env.COUNTRIES_URL}`, (error, response, body) => {
        if(error){
            res.json({
                message: error
            });
        }
        let data = JSON.parse(body);
        if(!body.success)
        res.status(404).json({
            message: "Not found"
        });
        res.send(data);
    });
}

const allAirlines = async(req, res) => {
    await request(`${process.env.AIRLINES_URL}`, (error, response, body) => {
        if(error){
            res.json({
                message: error
            })
        }
        res.send(body);
    });
}

const allCities = async(req, res) => {
    await request(`${process.env.CITIES_URL}`, (error, response, body) => {
        if(error){
            res.json({
                message: error
            });
        }
        let data = JSON.parse(body);
        res.send(data);
    })
}



module.exports = {
    backslash: root,
    cheap,
    calendar,
    allAirlines,
    allCities,
    allCountries
}

