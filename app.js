const express = require("express");
const app = express();
const path = require("node:path");
const homeRouter = require("./routes/homeRouter");
const candiesRouter = require("./routes/candiesRouter");
const typesRouter = require("./routes/typesRouter");
const assetsPath = path.join(__dirname, "public");
const PORT = process.env.PORT || 5000;

app.use(express.urlencoded({ extended: true }));
app.use(express.static(assetsPath));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use("/", homeRouter);
app.use("/candies", candiesRouter);
app.use("/types", typesRouter);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
