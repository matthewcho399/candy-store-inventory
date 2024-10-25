const pool = require("./pool");

async function getTypes() {
  const { rows } = await pool.query("SELECT * FROM types");
  return rows;
}

async function getTypeByName(type) {
  const { rows } = await pool.query("SELECT * FROM types WHERE type = $1", [
    type,
  ]);
  return rows[0];
}

async function createType(type) {
  await pool.query("INSERT INTO types (type) VALUES ($1)", [type]);
}

module.exports = {
  getTypes,
  getTypeByName,
  createType,
};
