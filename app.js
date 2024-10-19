const express = require("express");
const app = express();
const path = require("node:path");
const PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.get("/", (req, res) => res.send("Hello, world!"));

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
