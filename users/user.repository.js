const User = require('../db').import('./user.model');
const bcrypt = require('bcrypt');

const createUser = async (userFields) => User.create({
    full_name: userFields.full_name,
    username: userFields.username,
    passwordHash: bcrypt.hashSync(userFields.password, 10),
    email: userFields.email,
});

const findUserByUsername = async (username) =>  User.findOne({ where: { username: username } });

const findUserById = async (id) => User.findOne({ where: { id: id } })

module.exports = { createUser, findUserById, findUserByUsername };