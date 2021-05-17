const {Router} = require("express");

const WordsGroups = require("../models/wordsGroups");

const router = Router();

router.get("/", (req, res) => {
	WordsGroups.find({}).then((wordsGroups) => {
		const groupsList = [];
		for (let i = 0; i < wordsGroups.length; i++) {
			groupsList.push({
				name: wordsGroups[i].name,
				date: wordsGroups[i].date,
				numberOfWords: wordsGroups[i].numberOfWords,
				id: wordsGroups[i].id || 1
			});
		}
		res.send(groupsList);
	});
});

router.post("/", (req, res) => {
	WordsGroups.create({
		name: req.body.name,
		date: req.body.date,
		numberOfWords: req.body.numberOfWords
	}).then((group) => {
		const newGroupObj = {
			name: group.name,
			date: group.date,
			numberOfWords: group.numberOfWords,
			id: group.id || 1
		};
		res.send(newGroupObj);
	});
});


module.exports = router;
