const { ReasonPhrases, StatusCodes } = require('http-status-codes');
const { isValidUser } = require('./user.validation');
const { createUserErrorHandler, findUserErrorHandler } = require('./user.errors.handler');
const signUp = (req, res) => {
    if(isValidUser(req.body.user))
    {
        return createUserErrorHandler(req, res);
    }

    return res
    .status(StatusCodes.BAD_REQUEST)
    .json({ message: ReasonPhrases.BAD_REQUEST});
};

const signIn = async (req, res) => {
    if(isValidUser(req.body.user))
    {
        return findUserErrorHandler(req, res);
    }
    return res
    .status(StatusCodes.BAD_REQUEST)
    .json({ message: ReasonPhrases.BAD_REQUEST});
};

module.exports = { signIn, signUp };