const {Router} = require("express");

const authMiddleware = require("../authMiddleware");
const Words = require("../models/words");

const router = Router();

router.get("/", authMiddleware, (req, res) => {
	Words.find({}).then((wordsGroups) => {
		const wordsList = [];
		for (let i = 0; i < wordsGroups.length; i++) {
			wordsList.push({
				englishWord: wordsGroups[i].englishWord,
				russianWord: wordsGroups[i].russianWord,
				partOfSpeech: wordsGroups[i].partOfSpeech,
				groupId: wordsGroups[i].groupId,
				user: wordsGroups[i].user
			});
		}
		res.send(wordsList);
	});
});

router.post("/", (req, res) => {
	Words.create({
		englishWord: req.body.englishWord,
		russianWord: req.body.russianWord,
		partOfSpeech: req.body.partOfSpeech,
		groupId: req.body.groupId,
		user: req.body.user
	}).then((word) => {
		const newWordObj = {
			englishWord: word.englishWord,
			russianWord: word.russianWord,
			partOfSpeech: word.partOfSpeech,
			groupId: word.groupId,
			user: word.user
		};
		res.send(newWordObj);
	});
});


module.exports = router;
