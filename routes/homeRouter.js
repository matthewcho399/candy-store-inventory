const { Router } = require("express");
const homeController = require("../controllers/homeController");
const homeRouter = Router();

homeRouter.get("/", (req, res) => res.render("index"));

module.exports = homeRouter;
