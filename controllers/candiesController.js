const db = require("../db/queries");

async function candiesGet(req, res) {
  const candies = await db.getCandies();
  res.render("candies/candies", { candies });
}

const createCandyGet = (req, res) => {
  res.render("candies/createCandy");
};

module.exports = {
  candiesGet,
  createCandyGet,
};
