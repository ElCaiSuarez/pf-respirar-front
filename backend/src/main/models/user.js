const knex = require("../knex");
const tableName = 'user';
const Users = new Map();
Users.set(1, {id: 1, username: "juancarlos", email: "juancarlos@gmail.com"})

const save = async (data) => {
    try {
        //await knex(tableName)
          //  .insert(data)
        data.id = Users.size + 1;
        Users.set(data.id, data)
    } catch (error) {
        throw error;
    }
}

const getAll = async () => {
    try {    
        //return await knex(tableName);
        return Array.from(Users.values());
    } catch (error) {
        throw error;
    }
}

const getById = async (userId) => {
    try {    
        //return await knex(tableName);
        return Users.get(userId);
    } catch (error) {
        throw error;
    }
}

module.exports = {save, getAll, getById}