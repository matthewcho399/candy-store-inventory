const { Router } = require("express");
const controller = require("../controllers/typesController");
const router = Router();

router.get("/", controller.typesGet);
router.get("/:candy", controller.singleTypeGet);
router.get("/create", controller.createTypeGet);

module.exports = router;
