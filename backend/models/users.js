const {Schema, model} = require("mongoose");

const User = new Schema({
	username: {type: String, unique: true},
	password: String,
	email: String
});

module.exports = model("User", User);
