const {Router} = require("express");

const authMiddleware = require("../authMiddleware");
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
				id: wordsGroups[i].id || 1,
				user: wordsGroups[i].user
			});
		}
		res.send(groupsList);
	});
});

router.post("/", (req, res) => {
	WordsGroups.create({
		name: req.body.name,
		date: req.body.date,
		numberOfWords: req.body.numberOfWords,
		user: req.body.user
	}).then((group) => {
		const newGroupObj = {
			name: group.name,
			date: group.date,
			numberOfWords: group.numberOfWords,
			id: group.id || 1,
			user: group.user
		};
		res.send(newGroupObj);
	});
});


module.exports = router;
