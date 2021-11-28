const express = require("express");
const asyncHandler = require("express-async-handler");

const { setTokenCookie, requireAuth } = require("../../utils/auth");
const { Watchlist, WatchlistEntry } = require("../../db/models");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");
const fetch = require('node-fetch');

const router = express.Router();

//ROUTE HANDLING
//GET all watchlists
router.get(
  "/:userId",
  asyncHandler(async (req, res) => {
    const userId = req.params.userId;
    const watchlists = await Watchlist.findAll({
      where: { userId: userId },
      include: [{ model: WatchlistEntry }]
    });
    return res.json({
      watchlists,
    });
  })
);

//POST ONE watchlists
router.post(
  "/",
  asyncHandler(async(req, res) => {
    const wl = await Watchlist.create(req.body);
    return res.json(wl);
  })
);



//UPDATE ONE watchlists
router.put(
  "/:id",
  asyncHandler(async function (req, res) {
    const id = req.params.id;
    const wl = await Watchlist.findByPk(id);
    await wl.update(req.body)
    const findwl = await Watchlist.findOne({
      where: { id: id },
      include: [{ model: WatchlistEntry }]
    });
    return res.json(findwl);
  })
);


//DELETE ONE watchlists
router.delete(
  "/:id",
  asyncHandler(async function (req, res) {
    const id = req.params.id;
    const wl = await Watchlist.findByPk(id);
    if (!wl) throw new Error("Cannot find wl");
    await Watchlist.destroy({where: {id: id}});
    return res.json(wl);
  })
);

//DELETE symbol from watchlist
router.delete(
  "/deleteSymbol/:id/:entryId",
  asyncHandler(async function (req, res) {
    const { id, entryId } = req.params;
    await WatchlistEntry.destroy({where: {id: entryId}});
    const findwl = await Watchlist.findOne({
      where: { id: id },
      include: [{ model: WatchlistEntry }]
    });
    return res.json(findwl);
  })
);

//ADD symbol to watchlist
router.post(
  "/addSymbol",
  asyncHandler(async function (req, res) {
    const form = req.body


    await WatchlistEntry.create(form);

    const findwl = await Watchlist.findOne({
      where: { id: form.watchlistId },
      include: [{ model: WatchlistEntry }]
    });
    return res.json(findwl);
  })
);

//check for valid symbol
router.post(
  "/checkSymbol/",
  asyncHandler(async function (req, res) {

    const response = await fetch(`https://api.tdameritrade.com/v1/marketdata/${req.body.ticker}/quotes?apikey=${process.env.API_KEY}`)

    const data = await response.json()

    return res.json(data);
  })
);

module.exports = router;
