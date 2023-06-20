var Application = require('../models/application');
var Station = require('../models/station');
var Fiware = require('../services/fiware');

var errorSolicitudDuplicada = "Ya existe una solicitud con ese serial"
var errorEstacionDuplicada = "Ya existe una estacion con ese serial"

async function createApplication(req, res) {
    try {
        var application = req.body;
        await Application.create(application);
        res.status(200).send(application);
    } catch (error) {
        if (error.message === errorSolicitudDuplicada) {
            res.status(400).send(errorSolicitudDuplicada);
        }
    }
}

async function saveApplication(req, res) {
    try {
        var application = await Application.getById(parseInt(req.body.id)); //Cai: Busco la solicitud por id
        application.name = req.body.name; //Cai: Reemplazo el name modificado
        application.description = req.body.description //Cai: Reemplazo la description modificada
        await Application.save(application);
        res.status(200).send(application);
    } catch (error) {
        res.status(500).send("Internal server error");
    }
}

async function listApplications(req, res) {
    var applications = await Application.getAll();

    const userId = req.query.userId;
    if (userId && userId.trim() !== '') {
        applications = applications.filter(st => st.userId === parseInt(userId));
    }
    const status = req.query.status;//Cai: Agrego filtro por status
    if (status && status.trim() !== '') {
        applications = applications.filter(st => st.status === status);
    }
    const type = req.query.type;//Cai: Modifico type por status
    if (type && type.trim() !== '') {
        applications = applications.filter(st => st.type === type);
    }
    //applications = applications.filter(st => st.status === "Pendiente"); //Cai: Saco el filtro para Mis Solicitudes / Rol User

    applications = applications.filter(st => !st.deleted);
    res.status(200).send(applications);
}

async function getApplicationById(req, res) {
    var applications = await Application.getById(parseInt(req.params.id));
    res.status(200).send(applications);
}

async function rejectApplicationById(req, res) {
    var application = await Application.getById(parseInt(req.params.id));
    application.status = "Rechazada";
    await Application.save(application);
    res.status(200).send(application);
}

async function acceptApplicationById(req, res) {
    try {
        var application = await Application.getById(parseInt(req.params.id));
        application.status = "Aceptada";
        var station = {
            name: application.name,
            description: application.description,
            serial: application.serial,
            type: "EXTERNA",
            userId: application.userId,
            latitude: application.latitude,
            longitude: application.longitude,
            deleted: false,
        }
        await Application.save(application);
        await Station.create(station);
        await Fiware.createStation(station)
        res.status(200).send(application);
    } catch (error) {
        if (error.message === errorSolicitudDuplicada) {
            res.status(400).send(errorSolicitudDuplicada);
        } else if ((error.message === errorEstacionDuplicada)) {
            res.status(400).send(errorEstacionDuplicada);
        }
    }
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