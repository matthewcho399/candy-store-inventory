const { Router } = require("express");
const controller = require("../controllers/candiesController");
const router = Router();

router.get("/", controller.candiesGet);

router.get("/create", controller.createCandyGet);
router.post("/create", controller.createCandyPost);

router.get("/update/:id", controller.updateCandyGet);
router.post("/update/:id", controller.updateCandyPost);

router.get("/delete/:id", controller.deleteCandy);

router.get("/:id", controller.candyDetailsGet);

module.exports = router;
