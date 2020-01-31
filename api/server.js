const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const auth_router = require('../auth/auth_router');
const pokemon_router = require('../pokemon/pokemon_router');
const deck_router = require('../deck/deck_router');
const authenticate = require('../auth/authenticate_middleware');

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.use('/api/auth', auth_router);
server.use('/api/pokemon', authenticate, pokemon_router);
server.use('/api/deck', authenticate, deck_router);

server.get('/', (req, res) => {
	res.send('hi from server');
});

module.exports = server;
