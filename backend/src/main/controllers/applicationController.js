var Application = require('../models/application');
var Station = require('../models/station');
var Fiware = require('../services/fiware');

async function createApplication(req,res) {
    var application = req.body; 
    await Application.create(application);
    res.status(200).send(application);
}

async function saveApplication(req,res) {//Cai: Agrego metodo para Patch
    var application = await Application.getById(parseInt(req.body.id)); //Cai: Busco la estacion por id
    application.name = req.body.name; //Cai: Reemplazo el name modificado
    application.description = req.body.description //Cai: Reemplazo la description modificada
    await Application.save(application);
    res.status(200).send(application);
}

async function listApplications(req, res) {
    var applications = await Application.getAll();
    
    const userId = req.query.userId;//Cai: Cambio req.query.userid X req.query.userId
    if (userId && userId.trim() !== '') 
    {
        applications = applications.filter(st => st.userId === parseInt(userId));
    }
    const type = req.query.type;
    if (type && type.trim() !== '') 
    {
        applications = applications.filter(st => st.type === type);
    }
    applications = applications.filter(st => st.status === "PENDING");

    applications = applications.filter(st => !st.deleted);
    res.status(200).send(applications);
}

async function getApplicationById(req, res) {
    var applications = await Application.getById(parseInt(req.params.id));
    res.status(200).send(applications);
}

async function rejectApplicationById(req, res) {
    var application = await Application.getById(parseInt(req.params.id));
    application.status = "REJECTED";
    await Application.save(application);
    res.status(200).send(application);
}

async function acceptApplicationById(req, res) {
    var application = await Application.getById(parseInt(req.params.id));
    application.status = "ACCEPTED";
    var station = {
        name: application.name,
        description: application.description,
        serial: application.serial,
        type: "EXTERNAL",
        userId: application.userId,
        deleted: false,
    }
    await Application.save(application);
    await Station.create(station);
    await Fiware.createStation(station)
    res.status(200).send(application);
}

async function deleteById(req, res) {
    var application = await Application.getById(parseInt(req.params.id));
    await Application.erase(application)
    res.status(200).send(application);
}

module.exports = {
    createApplication,
    listApplications,
    getApplicationById,
    deleteById,
    acceptApplicationById,
    rejectApplicationById,
    saveApplication
};