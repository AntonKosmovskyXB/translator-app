const bodyParser = require("body-parser");
const cors = require("cors");
const express = require("express");
const exphbs = require("express-handlebars");
const mongoose = require("mongoose");

const wordsRoute = require("./routes/words");
const wordsGroupsRoute = require("./routes/wordsGroups");


const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(cors());

app.engine("html", exphbs());
app.set("view engine", "html");
app.use(express.static(`${__dirname}/public`));

app.use("/wordsGroups", wordsGroupsRoute);
app.use("/words", wordsRoute);

mongoose.connect("mongodb+srv://tonykosmos:SergiRoberto20@cluster0.vgux3.mongodb.net/Translator", {useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: false});
app.listen(3000);

