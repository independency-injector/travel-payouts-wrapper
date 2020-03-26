const request = require('request');


const generateUrl = function (url, req, token) {

    let result = `${url}?`;
    for (entry in req) {
        result += `${entry}=${req[entry]}&`;
    }
    return result += `token=${token}`;
}


const backslash = (req, res) => {
    res.json({
        message: "root"
    });
}

const cheap = (req, res) => {
    request(generateUrl(process.env.V1_PRICES_URL, req.query, process.env.TOKEN), (error, response, body) => {
        if (error) {
            res.json({
                message: error
            });
        }
        let data = JSON.parse(body);
        res.json(data);
    });
}

const calendar = (req, res) => {
    request(generateUrl(process.env.V1_CALENDAR_URL, req.query, process.env.TOKEN), (error, response, body) => {
        if (error) {
            res.json({
                message: error
            })
        }
        let data = JSON.parse(body);
        res.json(data);
    })
}

const allAirlines = (req, res) => {
    request(`${process.env.AIRLINES_URL}`, (error, response, body) => {
        if (error) {
            res.json({
                message: error
            })
        }
        let data = JSON.parse(body);
        res.json(data);
    });
}
const allCities = (req, res) => {
    request(`${process.env.CITIES_URL}`, (error, response, body) => {
        if (error) {
            res.json({
                message: error
            })
        }
        let data = JSON.parse(body);
        res.json(data);
    });
}

const allCountries = (req, res) => {
    request(`${process.env.COUNTRIES_URL}`, (error, response, body) => {
        if (error) {
            res.json({
                message: error
            })
        }
        let data = JSON.parse(body);
        res.json(data);
    })
}

module.exports = {
    backslash,
    cheap,
    calendar,
    allAirlines,
    allCities,
    allCountries
}

