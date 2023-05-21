const knex = require("../knex");
const tableName = 'station';

const save = async (data) => {
    try {
        await knex(tableName)
            .insert(data)
    } catch (error) {
        throw error;
    }
}

const getAll = async () => {
    try {    
        return await knex(tableName);
    } catch (error) {
        throw error;
    }
}

module.exports = {save, getAll}