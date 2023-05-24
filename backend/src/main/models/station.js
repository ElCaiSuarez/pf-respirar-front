const knex = require("../knex");
const tableName = 'station';
const Stations = new Map();

const save = async (data) => {
    try {
        //await knex(tableName)
          //  .insert(data)
        data.id = Stations.size + 1;
        Stations.set(data.id, data)
    } catch (error) {
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

module.exports = {save, getAll, getById}