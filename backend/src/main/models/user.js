const knex = require("../knex");
const tableName = 'user';
const Users = new Map();
Users.set(1, {id: 1, username: "admin", email: "admin@gmail.com", type: "ADMIN"})//Cai: Modifico usuario por defecto con rol ADMIN
Users.set(2, {id: 2, username: "user", email: "user@gmail.com", type: "USER"})//Cai: Agrego 2do usuario por defecto con rol USER

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