const pokemon = require('pokemontcgsdk');
const router = require('express').Router();

router.get('/allpokemon', async (req, res) => {
	sendPokemon = await pokemon.card
		.where({ setCode: 'base1' })
		.then(pokemon => {
			// console.log(pokemon);
			res.status(200).json(pokemon);
		})
		.catch(error => {
			console.log(error);
			res.status(500).json({ error: 'error getting pokemon' });
		});
	res.status(200).json(sendPokemon);
});

module.exports = router;
