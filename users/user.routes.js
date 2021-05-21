const router = require('express').Router();
const userController = require('./user.controller');

router.post('/signup', userController.signUp);

router.post('/signin', userController.signIn);

module.exports = router;