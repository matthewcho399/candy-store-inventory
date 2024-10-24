const pool = require("./pool");

async function getTypes() {
  const { rows } = await pool.query("SELECT * FROM types");
  return rows;
}

async function createType(type) {
  await pool.query("INSERT INTO types (type) VALUES ($1)", [type]);
}

module.exports = {
  getTypes,
  createType,
};
