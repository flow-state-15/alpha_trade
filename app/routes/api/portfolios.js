const express = require("express");
const asyncHandler = require("express-async-handler");
const { requireAuth } = require("../../utils/auth");
const { option_data } = require("../../utils/td_api");
const {
	userPortfolios,
	delete_portfolio,
	update_portfolio,
	create_portfolio,
	portfolio_add_sym,
	single_portfolio_sym_data,
} = require("../../controllers/portfolioController");

const router = express.Router();

//ROUTE HANDLING
//GET all portfolios
router.get("/:userId", requireAuth, userPortfolios);

//POST create portfolio
router.post("/", create_portfolio);

//UPDATE ONE portfolio
router.put("/:id", update_portfolio);

//POST add sym to portfolio
router.post("/transact/:portId", portfolio_add_sym);

//DELETE ONE portfolio
router.delete("/:id", delete_portfolio);

//POST call portfolio prices
router.get("/portData/:userId/:portId", single_portfolio_sym_data);

//GET options chain data
router.post(
	"/optionsChain/:sym",
	asyncHandler(async (req, res) => {
		const data = await option_data(req.body.symbol);
		return res.json(data);
	})
);

module.exports = router;
