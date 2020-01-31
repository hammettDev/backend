const db = require('../database/db_config');

module.exports = {
	findUserBy,
	findUserDecks,
	findDecksBy,
	addToDeck,
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
	return db('deck').where('userId', id);
}

function findDecksBy(id) {
	return db('deck').where({ id });
}

function addToDeck(card) {
	return db('deck')
		.join('users')
		.where({ userId: card })
		.insert();
}
