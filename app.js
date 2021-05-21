const express = require('express');
const app = express();
const db = require('./db');
const userRoutes = require('./users/user.routes');
const gameRoutes = require('./games/game.routes');
const validateSession = require('./middleware/validate-session');
db.sync();

app.use(express.json());
app.use('/api/auth', userRoutes);
app.use(validateSession)
app.use('/api/game', gameRoutes);

app.listen(process.env.APP_PORT, function() {
    console.log("App is listening on " + process.env.APP_PORT);
})