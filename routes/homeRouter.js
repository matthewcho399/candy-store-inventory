const { Router } = require("express");
const controller = require("../controllers/homeController");
const homeRouter = Router();

homeRouter.get("/", controller.getHomeDetails);

module.exports = homeRouter;
