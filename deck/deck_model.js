const db = require('../database/db_config');

module.exports = {
	findUserBy,
	findUserDecks,
	findDecksBy,
	addDeck,
};

function findUserBy(id) {
	return (
		db('users')
			// .select('username', 'first_name', 'last_name')
			.where({ id })
			.first()
	);
}

function findUserDecks(id) {
	return db('decks').where('userId', id);
}

function findDecksBy(id) {
	return db('decks').where({ id });
}

function addDeck(deck) {
	return db('decks').insert(deck);
}
