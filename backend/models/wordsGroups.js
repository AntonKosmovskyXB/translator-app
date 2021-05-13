const {Schema, model} = require("mongoose");

const schema = new Schema({
	name: String,
	date: String,
	numberOfWords: String
});

module.exports = model("WordsGroups", schema);
