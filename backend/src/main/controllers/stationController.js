var Station = require('../models/station');

async function createStation(req,res) {
    var station = req.body; 
    await Station.save(station);
    res.status(200).send(station);
}

async function listStations(req, res) {
    var stations = await Station.getAll();
    
    const userId = req.query.userid;
    if (userId && userId.trim() !== '') 
    {
        stations = stations.filter(st => st.userId === parseInt(userId));
    }
    const type = req.query.type;
    if (type && type.trim() !== '') 
    {
        stations = stations.filter(st => st.type === type);
    }
    res.status(200).send(stations);
}

async function getStationById(req, res) {
    var stations = await Station.getById(parseInt(req.params.id));
    res.status(200).send(stations);
}

module.exports = {
    createStation,
    listStations,
    getStationById
};