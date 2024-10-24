const db = require("../db/queries");

const typesGet = (req, res) => {
  const types = [
    {
      id: 0,
      name: "chocolate",
    },
    {
      id: 1,
      name: "gummy",
    },
    {
      id: 2,
      name: "sour",
    },
    {
      id: 3,
      name: "caramel",
    },
  ];
  res.render("types/types", { types });
};

const singleTypeGet = (req, res) => {
  res.render("types/singleType");
};

const createTypeGet = (req, res) => {
  res.render("types/createType");
};

const createTypePost = (req, res) => {
  console.log(req.body);
  res.redirect("/types");
};

module.exports = {
  typesGet,
  singleTypeGet,
  createTypeGet,
  createTypePost,
};
