const Game = require('../db').import('./game.model');

const getGamesAll = async (ownerId) => Game.findAll({ where: { owner_id: ownerId } });

const getGameById = async (ownerId, gameId) => Game.findOne({ where: {owner_id: ownerId, id: gameId}});

const createGame = async (ownerId, gameFields) => Game.create({
  title: gameFields.title,
  owner_id: ownerId,
  studio: gameFields.studio,
  esrb_rating: gameFields.esrb_rating,
  user_rating: gameFields.user_rating,
  have_played: gameFields.have_played
});

const updateGame = async (ownerId, gameId, gameFields) =>  Game.update({
  title: gameFields.title,
  studio: gameFields.studio,
  esrb_rating: gameFields.esrb_rating,
  user_rating: gameFields.user_rating,
  have_played: gameFields.have_played
}, {
  where: {
    owner_id: ownerId,
    id: gameId
  }
});

const removeGame = async (ownerId, gameId) => Game.destroy({
    where: {
        id: gameId,
        owner_id: ownerId
    }
})
module.exports = { getGamesAll, getGameById, createGame, updateGame, removeGame };