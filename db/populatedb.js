const { Client } = require("pg");
require("dotenv").config();
const { argv } = require("node:process");

const SQL = `
CREATE TABLE IF NOT EXISTS candies (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name VARCHAR (25),
    company VARCHAR (25),
    quantity INTEGER,
    price DECIMAL
);

INSERT INTO candies (name, company, quantity, price)
VALUES
    ('Twix', 'Mars', 5, 2.99),
    ('Sour Gummy Worms', 'Trolli', 30, 3.50),
    ('Gummy Bears', 'Albanese', 10, 6.99),
    ('M&Ms', 'M&M', 50, 1.99);

CREATE TABLE IF NOT EXISTS types (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    type VARCHAR (20) NOT NULL
);

INSERT INTO types (type)
VALUES
    ('chocolate'),
    ('caramel'),
    ('gummy'),
    ('sour');

CREATE TABLE IF NOT EXISTS candy_types (
    candy_id INTEGER,
    type_id INTEGER
);

INSERT INTO candy_types (candy_id, type_id)
VALUES
    (1, 1),
    (1, 2),
    (2, 3),
    (2, 4),
    (3, 3),
    (4, 1);
`;

async function main() {
  console.log("seeding...");
  const client = new Client({
    connectionString: argv[2],
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("done");
}

main();
