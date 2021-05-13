const {Schema, model} = require("mongoose");

const schema = new Schema({
	englishWord: String,
	russianWord: String,
	partOfSpeech: String,
	groupId: String
});

module.exports = model("Words", schema);
