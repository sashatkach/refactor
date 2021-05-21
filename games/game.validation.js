const validator = require('validator');

function isValidGameId(gameId)
{
  return validator.isInt(gameId);
}
function isValidGame(gameFields)
{
  console.log(validator.isAlphanumeric(gameFields['title']));
  return validator.isAlphanumeric(gameFields['title'])
  && validator.isAlphanumeric(gameFields['studio'])
  && validator.isAlpha(gameFields['esrb_rating'])
  && validator.isLength(gameFields['esrb_rating'], {min: 1,  max: 5})
  && validator.isInt(gameFields['user_rating'].toString())
  && validator.isBoolean(gameFields['have_played']);
}

module.exports = { isValidGame, isValidGameId };