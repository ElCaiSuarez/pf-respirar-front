const knex = require("../knex");
const tableName = 'application';
const Applications = new Map();

const create = async (data) => {
    try {
        for (const [id, application] of Applications.entries()) {
            if (application.serial === data.serial) {         
                throw new Error("Ya existe una solicitud con ese serial");
            }//Cai: Deberiamos buscar que no exista una Estacion con el serial de la solicitud
        }      
        data.deleted = false;
        data.status = "Pendiente";
        
        await knex(tableName)
            .insert(data)
        //data.id = Applications.size + 1;
        Applications.set(data.id, data)
    } catch (error) {
        throw error;
    }
}

const save = async (data) => {
    try {
        await knex(tableName)
            .where("id", data.id)
            .update(data)
        Applications.set(data.id, data)
    } catch (error) {
        throw error;
    }
}

const erase = async (data) => {
    try {
        data.deleted = true;
        await knex(tableName)
            .where("id", data.id)
            .update({
                deleted: true
            })
        Applications.set(data.id, data)
    } catch (error) {
        throw error;
    }
}

const getAll = async () => {
    try {    
        return await knex(tableName);
        //return Array.from(Applications.values());
    } catch (error) {
        throw error;
    }
}

const getById = async (applicationId) => {
    try {    
        var applications = await knex(tableName).where("id", applicationId);
        if (applications.length > 0){
            return applications[0]
        }
        throw new Error("No id found");
        //return Applications.get(applicationId);
    } catch (error) {
        throw error;
    }
}

module.exports = {create, save, getAll, getById, erase, Applications}