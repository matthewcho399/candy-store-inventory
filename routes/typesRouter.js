const { Router } = require("express");
const controller = require("../controllers/typesController");
const router = Router();

router.get("/", controller.typesGet);

router.get("/create", controller.createTypeGet);
router.post("/create", controller.createTypePost);

router.get("/:type", controller.singleTypeGet);

module.exports = router;
