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

const typesGet = (req, res) => {
  res.render("types/types", { types });
};

const singleTypeGet = (req, res) => {
  res.render("types/singleType");
};

const createTypeGet = (req, res) => {
  res.render("types/createType");
};

module.exports = {
  typesGet,
  singleTypeGet,
  createTypeGet,
};
