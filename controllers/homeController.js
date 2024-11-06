const db = require("../db/queries");

async function getHomeDetails(req, res) {
  const candyCount = await db.getCandyCount();
  res.render("index", { candyCount: candyCount[0] });
}

module.exports = {
  getHomeDetails,
};
