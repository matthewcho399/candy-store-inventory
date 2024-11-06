const pool = require("./pool");

async function getCandies() {
  const { rows } = await pool.query(
    `SELECT candies.id AS id, 
            candies.name AS name, 
            candies.company, 
            candies.quantity, 
            candies.price, 
            COALESCE(array_agg(types.type), '{}') 
            AS types 
    FROM candies 
    LEFT JOIN candy_types ON candies.id = candy_types.candy_id 
    LEFT JOIN types ON candy_types.type_id = types.id 
    GROUP BY candies.id, candies.name, candies.company, candies.quantity, candies.price;`
  );
  return rows;
}

async function getTypes() {
  const { rows } = await pool.query("SELECT * FROM types;");
  return rows;
}

async function getTypeByName(type) {
  const { rows } = await pool.query("SELECT * FROM types WHERE type = $1;", [
    type,
  ]);
  return rows[0];
}

async function createCandy(name, company, quantity, price) {
  const candy = await pool.query(
    "INSERT INTO candies ( name, company, quantity, price ) VALUES ($1, $2, $3, $4) RETURNING id;",
    [name, company, quantity, price]
  );
  return candy.rows[0].id;
}

async function createType(type) {
  await pool.query("INSERT INTO types (type) VALUES ($1);", [type]);
}

async function linkCandyToType(candyId, typeId) {
  await pool.query(
    "INSERT INTO candy_types (candy_id, type_id) VALUES ($1, $2);",
    [candyId, typeId]
  );
}

async function getCandyDetails(id) {
  const { rows } = await pool.query(
    `SELECT candies.id AS id, 
            candies.name AS name, 
            candies.company, 
            candies.quantity, 
            candies.price,  
            COALESCE(array_agg(types.type), '{}') AS types
    FROM candies 
    LEFT JOIN candy_types ON candies.id = candy_types.candy_id 
    LEFT JOIN types ON candy_types.type_id = types.id 
    WHERE candies.id = $1 
    GROUP BY candies.id, candies.name, candies.company, candies.quantity, candies.price;`,
    [id]
  );
  return rows;
}

async function getCandiesByType(type) {
  const { rows } = await pool.query(
    `SELECT candies.id AS id, 
            candies.name AS name, 
            candies.company, 
            candies.quantity, 
            candies.price, 
            COALESCE(array_agg(types.type), '{}') AS types
     FROM candies
     JOIN candy_types ON candies.id = candy_types.candy_id
     JOIN types ON candy_types.type_id = types.id
     WHERE types.type = $1
     GROUP BY candies.id, candies.name, candies.company, candies.quantity, candies.price;`,
    [type]
  );
  return rows;
}

async function updateCandy(id, name, company, quantity, price) {
  await pool.query(
    `UPDATE candies 
    SET name = $2, company = $3, quantity = $4, price = $5
    WHERE id = $1;`,
    [id, name, company, quantity, price]
  );
}

async function deleteCandy(candyId) {
  await pool.query("DELETE FROM candies WHERE id = $1;", [candyId]);
  await deleteCandyTypes(candyId);
}

async function deleteCandyTypes(candyId) {
  await pool.query("DELETE FROM candy_types WHERE candy_id = $1;", [candyId]);
}

module.exports = {
  getCandies,
  getTypes,
  getTypeByName,
  createCandy,
  createType,
  linkCandyToType,
  getCandyDetails,
  getCandiesByType,
  updateCandy,
  deleteCandy,
  deleteCandyTypes,
};
