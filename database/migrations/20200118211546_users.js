exports.up = function(knex) {
	return knex.schema
		.createTable('users', table => {
			table.increments(); // id
			table
				.string('username', 25)
				.notNullable()
				.unique();
			table.string('password', 255).notNullable();
		})
		.createTable('decks', table => {
			table.increments(); // id
			table.string('decks');
			table
				.integer('userId') // foreign key
				.references('id')
				.inTable('users')
				.notNullable(); // deck cannot exist without a user
				.onUpdate('CASCADE')
				.onDelete('CASCADE');
		});
};

exports.down = function(knex) {
	return knex.schema.dropTableIfExists('decks').dropTableIfExists('users');
};
