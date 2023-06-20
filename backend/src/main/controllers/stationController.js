var Station = require('../models/station');
var Fiware = require('../services/fiware');

async function createStation(req,res) {
    try{
        var station = req.body; 
        station.type = "RESPIRAR";
        station.relativeHumidity = 0,
        station.temperature = 0,
        station.NO2 = 0
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
        var station = await Station.getById(parseInt(req.body.id)); //Cai: Busco la estacion por id
        station.name = req.body.name; //Cai: Reemplazo el name modificado
        station.description = req.body.description //Cai: Reemplazo la description modificada
        await Station.save(station);
        res.status(200).send(station);
    } catch(error){
        res.status(500).send("Internal server error");
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