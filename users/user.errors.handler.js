const userService = require('./user.service');
const userMessage = require('./user.messages');
const { StatusCodes } = require('http-status-codes');

const createUserErrorHandler = async (req, res) => {
    try
    {
        const user = await userService.createUser(req.body.user)
        const token = _createUserToken(user);
        return res.status(StatusCodes.OK).json({
            user: user,
            token: token
        });
    }
    catch(e)
    {
        const errors = e.errors ? e.errors.map(error => error.message) : e.message;
        return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: errors });
    }
}

const _createUserToken = (user) =>
{
    if(user)
    {
        return userService.getToken(user);
    }
    throw new Error(userMessage.cantCreateUser);
}

const findUserErrorHandler = async (req, res) => {
    try
    {
        const user = await userService.findUserByUsername(req.body.user.username);
        if(user)
        {
            return _checkAuthUserErrorHandler(req, res, user);
        }
        else
        {
            throw new Error
        }
    }
    catch(e)
    {
        return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: userMessage.userNotFound });
    }
}

const _checkAuthUserErrorHandler = async (req, res, user) => 
{
    try
    {
        const match = await userService.checkAuth(req, user);
        return _checkAuthUser(res, user, match);
    }
    catch(e)
    {
        return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send({ error: e.message })
    }
}

const _checkAuthUser = (res, user, match) => {
    if(match){
        const token = userService.getToken(user);
        return res
        .status(StatusCodes.OK)
        .json({
            user: user,
            message: userMessage.successfulLogin,
            sessionToken: token
        });
    }
    return res
    .status(StatusCodes.FORBIDDEN)
    .send({ message: userMessage.forbidden })
}

module.exports = { createUserErrorHandler, findUserErrorHandler}