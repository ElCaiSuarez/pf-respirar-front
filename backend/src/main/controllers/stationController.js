var Station = require('../models/station');
var Fiware = require('../services/fiware');

async function createStation(req,res) {
    try{
        var station = req.body; 
        station.type = "RESPIRAR";
        await Station.create(station);
        await Fiware.createStation(station)
        res.status(200).send(station);
    } catch(error){
        if (error.message === "Ya existe una estacion con ese serial") {
            res.status(400).send("Ya existe una estacion con ese serial");
        } else {
            res.status(500).send("Internal server error");
        }
    }    
}

async function saveStation(req,res) {
    try{
        var stations = await Station.getById(parseInt(req.body.id));
        stations.name = req.body.name;
        stations.description = req.body.description 
        stations.serial = req.body.serial
        await Station.save(stations);
        res.status(200).send(stations);
    } catch(error){
        if (error.message === "Ya existe una estacion con ese serial") {
            res.status(400).send("Ya existe una estacion con ese serial");
        } else {
            res.status(500).send("Internal server error");
        }
    }
}

async function listStations(req, res) {
    var stations = await Station.getAll();
    const userId = req.query.userId;
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
    deleteById,
    saveStation
};