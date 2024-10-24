const db = require("../db/queries");

async function typesGet(req, res) {
  const types = await db.getTypes();
  res.render("types/types", { types });
}

const singleTypeGet = (req, res) => {
  res.render("types/singleType");
};

const createTypeGet = (req, res) => {
  res.render("types/createType");
};

async function createTypePost(req, res) {
  const type = req.body.type;
  await db.createType(type);
  res.redirect("/types");
}

module.exports = {
  typesGet,
  singleTypeGet,
  createTypeGet,
  createTypePost,
};
