const express = require("express");
const asyncHandler = require("express-async-handler");

const { setTokenCookie, requireAuth } = require("../../utils/auth");
const { Portfolio, PortfolioEntry } = require("../../db/models");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");
const si = require("stock-info");

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
      include: [{ model: PortfolioEntry }],
    });

    // console.log("\n\n", portfolios, "\n\n");

    return res.json({
      portfolios,
    });
  })
);

//POST create portfolio
router.post(
  "/",
  asyncHandler(async (req, res) => {
    const port = await Portfolio.create(req.body);
    const found = await Portfolio.findOne({
      where: { id: port.id},
      include: [{ model: PortfolioEntry }]
    })
    return res.json(found);
  })
);

//UPDATE ONE portfolio
router.put(
  "/:id",
  asyncHandler(async function (req, res) {
    const id = req.params.id;
    const port = await Portfolio.findByPk(id);
    await port.update(req.body)
    const updatedport = await Portfolio.findOne({
      where: { id: id },
      include: [{ model: PortfolioEntry }]
    });
    return res.json(updatedport);
  })
);

//POST add sym to portfolio
router.post(
  "/transact/:portId",
  asyncHandler(async (req, res) => {
    // console.log("\n\n",req.body, "\n\n")
    const portId = req.params.portId

    const found = await PortfolioEntry.findOne({
      where: { portfolioId: req.body.portfolioId, symbol: req.body.symbol, },
      // raw: true,
    })
    if(!found) {
      const entry = await PortfolioEntry.create(req.body);
      const port = await Portfolio.findOne({
        where: { id: portId },
        include: [{ model: PortfolioEntry }]
      })
      return res.json(port);
    } else {
      const newAmount = parseInt(found.amount) + parseInt(req.body.amount)
      await found.update({ portfolioId: req.body.portfolioId, amount: newAmount, symbol: req.body.symbol });
      // console.log("\n\n", found, "\n\n")
      const port = await Portfolio.findOne({
        where: { id: portId },
        include: [{ model: PortfolioEntry }]
      })
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
    await Portfolio.destroy({where: {id: id}});
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
    port.map(stock => stockList.push(stock.symbol))
    const data = await si.getStocksInfo(stockList)

    updatedData = []
    data.map(stock => {
      const found = port.find(stk => stk.symbol === stock.symbol)
      updatedData.push({...stock, amount: found.amount})
    })
    console.log("\n\n", updatedData ,"\n\n");
    return res.json(updatedData);
  })
);


async function test (){
  // const test = await si.getStocksInfo(stockList)
  console.log("\n\n",test,"\n\n");
}


module.exports = router;
