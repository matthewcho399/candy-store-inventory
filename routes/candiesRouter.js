const { Router } = require("express");
const controller = require("../controllers/candiesController");
const router = Router();

router.get("/", controller.candiesGet);

router.get("/create", controller.createCandyGet);
router.post("/create", controller.createCandyPost);

module.exports = router;
