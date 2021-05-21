const router = require('express').Router();
const gameController = require('./game.controller');

router.get('/all', gameController.getGamesAll);

router.get('/:id', gameController.getGameById);

router.post('/create', gameController.createGame);

router.put('/update/:id', gameController.updateGame);

router.delete('/:id', gameController.removeGame);

module.exports = router;