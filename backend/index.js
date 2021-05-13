const cors = require("cors");
const express = require("express");
const exphbs = require("express-handlebars");
const mongoose = require("mongoose");

const mainRoute = require("./routes/mainRoute");
const wordsGroupsRoute = require("./routes/wordsGroups");

const app = express();

app.use(cors());

app.engine("html", exphbs());
app.set("view engine", "html");
app.use(express.static(`${__dirname}/public`));

app.use("/", mainRoute);
app.use("/wordGroups", wordsGroupsRoute);

mongoose.connect("mongodb+srv://tonykosmos:SergiRoberto20@cluster0.vgux3.mongodb.net/Translator", {useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: false});

app.listen(3000);
