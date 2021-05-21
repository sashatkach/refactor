
const gameService = require('./game.service');
const gameMessages = require('./game.messages');
const { isValidGame, isValidGameId } = require('./game.validation');
const { StatusCodes, ReasonPhrases } = require('http-status-codes');

const getGamesAll =  async (req, res) =>
{
    try
    {
        const games = await gameService.getGamesAll(req.user.id);
        if(games)
        {
            return res
            .status(StatusCodes.OK)
            .json({
                games: games,
            });
        }
        res
        .status(StatusCodes.BAD_REQUEST)
        .json({
            message: gameMessages.dataNotFound
        })
    }
    catch(e)
    {
        res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({
            message: e.message
        })
    }
};

const getGameById = async (req, res) =>
{
    if(isValidGameId(req.params.id))
    {
        try
        {
            const game = await gameService.getGameById(req.user.id, req.params.id);
            if(game)
            {
                return res
                .status(StatusCodes.OK)
                .json({
                    game: game,
                });
            }
            res
            .status(StatusCodes.NOT_FOUND)
            .json({
                message: gameMessages.gameNotFound
            })
        }
        catch(e)
        {
            res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json({
                message: e.message
            })
        }
    }
    else
    {
        res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: gameMessages.invalidUserId });
    }
};

const createGame = async (req, res) =>
{
    if(isValidGame(req.body.game))
    {
        try
        {
            const game = await gameService.createGame(req.user.id, req.body.game);
            if(game)
            {
                return res
                .status(StatusCodes.CREATED)
                .json({
                    game: game,
                    message: gameMessages.created
                })
            }
            res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .send(err.message);
        }
        catch(e)
        {
            res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json({message: e.message});
        }
    }
    else
    {
        res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: gameMessages.invalidGame });
    }
};

const updateGame = async(req, res) => 
{
    if(isValidGame(req.body.game))
    {
        try
        {
            const game = await gameService.updateGame(req.user.id, req.params.id, req.body.game);
            if(game)
            {
                return res
                .status(StatusCodes.OK)
                .json({
                    game: game,
                    message: gameMessages.updated
                })
            }
            res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .send(err.message);
        }
        catch(e)
        {
            res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json({message: e.message});
        }
    }
    else
    {
        res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: gameMessages.invalidGame });
    }
}

const removeGame = async (req, res) =>
{
    if(isValidGameId(req.params.id))
    {
        try
        {
            const game = await gameService.removeGame(req.user.id, req.params.id);
            if(game)
            {
                return res
                .status(StatusCodes.OK)
                .json({
                    game: game,
                    message: gameMessages.deleted
                });
            }
            res
            .status(StatusCodes.NOT_FOUND)
            .json({
                message: gameMessages.gameNotFound
            })
        }
        catch(e)
        {
            res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json({
                message: e.message
            })
        }
    }
    else
    {
        res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: gameMessages.invalidUserId });
    }
}

module.exports = { getGamesAll, getGameById, createGame, updateGame, removeGame };