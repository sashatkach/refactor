const gameRepo = require('./game.repository');

const getGamesAll = async (ownerId) => gameRepo.getGamesAll(ownerId);

const getGameById = async (ownerId, gameId) => gameRepo.getGameById(ownerId, gameId);

const createGame = async (ownerId, gameFields) => gameRepo.createGame(ownerId, gameFields);

const updateGame = async (ownerId, gameId, gameFields) => gameRepo.updateGame(ownerId, gameId, gameFields);

const removeGame = async (ownerId, gameId) => gameRepo.removeGame(ownerId, gameId);

module.exports = { getGamesAll, getGameById, createGame, updateGame, removeGame };