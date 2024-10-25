const pool = require("./pool");

async function getCandies() {
  const { rows } = await pool.query(
    " SELECT candies.id AS id, candies.name AS name, candies.company, candies.quantity, candies.price, array_agg(types.type) AS types FROM candies JOIN candy_types ON candies.id = candy_types.candy_id JOIN types ON candy_types.type_id = types.id GROUP BY candies.id, candies.name, candies.company, candies.quantity, candies.price;"
  );
  return rows;
}

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
  getCandies,
  getTypes,
  getTypeByName,
  createType,
};
