var Station = require('../models/station');

async function createStation(req,res) {
    var station = req.body; 
    station.type = "RESPIRAR";
    await Station.create(station);
    res.status(200).send(station);
}

async function listStations(req, res) {
    var stations = await Station.getAll();
    const userId = req.query.userId;//Cambio req.query.userid X req.query.userId
    if (userId && userId.trim() !== '') 
    {
        stations = stations.filter(st => st.userId === parseInt(userId));
    }
    const type = req.query.type;
    if (type && type.trim() !== '') 
    {
        stations = stations.filter(st => st.type === type);
    }

    stations = stations.filter(st => !st.deleted);
    res.status(200).send(stations);
}

async function getStationById(req, res) {
    var stations = await Station.getById(parseInt(req.params.id));
    res.status(200).send(stations);
}

async function deleteById(req, res) {
    var station = await Station.getById(parseInt(req.params.id));
    await Station.erase(station)
    res.status(200).send(station);
}

module.exports = {
    createStation,
    listStations,
    getStationById,
    deleteById
};