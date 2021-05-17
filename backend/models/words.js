const {Schema, model} = require("mongoose");

const schema = new Schema({
	englishWord: String,
	russianWord: String,
	partOfSpeech: String,
	groupId: Number
});

module.exports = model("Words", schema);
