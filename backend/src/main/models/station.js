const knex = require("../knex");
const tableName = 'station';
const Stations = new Map();

const create = async (data) => {
    try {
        for (const [id, station] of Stations.entries()) {        
            if (station.serial === data.serial) {            
                throw new Error("Ya existe una estacion con ese serial");
            }
        }
        data.deleted = false;
        await knex(tableName)
              .insert(data)
        Stations.set(data.id, data)
    } catch (error) {
        throw error;
    }   
}

const save = async (data) =>{    
    try {
        await knex(tableName)
            .where("id", data.id)
            .update(data)
        Stations.set(data.id, data)
    } catch (error) {
        throw error;
    }
}

const erase = async (data) => {
    try {
        data.deleted = true;
        console.log("data: ", data)
        await knex(tableName)
            .where("id", data.id)
            .update({
                deleted: true
            })
        Stations.set(data.id, data)
    } catch (error) {
        throw error;
    }
}

const getAll = async () => {
    try {    
        return await knex(tableName);
       // return Array.from(Stations.values());
    } catch (error) {
        throw error;
    }
}

const getById = async (stationId) => {
    try {    
        var stations = await knex(tableName).where("id", stationId);
        if (stations.length > 0){
            return stations[0]
        }
        throw new Error("No id found");
        //return Stations.get(stationId);
    } catch (error) {
        throw error;
    }
}

module.exports = {create, save, getAll, getById, erase, Stations}