const knex = require("../knex");
const tableName = 'station';
const Stations = new Map();

const create = async (data) => {
    try {
        //await knex(tableName)
          //  .insert(data)
        data.id = Stations.size + 1;
        data.deleted = false;
        Stations.set(data.id, data)
    } catch (error) {
        throw error;
    }
}
const save = async (data) => {
    try {
        //await knex(tableName)
          //  .insert(data)
        Stations.set(data.id, data)
    } catch (error) {
        throw error;
    }
}

const erase = async (data) => {
    try {
        //await knex(tableName)
          //  .insert(data)
        data.deleted = true;
        Stations.set(data.id, data)
    } catch (error) {
        console.log("ERROR EN erase")
        throw error;
    }
}

const getAll = async () => {
    try {    
        //return await knex(tableName);
        return Array.from(Stations.values());
    } catch (error) {
        throw error;
    }
}

const getById = async (stationId) => {
    try {    
        //return await knex(tableName);
        return Stations.get(stationId);
    } catch (error) {
        throw error;
    }
}

module.exports = {create, save, getAll, getById, erase}