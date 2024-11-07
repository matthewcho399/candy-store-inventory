const db = require("../db/queries");
const { body, validationResult } = require("express-validator");

const alphaErr = "must only contain letters";
const lengthErr = "must be between 1 and 20 characters";
const duplicateErr = "Type already exists";

const validateType = [
  body("type")
    .trim()
    .isAlpha()
    .withMessage(`Type ${alphaErr}`)
    .isLength({ min: 1, max: 20 })
    .withMessage(`Type ${lengthErr}`)
    .custom(async (type) => {
      const exists = await db.getTypeByName(type);
      if (exists) {
        return Promise.reject(duplicateErr);
      }
    }),
];

async function typesGet(req, res) {
  const types = await db.getTypes();
  res.render("types/types", { types });
}

async function singleTypeGet(req, res) {
  const typeName = req.params.type;
  const candies = await db.getCandiesByType(typeName);
  const type = await db.getTypeByName(typeName);
  res.render("types/singleType", { candies, type });
}

const createTypeGet = (req, res) => {
  res.render("types/createType");
};

const createTypePost = [
  validateType,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("types/createType", {
        errors: errors.array(),
      });
    }
    const type = req.body.type;
    await db.createType(type);
    res.redirect("/types");
  },
];

async function deleteType(req, res) {
  await db.deleteType(req.params.id);
  res.redirect("/types");
}

module.exports = {
  typesGet,
  singleTypeGet,
  createTypeGet,
  createTypePost,
  deleteType,
};
