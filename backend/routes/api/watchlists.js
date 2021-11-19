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
    const post = await Post.create(req.body);
    return res.json(post);
  })
);



//UPDATE ONE watchlists
router.put(
  "/:id",
  asyncHandler(async function (req, res) {
    const id = req.params.id;
    const post = await Post.findByPk(id);
    await post.update(req.body)
    return res.json(post);
  })
);


//DELETE ONE watchlists
router.delete(
  "/:id",
  asyncHandler(async function (req, res) {
    const id = req.params.id;
    const post = await Post.findByPk(id);
    if (!post) throw new Error("Cannot find post");
    await post.destroy(req.body);
    return res.json(post);
  })
);


module.exports = router;
