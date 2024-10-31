const { Router } = require("express");
const controller = require("../controllers/candiesController");
const router = Router();

router.get("/", controller.candiesGet);

router.get("/create", controller.createCandyGet);
router.post("/create", controller.createCandyPost);

router.get("/:id", controller.candyDetailsGet);

module.exports = router;
