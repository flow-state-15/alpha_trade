const express = require("express");
const asyncHandler = require("express-async-handler");

const { setTokenCookie, requireAuth } = require("../../utils/auth");
const { Watchlist, WatchlistEntry } = require("../../db/models");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");

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

    // console.log("\n\n", watchlists, "\n\n");

    return res.json({
      watchlists,
    });

    // const one = await Watchlist.findAll()
    // console.log("\n\n", one, "\n\n");

    // return res.json({
    //   one,
    // });
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

module.exports = router;
