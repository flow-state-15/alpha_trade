const express = require("express");
const asyncHandler = require("express-async-handler");

const { setTokenCookie, requireAuth } = require("../../utils/auth");
const { User } = require("../../db/models");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");

const router = express.Router();

const validateSignup = [
  check("email")
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage("Please provide a valid email."),
  check("username")
    .exists({ checkFalsy: true })
    .isLength({ min: 4 })
    .withMessage("Please provide a username with at least 4 characters."),
  check("username").not().isEmail().withMessage("Username cannot be an email."),
  check("password")
    .exists({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage("Password must be 6 characters or more."),
  handleValidationErrors,
];

//ROUTE HANDLING

//GET USER
router.get(
  '/:userId',
  asyncHandler(async (req, res) => {
    const { userId } = req.body;
    const user = await User.findByPk(userId);

    return res.json({
      user,
    });
  }),
)

//Sign up
router.post(
  '/',
  validateSignup,
  asyncHandler(async (req, res) => {
    const { email, password, username } = req.body;
    const user = await User.signup({ email, username, password });

    await setTokenCookie(res, user);

    return res.json({
      user,
    });
  }),
);

//UPDATE user
router.put(
  "/:userId",
  asyncHandler(async function (req, res) {
    const { userId } = req.params;
    const { user } = req.body;

    const foundUser = await User.findByPk(userId);
    await foundUser.update(user)
    // console.log("\n\n foundUser: ", foundUser, "\n\n");
    return res.json({
      user: foundUser
    });
  })
);

module.exports = router;
