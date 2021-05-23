const jwt = require('jsonwebtoken');
const userService = require('../users/user.service');
const { ReasonPhrases, StatusCodes } = require('http-status-codes');

const verifyToken = (req, res, next, sessionToken) =>
{
    jwt.verify(sessionToken, 'lets_play_sum_games_man', (err, decoded) =>
    {
        if(!err)
        {
            return jwtVerify(decoded, req, res, next);
        }
        return res
        .status(StatusCodes.BAD_REQUEST)
        .json({message: ReasonPhrases.BAD_REQUEST});
    });
}

const jwtVerify = async (decoded, req, res, next) =>
{
    if (decoded)
    {
        try
        {
            const user = await userService.findUserById(decoded.id);
            req.user = user;
            next();
        }
        catch(e)
        {
            res.status(StatusCodes.BAD_REQUEST).send({ error: e.message });
        }
    }
    else
    {
        res.status(StatusCodes.UNAUTHORIZED).send({ error: ReasonPhrases.UNAUTHORIZED });
    }
}
module.exports = function (req, res, next)
{
    if (req.method == 'OPTIONS')
    {
        next();   // allowing options as a method for request
    }

    const sessionToken = req.headers.authorization;
    if (!sessionToken)
    {
        return res.status(StatusCodes.FORBIDDEN).send({ auth: false, message: ReasonPhrases.FORBIDDEN });
    }
    else
    {
        verifyToken(req, res, next, sessionToken);
    }
}
