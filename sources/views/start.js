export default {
	template: "Start page", css: "webix_shadow_medium app_start"
};

/* const express = require("express");
const exphbs = require("express-handlebars");
const mongoose = require("mongoose");

const wordsRoute = require("./routes/words");

const app = express();

app.engine("html", exphbs());
app.set("view engine", "html");
app.use(express.static(`${__dirname}/public`));
app.set("views", `${__dirname}/public/views`);

app.use(wordsRoute);

mongoose.connect("mongodb+srv://tonykosmos:SergiRoberto20@cluster0.vgux3.mongodb.net/words", {
	useNewUrlParser: true,
	useFindAndModify: false
});


app.get("/", (req, res) => {
	res.send("Hi");
});

app.listen(3000); */

/*
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userScheme = new Schema({
	name: String,
	age: Number
});

mongoose.connect("mongodb+srv://tonykosmos:SergiRoberto20@cluster0.vgux3.mongodb.net/Translator", {useUnifiedTopology: true, useNewUrlParser: true});

const User = mongoose.model("User", userScheme);
const user = new User({
	name: "Billy",
	age: 44
});

user.save((err) => {
	mongoose.disconnect();  // отключение от базы данных

	if (err) return console.log(err);
	console.log("Сохранен объект", user);
});
*/
