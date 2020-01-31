const db = require('../database/db_config');

module.exports = {
	createUser,
	findBy,
};

function createUser(user) {
	return db('users').insert(user);
}

function findBy(filter) {
	return db('users').where(filter);
}
