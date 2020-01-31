const router = require('express').Router();
const Decks = require('./deck_model');

//gets one user object
router.get('/deck/:id', (req, res) => {
	const id = req.params.id;
	Decks.findUserBy(id)
		.then(user => {
			// console.log(user);
			const username = user.username;
			const id = user.id;
			Decks.findUserDecks(id)
				.then(deck => {
					// console.log(decks);
					const userDeck = deck.map(deck => {
						console.log(deck);
						return {
							id: deck.id,
							deck: deck.deck,
						};
					});
					res.status(200).json({ id, username, deck: userDeck });
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
	cardData = { ...req.body, userId: req.params.id };
	const id = req.params.id;
	Decks.findUserBy(id)
		.then(user => {
			Decks.addToDeck(cardData)
				.then(newDeck => {
					Decks.findUserDecks(id).then(decks => {
						const userDecks = decks.map(deck => {
							console.log(deck);
							return {
								id: deck.id,
								deck: deck.deck,
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

// router.post('/deck/:id', (req, res) => {
// 	card = req.body;
// 	Decks.addToDeck(card)
// 		.then(newlyAddedCard => {
// 			console.log(newlyAddedCard);
// 			res.status(201).json(card);
// 		})
// 		.catch(err => {
// 			console.log(err);
// 			res.status(500).json({ message: 'Failed to add card to server' });
// 		});
// });

module.exports = router;
