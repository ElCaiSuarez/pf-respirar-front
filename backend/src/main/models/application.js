const knex = require("../knex");
const tableName = 'application';
const Applications = new Map();

const create = async (data) => {
    try {
        //await knex(tableName)
          //  .insert(data)
        data.id = Applications.size + 1;
        data.deleted = false;
        data.status = "PENDING";
        Applications.set(data.id, data)
    } catch (error) {
        throw error;
    }
}
const save = async (data) => {
    try {
        //await knex(tableName)
          //  .insert(data)
        Applications.set(data.id, data)
    } catch (error) {
        throw error;
    }
}

const erase = async (data) => {
    try {
        //await knex(tableName)
          //  .insert(data)
        data.deleted = true;
        Applications.set(data.id, data)
    } catch (error) {
        throw error;
    }
}

const getAll = async () => {
    try {    
        //return await knex(tableName);
        return Array.from(Applications.values());
    } catch (error) {
        throw error;
    }
}

const getById = async (applicationId) => {
    try {    
        //return await knex(tableName);
        return Applications.get(applicationId);
    } catch (error) {
        throw error;
    }
}

module.exports = {create, save, getAll, getById, erase}