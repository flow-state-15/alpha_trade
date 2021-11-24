const express = require("express");
const asyncHandler = require("express-async-handler");

const { setTokenCookie, requireAuth } = require("../../utils/auth");
const { Portfolio, PortfolioEntry } = require("../../db/models");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");
const si = require("stock-info");
const fetch = require('node-fetch');
// import fetch from 'node-fetch';

const router = express.Router();

// const validateSignup = [
//   check("email")
//     .exists({ checkFalsy: true })
//     .isEmail()
//     .withMessage("Please provide a valid email."),
//   check("username")
//     .exists({ checkFalsy: true })
//     .isLength({ min: 4 })
//     .withMessage("Please provide a username with at least 4 characters."),
//   check("username").not().isEmail().withMessage("Username cannot be an email."),
//   check("password")
//     .exists({ checkFalsy: true })
//     .isLength({ min: 6 })
//     .withMessage("Password must be 6 characters or more."),
//   handleValidationErrors,
// ];

//ROUTE HANDLING
//GET all portfolios
router.get(
  "/:userId",
  asyncHandler(async (req, res) => {
    const userId = req.params.userId;
    const portfolios = await Portfolio.findAll({
      where: { userId: userId },
      // include: [{ model: PortfolioEntry }],
      raw: true,
      // nest: true,
    });

    // console.log("\n\n", portfolios, "\n\n");

    // return res.json({
    //   portfolios,
    // });
    let normalized = {};
    for (let port of portfolios) {
      const entries = await PortfolioEntry.findAll({
        where: { portfolioId: port.id },
      });
      const portList = [];
      entries.forEach((entry) => {
        portList.push(entry.symbol);
      });
      // console.log("\n\n portlist", portList, "\n\n");
      if (portList.length) {
        const data = await si.getStocksInfo(portList);
        updatedData = {};
        data.map((stock) => {
          const found = entries.find((stk) => stk.symbol === stock.symbol);
          updatedData[stock.symbol] = { ...stock, amount: found.amount };
        });
        let portValue = 0;
        Object.values(updatedData).forEach( obj => portValue += parseInt(obj.ask) * parseInt(obj.amount))
        normalized[port.id] = {
          ...port,
          portData: updatedData,
          value: portValue,
        };
        // console.log("\n\n normalized 1", normalized, "\n\n");
        continue;
      } else {
        normalized[port.id] = {
          ...port,
          portData: {},
        };
        // console.log("\n\n else normalized 2", normalized, "\n\n");
      }
    }
    // console.log("\n\n final normalized", normalized, "\n\n");

    return res.json(normalized);
  })
);

//POST create portfolio
router.post(
  "/",
  asyncHandler(async (req, res) => {
    const port = await Portfolio.create(req.body);
    const found = await Portfolio.findOne({
      where: { id: port.id },
      include: [{ model: PortfolioEntry }],
    });
    return res.json(found);
  })
);

//UPDATE ONE portfolio
router.put(
  "/:id",
  asyncHandler(async function (req, res) {
    const id = req.params.id;
    // console.log("\n\n in put /:id, req.params.id, req body:", req.params.id, req.body, "\n\n")
    const port = await Portfolio.findByPk(id);
    await port.update(req.body);
    const updatedport = await Portfolio.findOne({
      where: { id: id },
      include: [{ model: PortfolioEntry }],
    });
    return res.json(updatedport);
  })
);

//POST add sym to portfolio
router.post(
  "/transact/:portId",
  asyncHandler(async (req, res) => {

    const portId = req.params.portId;

    const found = await PortfolioEntry.findOne({
      where: { portfolioId: req.body.portfolioId, symbol: req.body.symbol },
      // raw: true,
    });
    if (!found) {
      const entry = await PortfolioEntry.create(req.body);
      const port = await Portfolio.findOne({
        where: { id: portId },
        include: [{ model: PortfolioEntry }],
      });
      return res.json(port);

    } else {

      if (req.body.amount === 0) {
        await PortfolioEntry.destroy({
          where: { portfolioId: req.body.portfolioId, symbol: req.body.symbol },
        });
      } else {
        await found.update({
          amount: req.body.amount,
        });
      }
      // console.log("\n\n", found, "\n\n")
      const port = await Portfolio.findOne({
        where: { id: portId },
        include: [{ model: PortfolioEntry }],
      });

      return res.json(port);
    }
  })
);

//DELETE ONE portfolio
router.delete(
  "/:id",
  asyncHandler(async function (req, res) {
    const id = req.params.id;
    const port = await Portfolio.findByPk(id);
    if (!port) throw new Error("Cannot find portfolio to delete");
    await Portfolio.destroy({ where: { id: id } });
    return res.json(port);
  })
);

//POST call portfolio prices
router.get(
  "/portData/:userId/:portId",
  asyncHandler(async (req, res) => {
    const { userId, portId } = req.params;
    const port = await PortfolioEntry.findAll({
      where: { portfolioId: portId },
      raw: true,
      nest: true,
    });
    const stockList = [];
    port.map((stock) => stockList.push(stock.symbol));
    const data = await si.getStocksInfo(stockList);

    updatedData = [];
    data.map((stock) => {
      const found = port.find((stk) => stk.symbol === stock.symbol);
      updatedData.push({ ...stock, amount: found.amount });
    });
    console.log("\n\n", updatedData, "\n\n");
    return res.json(updatedData);
  })
);

//GET options chain data
router.post(
  "/optionsChain/:sym",
  asyncHandler(async (req, res) => {
    const form = req.body;

    console.log("\n\n in options route, form: ", form, "\n\n")

    const response = await fetch(`https://api.tdameritrade.com/v1/marketdata/chains?apikey=${process.env.API_KEY}&symbol=${form.symbol}&contractType=ALL&strikeCount=2&includeQuotes=TRUE&strategy=SINGLE&range=ALL&optionType=ALL HTTP/1.1`)

    const data = await response.json()

    // console.log("dispatched fetch to tdameritrade, data: ", data)

    return res.json(data);
  })
);

async function test() {
  // const test = await si.getStocksInfo(stockList)
  console.log("\n\n", test, "\n\n");
}

module.exports = router;
