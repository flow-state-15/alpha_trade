const express = require("express");
const asyncHandler = require("express-async-handler");

const { setTokenCookie, requireAuth } = require("../../utils/auth");
const { Portfolio, PortfolioEntry } = require("../../db/models");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");

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
    const entry = await Portfolio.create(req.body);
    return res.json(entry);
  })
);

//UPDATE ONE portfolio
router.put(
  "/:id",
  asyncHandler(async function (req, res) {
    const id = req.params.id;
    const entry = await Portfolio.findByPk(id);
    await entry.update(req.body)
    const findPort = await Portfolio.findOne({
      where: { id: id },
      include: [{ model: PortfolioEntry }]
    });
    return res.json(findPort);
  })
);

//POST add sym to portfolio
router.post(
  "/transact/:portId",
  asyncHandler(async (req, res) => {
    // console.log("\n\n",req.body, "\n\n")
    const portId = req.params.portId
    const entry = await PortfolioEntry.create(req.body);
    console.log("\n\n",entry, "\n\n")
    const port = await Portfolio.findOne({
      where: { id: portId },
      include: [{ model: PortfolioEntry }]
    })
    return res.json(port);
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

module.exports = router;
