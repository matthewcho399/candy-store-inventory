const db = require("../db/queries");
const { body, validationResult } = require("express-validator");

const validStringErr =
  "can only contain letters, numbers, spaces, and special characters like &, ', and -";
const lengthErr = "must be between 1 and 20 characters";
const numberErr = "must only contain numbers";
const quantityErr = "must be between 0 and 999";
const decimalErr = "must be a valid price";
const priceErr = "must be between 0 and 300";

const validateCandy = [
  body("name")
    .trim()
    .matches(/^[a-zA-Z0-9 '&-]+$/)
    .withMessage(`Candy name ${validStringErr}`)
    .isLength({ min: 1, max: 20 })
    .withMessage(`Candy name ${lengthErr}`),
  body("company")
    .trim()
    .matches(/^[a-zA-Z0-9 '&-]+$/)
    .withMessage(`Company ${validStringErr}`)
    .isLength({ min: 1, max: 20 })
    .withMessage(`Company ${lengthErr}`),
  body("quantity")
    .trim()
    .isNumeric()
    .withMessage(`Quantity ${numberErr}`)
    .isInt({ min: 0, max: 999 })
    .withMessage(`Quantity ${quantityErr}`),
  body("price")
    .trim()
    .isAlphanumeric()
    .withMessage(`Price ${decimalErr}`)
    .isDecimal({ min: 0, max: 999 })
    .withMessage(`Price ${priceErr}`),
];

async function candiesGet(req, res) {
  const candies = await db.getCandies();
  res.render("candies/candies", { candies });
}

async function createCandyGet(req, res) {
  const types = await db.getTypes();
  res.render("candies/createCandy", { types });
}

const createCandyPost = [
  validateCandy,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const types = await db.getTypes();
      return res.status(400).render("candies/createCandy", {
        errors: errors.array(),
        types,
      });
    }
    console.log(req.body);
    const { name, company, quantity, price } = req.body;
    const types = req.body.types;
    console.log(types);
    res.redirect("/candies");
  },
];

module.exports = {
  candiesGet,
  createCandyGet,
  createCandyPost,
};
