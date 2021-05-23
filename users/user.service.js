const userRepository = require('./user.repository');
const jwt  = require('jsonwebtoken');
const { promisify } = require('util');
const compare = promisify(require('bcrypt').compare);

const createUser = async (userFields) => userRepository.createUser(userFields);

const findUserByUsername = async (username) => userRepository.findUserByUsername(username);

const findUserById = async (id) => userRepository.findUserById(id);

const checkAuth = async (req, user) => compare(req.body.user.password, user.passwordHash);

const getToken = (user) => jwt.sign({ id: user.id }, 'lets_play_sum_games_man', { expiresIn: 60 * 60 * 24 });

module.exports = { findUserByUsername, findUserById, createUser, checkAuth, getToken };