const pool = require("./pool");

async function getCandies() {
  const { rows } = await pool.query(
    "SELECT candies.id AS id, candies.name AS name, candies.company, candies.quantity, candies.price, COALESCE(array_agg(types.type), '{}') AS types FROM candies LEFT JOIN candy_types ON candies.id = candy_types.candy_id LEFT JOIN types ON candy_types.type_id = types.id GROUP BY candies.id, candies.name, candies.company, candies.quantity, candies.price;"
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

async function createCandy(name, company, quantity, price) {
  const candy = await pool.query(
    "INSERT INTO candies ( name, company, quantity, price ) VALUES ($1, $2, $3, $4) RETURNING id",
    [name, company, quantity, price]
  );
  console.log("candy query", candy.rows[0].id);
  return candy.rows[0].id;
}

async function createType(type) {
  await pool.query("INSERT INTO types (type) VALUES ($1)", [type]);
}

async function linkCandyToType(candyId, typeId) {
  console.log("candyid and typeid from query", candyId, typeId);
  await pool.query(
    "INSERT INTO candy_types (candy_id, type_id) VALUES ($1, $2)",
    [candyId, typeId]
  );
}

module.exports = {
  getCandies,
  getTypes,
  getTypeByName,
  createCandy,
  createType,
  linkCandyToType,
};
