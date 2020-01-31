const router = require('express').Router();
const Decks = require('./deck_model');

//gets one user object
router.get('/decks/:id', (req, res) => {
	const id = req.params.id;
	Decks.findUserBy(id)
		.then(user => {
			const username = user.username;
			const id = user.id;
			console.log(user);
			Decks.findUserDecks(id)
				.then(decks => {
					// console.log(favorites)
					const userDecks = decks.map(deck => {
						return {
							id: deck.id,
							decks: deck.decks,
						};
					});
					res.status(200).json({ id, username, decks: userDecks });
				})
				.catch(err => {
					console.log(err);
					res.status(500).json(err);
				});
		})
		.catch(err => {
			console.log(err);
			res.status(500).json(err);
		});
});

//adds new deck
router.post('/deck/:id', (req, res) => {
	deckData = { ...req.body, userId: req.params.id };
	const id = req.params.id;
	Decks.findUserBy(id)
		.then(user => {
			Decks.addDeck(deckData)
				.then(newDeck => {
					Decks.findUserDecks(id).then(decks => {
						const userDecks = decks.map(deck => {
							console.log(deck);
							return {
								id: deck.id,
								decks: deck.decks,
								// notes: fav.notes,
							};
						});
						res.status(201).json({ decks: userDecks });
					});
				})
				.catch(err => {
					console.log(err);
					res.status(500).json(err);
				});
		})
		.catch(err => {
			console.log(err, 'this one');
			res.status(500).json({ message: 'Failed to add new favorite' });
		});
});
module.exports = router;
