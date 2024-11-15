const { Client } = require("pg");
require("dotenv").config();
const { argv } = require("node:process");

const SQL = `
CREATE TABLE IF NOT EXISTS candies (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name VARCHAR (25),
    company VARCHAR (25),
    quantity INTEGER,
    price DECIMAL,
    image_url VARCHAR (255)
);

INSERT INTO candies (name, company, quantity, price, image_url)
VALUES
    ('Twix', 'Mars', 5, 2.99, 'https://i5.walmartimages.com/seo/Twix-Caramel-Full-Size-Chocolate-Cookie-Candy-Bars-1-79-oz-Bar_e0581047-983d-48de-8e1b-da7ccd82209f.95ab125cd47927ae2915c1c26540e7b9.jpeg?odnHeight=768&odnWidth=768&odnBg=FFFFFF'),
    ('Sour Gummy Worms', 'Trolli', 30, 3.50, 'https://m.media-amazon.com/images/I/81v2juMQZuL._AC_UF894,1000_QL80_.jpg'),
    ('Gummy Bears', 'Albanese', 10, 6.99, 'https://cdn11.bigcommerce.com/s-riqk6cih6h/images/stencil/1280x1280/products/534/1982/_0009_53348-2021-12-Flavor-Gummi-Bears-7.5oz-Bag__23227.1656534346.png?c=1'),
    ('M&Ms', 'M&M', 50, 1.99, 'https://m.media-amazon.com/images/I/51wYGW6fX2L._AC_UF894,1000_QL80_.jpg');

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
