const validator = require('validator');

function isValidGameId(gameId)
{
  return validator.isInt(gameId);
}
function isValidGame(gameFields)
{
  return validator.isAlphanumeric(gameFields['title'])
  && validator.isAlphanumeric(gameFields['studio'])
  && validator.isAlpha(gameFields['esrb_raiting'])
  && validator.isLength(gameFields['esrb_raiting'], {min: 1,  max: 5})
  && validator.isInt(gameFields['user_raiting'].toString())
  && validator.isBoolean(gameFields['have_played']);
}

module.exports = { isValidGame, isValidGameId };