const {Router} = require("express");

const WordsGroups = require("../models/wordsGroups");

const router = Router();

router.post("/", (req, res) => {
	WordsGroups.create({
		name: req.body.name,
		date: req.body.date,
		numberOfWords: req.body.numberOfWords
	}).then((group) => {
		const newGroupObj = {
			name: group.name,
			date: group.date,
			numberOfWords: group.numberOfWords
		};
		res.send(newGroupObj);
	});
});

module.exports = router;
