var Station = require('../models/station');

async function listStations(req, res) {
    var stations = await Station.getAll();
    res.status(200).send(stations);
}

module.exports = {
    listStations    
};