const express = require("express");
const asyncHandler = require("express-async-handler");

const { setTokenCookie, requireAuth } = require("../../utils/auth");
const { Portfolio } = require("../../db/models");
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
    '/:userId',
    asyncHandler(async (req, res) => {
      const userId = req.params.userId;
      const portfolios = await Portfolio.findAll(
          { where: { userId: userId}}
      );

      console.log("\n\n", portfolios, "\n\n")

      return res.json({
        portfolios
      });
    }),
  );

//POST portfolio
router.post(
  '/:userId',
  asyncHandler(async (req, res) => {
    const userId = req.params.userId;
    const portfolio = await Portfolio.create({ email, username, password });

    return res.json({
      portfolio,
    });
  }),
);

module.exports = router;
