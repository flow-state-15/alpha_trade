const express = require("express");
const asyncHandler = require("express-async-handler");
const axios = require("axios");
const { setTokenCookie, requireAuth } = require("../../utils/auth");
const { Portfolio, PortfolioEntry } = require("../../db/models");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");
const fetch = require("node-fetch");
const {
	get_multiple,
	symbols_from_portfolios,
	option_data,
} = require("../../utils/td_api");
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
router.post("/optionsChain/:sym", option_data);

module.exports = router;
