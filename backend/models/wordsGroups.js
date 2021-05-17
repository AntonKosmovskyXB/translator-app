const mongoose = require("mongoose");
const autoIncrement = require("mongoose-auto-increment");

const Schema = mongoose.Schema;

const connection = mongoose.createConnection("mongodb+srv://tonykosmos:SergiRoberto20@cluster0.vgux3.mongodb.net/Translator");

autoIncrement.initialize(connection);

const schema = new Schema({
	name: String,
	date: String,
	numberOfWords: Number,
	id: Number
});

schema.plugin(autoIncrement.plugin, {model: "WordsGroups", field: "id"});
module.exports = connection.model("WordsGroups", schema);
