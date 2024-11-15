const db = require("../db/queries");
const { body, validationResult } = require("express-validator");

const validStringErr =
  "can only contain letters, numbers, spaces, and special characters like &, ', and -";
const lengthErr = "must be between 1 and 20 characters";
const numberErr = "must only contain numbers";
const quantityErr = "must be between 0 and 999";
const decimalErr = "Price must be a number with up to two decimal places";
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
    .matches(/^\d+(\.\d{1,2})?$/)
    .withMessage(decimalErr)
    .isFloat({ min: 0, max: 300 })
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
    const types = await db.getTypes();
    if (!errors.isEmpty()) {
      return res.status(400).render("candies/createCandy", {
        errors: errors.array(),
        types,
      });
    }
    const { name, company, quantity, price, image_url } = req.body;
    const candyTypes = req.body.types;
    const candyId = await db.createCandy(
      name,
      company,
      quantity,
      price,
      image_url
    );
    const typeIds = extractTypeIds(types, candyTypes);

    linkCandyToType(candyId, typeIds);

    res.redirect("/candies");
  },
];

async function candyDetailsGet(req, res) {
  const candyDetails = await db.getCandyDetails(req.params.id);
  res.render("candies/candyDetails", { candyDetails: candyDetails[0] });
}

async function updateCandyGet(req, res) {
  const candyDetails = await db.getCandyDetails(req.params.id);
  const types = await db.getTypes();
  res.render("candies/updateCandy", { candy: candyDetails[0], types: types });
}

const updateCandyPost = [
  validateCandy,
  async (req, res) => {
    const errors = validationResult(req);
    const candyDetails = await db.getCandyDetails(req.params.id);
    const types = await db.getTypes();
    if (!errors.isEmpty()) {
      return res.status(400).render("candies/updateCandy", {
        errors: errors.array(),
        candy: candyDetails[0],
        types,
      });
    }
    const id = req.params.id;
    const { name, company, quantity, price, image_url } = req.body;
    const candyTypes = req.body.types;
    await db.updateCandy(id, name, company, quantity, price, image_url);
    const typeIds = extractTypeIds(types, candyTypes);

    updateCandyTypeLink(id, typeIds);

    res.redirect("/candies");
  },
];

async function deleteCandy(req, res) {
  const candyId = req.params.id;
  await db.deleteCandy(candyId);
  res.redirect("/candies");
}

const extractTypeIds = (types, candyTypes) => {
  const typeIds = [];
  if (!Array.isArray(candyTypes)) {
    candyTypes = candyTypes.split();
  }
  for (const candyType of candyTypes) {
    for (const type of types) {
      if (candyType === type.type) {
        typeIds.push(type.id);
      }
    }
  }
  return typeIds;
};

async function linkCandyToType(candyId, typeIds) {
  for (const id of typeIds) {
    await db.linkCandyToType(candyId, id);
  }
}

async function updateCandyTypeLink(candyId, typeIds) {
  await db.deleteCandyTypes(candyId);
  for (const id of typeIds) {
    await db.linkCandyToType(candyId, id);
  }
}

module.exports = {
  candiesGet,
  createCandyGet,
  createCandyPost,
  candyDetailsGet,
  updateCandyGet,
  updateCandyPost,
  deleteCandy,
};
