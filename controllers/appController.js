const request = require('request');



const backslash = (req, res) => {
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
        res.send(data);
    });
}

const calendar = async(req, res) => {
  
}

const allAirlines = async(req, res) => {
    await request(`${process.env.AIRLINES_URL}`, (error, response, body) => {
        if(error){
            res.json({
                message: error
            })
        }
        let data = JSON.parse(body);
        res.send(data);
    });
}

module.exports = {
    backslash,
    cheap,
    calendar,
    allAirlines
}

