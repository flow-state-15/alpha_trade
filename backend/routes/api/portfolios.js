const express = require("express");
const asyncHandler = require("express-async-handler");
const axios = require('axios')
const { setTokenCookie, requireAuth } = require("../../utils/auth");
const { Portfolio, PortfolioEntry } = require("../../db/models");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");
// const si = require("stock-info");
const fetch = require("node-fetch");
const { get_multiple, symbols_from_portfolios } = require("../../utils/td_api");
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
      include: [{
        model: PortfolioEntry,
        as: 'symbols'
      }],
      // raw: true,
      // nest: true
      // nest: true,
      // plain: true
    });
    const syms = await symbols_from_portfolios(portfolios)
    console.log("\n\n all_symbols: ", syms, "\n\n");
    // console.log("\n\nportfolios: ", portfolios, "\n\n")
    let normalized = {};
    let portValue = 0;
    for (let port of portfolios) {
      // const entries = await PortfolioEntry.findAll({
      //   where: { portfolioId: port.id },
      // });
      if (port.symbols && port.symbols.length) {
        const portList = [];
        port.symbols.forEach((entry) => {
          portList.push(entry.symbol);
        });

        // const raw = await axios.get(`https://api.tdameritrade.com/v1/marketdata/quotes?apikey=${process.env.API_KEY}&symbol=${syms.join("%2C")}`)

        // const data = raw.data

        // console.log("\n\n data: ", data, '\n\n' )
        
        port.symbols.forEach((entry, i) => {
          port.symbols[i] = {...entry.dataValues, ...raw.data[entry.symbol]}
          portValue += parseInt(raw.data[entry.symbol].mark) * parseInt(entry.amount)
        })

        normalized[port.id] = {
          ...port.dataValues,
          portData: port.symbols,
          value: portValue,
        };
        continue;
      } else {
        normalized[port.id] = {
          ...port,
          portData: {},
          value: portValue,
        };
      }
    }
    
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
    const port = await Portfolio.findByPk(id);
    await port.update(req.body);
    const updatedport = await Portfolio.findOne({
      where: { id: id },
      include: [{ model: PortfolioEntry, as: 'symbols' }],
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
        include: [{ model: PortfolioEntry, as: 'symbols' }],
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
      const port = await Portfolio.findOne({
        where: { id: portId },
        include: [{ model: PortfolioEntry, as: "symbols" }],
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
    const td_api_data = get_multiple(stockList)
    console.log('\n\n', 'td_api_data: ', td_api_data, '\n\n')
    // const data = await si.getStocksInfo(stockList);

    updatedData = [];
    data.map((stock) => {
      const found = port.find((stk) => stk.symbol === stock.symbol);
      updatedData.push({ ...stock, amount: found.amount });
    });
    return res.json(updatedData);
  })
);

//GET options chain data
router.post(
  "/optionsChain/:sym",
  asyncHandler(async (req, res) => {
    const form = req.body;

    const response = await fetch(
      `https://api.tdameritrade.com/v1/marketdata/chains?apikey=${process.env.API_KEY}&symbol=${form.symbol}&contractType=ALL&strikeCount=30&includeQuotes=TRUE&strategy=SINGLE&range=ALL&optionType=ALL HTTP/1.1`
    );

    const data = await response.json();

    return res.json(data);
  })
);

module.exports = router;
