var Station = require('../models/station');

async function createStation(req,res) {
    var station = req.body; 
    await Station.save(station);
    res.status(200).send(station);
}

module.exports = {
    createStation,   
};