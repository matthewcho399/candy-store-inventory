const candies = [
  {
    id: 0,
    name: "Twix",
    type: ["chocolate", "caramel"],
    company: "Mars",
    price: "2.50",
    quantity: 15,
  },
  {
    id: 1,
    name: "Gummy Bear",
    type: ["gummy"],
    company: "Albanese",
    price: "4.99",
    quantity: 20,
  },
  {
    id: 2,
    name: "M&M",
    type: ["chocholate"],
    company: "M&M",
    price: "2.99",
    quantity: 50,
  },
];

const candiesGet = (req, res) => {
  res.render("candies/candies", { candies });
};

const createCandyGet = (req, res) => {
  res.render("candies/createCandy");
};

module.exports = {
  candiesGet,
  createCandyGet,
};
