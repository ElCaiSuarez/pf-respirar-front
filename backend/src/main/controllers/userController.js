var User = require('../models/user');

async function createUser(req,res) {
    var user = req.body; 
    await User.save(user);
    res.status(200).send(user);
}

async function listUsers(req, res) {
    var users = await User.getAll();
    res.status(200).send(users);
}

async function getUserById(req, res) {
    var users = await User.getById(parseInt(req.params.id));
    res.status(200).send(users);
}

module.exports = {
    createUser,
    listUsers,
    getUserById
};