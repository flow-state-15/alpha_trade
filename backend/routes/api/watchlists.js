const express = require("express");
const asyncHandler = require("express-async-handler");

const { setTokenCookie, requireAuth } = require("../../utils/auth");
const { Watchlist } = require("../../db/models");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");

const router = express.Router();


//ROUTE HANDLING
//GET all watchlists
router.get(
    '/:userId',
    asyncHandler(async (req, res) => {
      const userId = req.params.userId;
      const watchlists = await Watchlist.findAll(
          { where: { userId: userId}}
      );

      console.log("\n\n", watchlists, "\n\n")

      return res.json({
        watchlists
      });
    }),
  );








module.exports = router;
