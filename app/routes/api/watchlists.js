const express = require("express");
const asyncHandler = require("express-async-handler");

const { setTokenCookie, requireAuth } = require("../../utils/auth");
const { Watchlist, WatchlistEntry } = require("../../db/models");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");
const fetch = require("node-fetch");
const { validate_symbol } = require("../../utils/td_api");

const {
	get_all_watchlists,
	create_watchlist,
	update_watchlist,
	delete_watchlist,
	delete_symbol_watchlist,
	add_symbol_watchlist,
} = require("../../controllers/watchlistController");

const router = express.Router();

//ROUTE HANDLING
//GET all watchlists
router.get("/:userId", requireAuth, get_all_watchlists);

//POST ONE watchlists
router.post("/", requireAuth, create_watchlist);

//UPDATE ONE watchlists
router.put("/:id", requireAuth, update_watchlist);

//DELETE ONE watchlists
router.delete("/:id", requireAuth, delete_watchlist);

//DELETE symbol from watchlist
router.delete("/deleteSymbol/:id/:entryId", requireAuth, delete_symbol_watchlist);

//ADD symbol to watchlist
router.post("/addSymbol", requireAuth, add_symbol_watchlist);

//check for valid symbol
router.post(
	"/checkSymbol/",
	asyncHandler(async function (req, res) {
		const data = await validate_symbol(req.body.ticker);
		return res.json(data);
	})
);

module.exports = router;
