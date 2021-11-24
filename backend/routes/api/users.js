const express = require("express");
const asyncHandler = require("express-async-handler");

const { setTokenCookie, requireAuth } = require("../../utils/auth");
const { User } = require("../../db/models");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");
const { Watchlist, WatchlistEntry, Portfolio } = require("../../db/models");

const router = express.Router();

const validateSignup = [
  check("email")
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage("Please provide a valid email."),
  // check("username")
  //   .exists({ checkFalsy: true })
  //   .isLength({ min: 4 })
  //   .withMessage("Please provide a username with at least 4 characters."),
  // check("username").not().isEmail().withMessage("Username cannot be an email."),
  check("password")
    .exists({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage("Password must be 6 characters or more."),
  handleValidationErrors,
];

//ROUTE HANDLING

//GET USER
router.get(
  "/:userId",
  asyncHandler(async (req, res) => {
    const { userId } = req.body;
    const user = await User.findByPk(userId);

    return res.json({
      user,
    });
  })
);

//Sign up
router.post(
  "/",
  validateSignup,
  asyncHandler(async (req, res) => {
    const { email, password, username } = req.body;
    const user = await User.signup({ email, username, password });

    await setTokenCookie(res, user);

    await Portfolio.create({
      name: "My First Portfolio",
      userId: user.id,
      startingFunds: 100000,
      currentFunds: 100000,
      value: 0.00,
    })

    const userSP100 = await Watchlist.create({
      name: "S&P100",
      userId: user.id,
    });
    const userQQQ = await Watchlist.create({ name: "QQQ", userId: user.id });

    // console.log("\n\n in signup, new wl's and id's:", userSP100.id, userQQQ.id, userSP100, userQQQ, "\n\n");

    await WatchlistEntry.bulkCreate([
      {
        watchlistId: `${userSP100.id}`,
        symbol: "MSFT",
        symbolName: "Microsoft Corporation",
      },
      {
        watchlistId: `${userSP100.id}`,
        symbol: "AAPL",
        symbolName: "Apple Inc.",
      },
      {
        watchlistId: `${userSP100.id}`,
        symbol: "AMZN",
        symbolName: "Amazon.com Inc.",
      },
      {
        watchlistId: `${userSP100.id}`,
        symbol: "GOOGL",
        symbolName: "Alphabet Inc. Class A",
      },
      {
        watchlistId: `${userSP100.id}`,
        symbol: "TSLA",
        symbolName: "Tesla Inc",
      },
      {
        watchlistId: `${userSP100.id}`,
        symbol: "GOOG",
        symbolName: "Alphabet Inc. Class C",
      },
      {
        watchlistId: `${userSP100.id}`,
        symbol: "FB",
        symbolName: "Meta Platforms Inc. Class A",
      },
      {
        watchlistId: `${userSP100.id}`,
        symbol: "NVDA",
        symbolName: "NVIDIA Corporation",
      },
      {
        watchlistId: `${userSP100.id}`,
        symbol: "BRK.B",
        symbolName: "Berkshire Hathaway Inc. Class B",
      },
      {
        watchlistId: `${userSP100.id}`,
        symbol: "JPM",
        symbolName: "JPMorgan Chase & Co.",
      },
      {
        watchlistId: `${userSP100.id}`,
        symbol: "JNJ",
        symbolName: "Johnson & Johnson",
      },
      {
        watchlistId: `${userSP100.id}`,
        symbol: "UNH",
        symbolName: "UnitedHealth Group Incorporated",
      },
      {
        watchlistId: `${userSP100.id}`,
        symbol: "HD",
        symbolName: "Home Depot Inc.",
      },
      {
        watchlistId: `${userSP100.id}`,
        symbol: "PG",
        symbolName: "Procter & Gamble Company",
      },
      {
        watchlistId: `${userSP100.id}`,
        symbol: "V",
        symbolName: "Visa Inc. Class A",
      },
      {
        watchlistId: `${userSP100.id}`,
        symbol: "BAC",
        symbolName: "Bank of America Corp",
      },
      {
        watchlistId: `${userSP100.id}`,
        symbol: "ADBE",
        symbolName: "Adobe Inc.",
      },
      {
        watchlistId: `${userSP100.id}`,
        symbol: "MA",
        symbolName: "Mastercard Incorporated Class A",
      },
      {
        watchlistId: `${userSP100.id}`,
        symbol: "NFLX",
        symbolName: "Netflix Inc.",
      },
      {
        watchlistId: `${userSP100.id}`,
        symbol: "CRM",
        symbolName: "salesforce.com inc.",
      },
      {
        watchlistId: `${userSP100.id}`,
        symbol: "DIS",
        symbolName: "Walt Disney Company",
      },
      {
        watchlistId: `${userSP100.id}`,
        symbol: "PFE",
        symbolName: "Pfizer Inc.",
      },
      {
        watchlistId: `${userSP100.id}`,
        symbol: "XOM",
        symbolName: "Exxon Mobil Corporation",
      },
      {
        watchlistId: `${userSP100.id}`,
        symbol: "TMO",
        symbolName: "Thermo Fisher Scientific Inc.",
      },
      {
        watchlistId: `${userSP100.id}`,
        symbol: "CMCSA",
        symbolName: "Comcast Corporation Class A",
      },
      {
        watchlistId: `${userSP100.id}`,
        symbol: "PYPL",
        symbolName: "PayPal Holdings Inc.",
      },
      {
        watchlistId: `${userSP100.id}`,
        symbol: "CSCO",
        symbolName: "Cisco Systems Inc.",
      },
      {
        watchlistId: `${userSP100.id}`,
        symbol: "ACN",
        symbolName: "Accenture Plc Class A",
      },
      {
        watchlistId: `${userSP100.id}`,
        symbol: "AVGO",
        symbolName: "Broadcom Inc.",
      },
      {
        watchlistId: `${userSP100.id}`,
        symbol: "COST",
        symbolName: "Costco Wholesale Corporation",
      },
      {
        watchlistId: `${userSP100.id}`,
        symbol: "ABT",
        symbolName: "Abbott Laboratories",
      },
      {
        watchlistId: `${userSP100.id}`,
        symbol: "PEP",
        symbolName: "PepsiCo Inc.",
      },
      {
        watchlistId: `${userSP100.id}`,
        symbol: "CVX",
        symbolName: "Chevron Corporation",
      },
      {
        watchlistId: `${userSP100.id}`,
        symbol: "NKE",
        symbolName: "NIKE Inc. Class B",
      },
      {
        watchlistId: `${userSP100.id}`,
        symbol: "KO",
        symbolName: "Coca-Cola Company",
      },
      {
        watchlistId: `${userSP100.id}`,
        symbol: "VZ",
        symbolName: "Verizon Communications Inc.",
      },
      {
        watchlistId: `${userSP100.id}`,
        symbol: "MRK",
        symbolName: "Merck & Co. Inc.",
      },
      {
        watchlistId: `${userSP100.id}`,
        symbol: "ABBV",
        symbolName: "AbbVie Inc.",
      },
      {
        watchlistId: `${userSP100.id}`,
        symbol: "LLY",
        symbolName: "Eli Lilly and Company",
      },
      {
        watchlistId: `${userSP100.id}`,
        symbol: "QCOM",
        symbolName: "Qualcomm Inc",
      },
      {
        watchlistId: `${userSP100.id}`,
        symbol: "WFC",
        symbolName: "Wells Fargo & Company",
      },
      {
        watchlistId: `${userSP100.id}`,
        symbol: "INTC",
        symbolName: "Intel Corporation",
      },
      {
        watchlistId: `${userSP100.id}`,
        symbol: "WMT",
        symbolName: "Walmart Inc.",
      },
      {
        watchlistId: `${userSP100.id}`,
        symbol: "DHR",
        symbolName: "Danaher Corporation",
      },
      {
        watchlistId: `${userSP100.id}`,
        symbol: "MCD",
        symbolName: "McDonald's Corporation",
      },
      {
        watchlistId: `${userSP100.id}`,
        symbol: "AMD",
        symbolName: "Advanced Micro Devices Inc.",
      },
      {
        watchlistId: `${userSP100.id}`,
        symbol: "T",
        symbolName: "AT&T Inc.",
      },
      {
        watchlistId: `${userSP100.id}`,
        symbol: "TXN",
        symbolName: "Texas Instruments Incorporated",
      },
      {
        watchlistId: `${userSP100.id}`,
        symbol: "LOW",
        symbolName: "Lowe's Companies Inc.",
      },
      {
        watchlistId: `${userSP100.id}`,
        symbol: "INTU",
        symbolName: "Intuit Inc.",
      },
      {
        watchlistId: `${userSP100.id}`,
        symbol: "NEE",
        symbolName: "NextEra Energy Inc.",
      },
      {
        watchlistId: `${userSP100.id}`,
        symbol: "LIN",
        symbolName: "Linde plc",
      },
      {
        watchlistId: `${userSP100.id}`,
        symbol: "MDT",
        symbolName: "Medtronic Plc",
      },
      {
        watchlistId: `${userSP100.id}`,
        symbol: "ORCL",
        symbolName: "Oracle Corporation",
      },
      {
        watchlistId: `${userSP100.id}`,
        symbol: "UNP",
        symbolName: "Union Pacific Corporation",
      },
      {
        watchlistId: `${userSP100.id}`,
        symbol: "HON",
        symbolName: "Honeywell International Inc.",
      },
      {
        watchlistId: `${userSP100.id}`,
        symbol: "UPS",
        symbolName: "United Parcel Service Inc. Class B",
      },
      {
        watchlistId: `${userSP100.id}`,
        symbol: "PM",
        symbolName: "Philip Morris International Inc.",
      },
      {
        watchlistId: `${userSP100.id}`,
        symbol: "MS",
        symbolName: "Morgan Stanley",
      },
      {
        watchlistId: `${userSP100.id}`,
        symbol: "AMAT",
        symbolName: "Applied Materials Inc.",
      },
      {
        watchlistId: `${userSP100.id}`,
        symbol: "NOW",
        symbolName: "ServiceNow Inc.",
      },
      {
        watchlistId: `${userSP100.id}`,
        symbol: "C",
        symbolName: "Citigroup Inc.",
      },
      {
        watchlistId: `${userSP100.id}`,
        symbol: "BLK",
        symbolName: "BlackRock Inc.",
      },
      {
        watchlistId: `${userSP100.id}`,
        symbol: "SBUX",
        symbolName: "Starbucks Corporation",
      },
      {
        watchlistId: `${userSP100.id}`,
        symbol: "BMY",
        symbolName: "Bristol-Myers Squibb Company",
      },
      {
        watchlistId: `${userSP100.id}`,
        symbol: "GS",
        symbolName: "Goldman Sachs Group Inc.",
      },
      {
        watchlistId: `${userSP100.id}`,
        symbol: "RTX",
        symbolName: "Raytheon Technologies Corporation",
      },
      {
        watchlistId: `${userSP100.id}`,
        symbol: "ISRG",
        symbolName: "Intuitive Surgical Inc.",
      },
      {
        watchlistId: `${userSP100.id}`,
        symbol: "TGT",
        symbolName: "Target Corporation",
      },
      {
        watchlistId: `${userSP100.id}`,
        symbol: "BA",
        symbolName: "Boeing Company",
      },
      {
        watchlistId: `${userSP100.id}`,
        symbol: "CVS",
        symbolName: "CVS Health Corporation",
      },
      {
        watchlistId: `${userSP100.id}`,
        symbol: "SCHW",
        symbolName: "Charles Schwab Corporation",
      },
      {
        watchlistId: `${userSP100.id}`,
        symbol: "AMT",
        symbolName: "American Tower Corporation",
      },
      {
        watchlistId: `${userSP100.id}`,
        symbol: "AMGN",
        symbolName: "Amgen Inc.",
      },
      {
        watchlistId: `${userSP100.id}`,
        symbol: "AXP",
        symbolName: "American Express Company",
      },
      {
        watchlistId: `${userSP100.id}`,
        symbol: "SPGI",
        symbolName: "S&P Global Inc.",
      },
      {
        watchlistId: `${userSP100.id}`,
        symbol: "GE",
        symbolName: "General Electric Company",
      },
      {
        watchlistId: `${userSP100.id}`,
        symbol: "PLD",
        symbolName: "Prologis Inc.",
      },
      {
        watchlistId: `${userSP100.id}`,
        symbol: "CAT",
        symbolName: "Caterpillar Inc.",
      },
      {
        watchlistId: `${userSP100.id}`,
        symbol: "MMM",
        symbolName: "3M Company",
      },
      {
        watchlistId: `${userSP100.id}`,
        symbol: "IBM",
        symbolName: "International Business Machines Corporation",
      },
      {
        watchlistId: `${userSP100.id}`,
        symbol: "ZTS",
        symbolName: "Zoetis Inc. Class A",
      },
      {
        watchlistId: `${userSP100.id}`,
        symbol: "ANTM",
        symbolName: "Anthem Inc.",
      },
      {
        watchlistId: `${userSP100.id}`,
        symbol: "ADI",
        symbolName: "Analog Devices Inc.",
      },
      {
        watchlistId: `${userSP100.id}`,
        symbol: "DE",
        symbolName: "Deere & Company",
      },
      {
        watchlistId: `${userSP100.id}`,
        symbol: "ADP",
        symbolName: "Automatic Data Processing Inc.",
      },
      {
        watchlistId: `${userSP100.id}`,
        symbol: "BKNG",
        symbolName: "Booking Holdings Inc.",
      },
      {
        watchlistId: `${userSP100.id}`,
        symbol: "COP",
        symbolName: "ConocoPhillips",
      },
      {
        watchlistId: `${userSP100.id}`,
        symbol: "GM",
        symbolName: "General Motors Company",
      },
      {
        watchlistId: `${userSP100.id}`,
        symbol: "LRCX",
        symbolName: "Lam Research Corporation",
      },
      {
        watchlistId: `${userSP100.id}`,
        symbol: "TJX",
        symbolName: "TJX Companies Inc",
      },
      {
        watchlistId: `${userSP100.id}`,
        symbol: "SYK",
        symbolName: "Stryker Corporation",
      },
      {
        watchlistId: `${userSP100.id}`,
        symbol: "CHTR",
        symbolName: "Charter Communications Inc. Class A",
      },
      {
        watchlistId: `${userSP100.id}`,
        symbol: "MDLZ",
        symbolName: "Mondelez International Inc. Class A",
      },
      {
        watchlistId: `${userSP100.id}`,
        symbol: "PNC",
        symbolName: "PNC Financial Services Group Inc.",
      },
      {
        watchlistId: `${userSP100.id}`,
        symbol: "MRNA",
        symbolName: "Moderna Inc.",
      },
      {
        watchlistId: `${userSP100.id}`,
        symbol: "MMC",
        symbolName: "Marsh & McLennan Companies Inc.",
      },
      {
        watchlistId: `${userSP100.id}`,
        symbol: "MU",
        symbolName: "Micron Technology Inc.",
      },
      {
        watchlistId: `${userSP100.id}`,
        symbol: "GILD",
        symbolName: "Gilead Sciences Inc.",
      },
      {
        watchlistId: `${userSP100.id}`,
        symbol: "LMT",
        symbolName: "Lockheed Martin Corporation",
      },
    ]);

    await WatchlistEntry.bulkCreate([
      {
        watchlistId: `${userQQQ.id}`,
        symbol: "MSFT",
        symbolName: "Microsoft Corp",
      },
      {
        watchlistId: `${userQQQ.id}`,
        symbol: "AAPL",
        symbolName: "Apple Inc",
      },
      {
        watchlistId: `${userQQQ.id}`,
        symbol: "AMZN",
        symbolName: "Amazon.com Inc",
      },
      {
        watchlistId: `${userQQQ.id}`,
        symbol: "TSLA",
        symbolName: "Tesla Inc",
      },
      {
        watchlistId: `${userQQQ.id}`,
        symbol: "NVDA",
        symbolName: "NVIDIA Corp",
      },
      {
        watchlistId: `${userQQQ.id}`,
        symbol: "GOOG",
        symbolName: "Alphabet Inc",
      },
      {
        watchlistId: `${userQQQ.id}`,
        symbol: "GOOGL",
        symbolName: "Alphabet Inc",
      },
      {
        watchlistId: `${userQQQ.id}`,
        symbol: "FB",
        symbolName: "Meta Platforms Inc",
      },
      {
        watchlistId: `${userQQQ.id}`,
        symbol: "ADBE",
        symbolName: "Adobe Inc",
      },
      {
        watchlistId: `${userQQQ.id}`,
        symbol: "NFLX",
        symbolName: "Netflix Inc",
      },
      {
        watchlistId: `${userQQQ.id}`,
        symbol: "CMCSA",
        symbolName: "Comcast Corp",
      },
      {
        watchlistId: `${userQQQ.id}`,
        symbol: "PYPL",
        symbolName: "PayPal Holdings Inc",
      },
      {
        watchlistId: `${userQQQ.id}`,
        symbol: "CSCO",
        symbolName: "Cisco Systems Inc/Delaware",
      },
      {
        watchlistId: `${userQQQ.id}`,
        symbol: "AVGO",
        symbolName: "Broadcom Inc",
      },
      {
        watchlistId: `${userQQQ.id}`,
        symbol: "COST",
        symbolName: "Costco Wholesale Corp",
      },
      {
        watchlistId: `${userQQQ.id}`,
        symbol: "PEP",
        symbolName: "PepsiCo Inc",
      },
      {
        watchlistId: `${userQQQ.id}`,
        symbol: "QCOM",
        symbolName: "QUALCOMM Inc",
      },
      {
        watchlistId: `${userQQQ.id}`,
        symbol: "INTC",
        symbolName: "Intel Corp",
      },
      {
        watchlistId: `${userQQQ.id}`,
        symbol: "AMD",
        symbolName: "Advanced Micro Devices Inc",
      },
      {
        watchlistId: `${userQQQ.id}`,
        symbol: "TXN",
        symbolName: "Texas Instruments Inc",
      },
      {
        watchlistId: `${userQQQ.id}`,
        symbol: "INTU",
        symbolName: "Intuit Inc",
      },
      {
        watchlistId: `${userQQQ.id}`,
        symbol: "HON",
        symbolName: "Honeywell International Inc",
      },
      {
        watchlistId: `${userQQQ.id}`,
        symbol: "TMUS",
        symbolName: "T-Mobile US Inc",
      },
      {
        watchlistId: `${userQQQ.id}`,
        symbol: "AMAT",
        symbolName: "Applied Materials Inc",
      },
      {
        watchlistId: `${userQQQ.id}`,
        symbol: "SBUX",
        symbolName: "Starbucks Corp",
      },
      {
        watchlistId: `${userQQQ.id}`,
        symbol: "ISRG",
        symbolName: "Intuitive Surgical Inc",
      },
      {
        watchlistId: `${userQQQ.id}`,
        symbol: "CHTR",
        symbolName: "Charter Communications Inc",
      },
      {
        watchlistId: `${userQQQ.id}`,
        symbol: "AMGN",
        symbolName: "Amgen Inc",
      },
      {
        watchlistId: `${userQQQ.id}`,
        symbol: "ADI",
        symbolName: "Analog Devices Inc",
      },
      {
        watchlistId: `${userQQQ.id}`,
        symbol: "ADP",
        symbolName: "Automatic Data Processing Inc",
      },
      {
        watchlistId: `${userQQQ.id}`,
        symbol: "MRNA",
        symbolName: "Moderna Inc",
      },
      {
        watchlistId: `${userQQQ.id}`,
        symbol: "BKNG",
        symbolName: "Booking Holdings Inc",
      },
      {
        watchlistId: `${userQQQ.id}`,
        symbol: "LRCX",
        symbolName: "Lam Research Corp",
      },
      {
        watchlistId: `${userQQQ.id}`,
        symbol: "MDLZ",
        symbolName: "Mondelez International Inc",
      },
      {
        watchlistId: `${userQQQ.id}`,
        symbol: "MU",
        symbolName: "Micron Technology Inc",
      },
      {
        watchlistId: `${userQQQ.id}`,
        symbol: "GILD",
        symbolName: "Gilead Sciences Inc",
      },
      {
        watchlistId: `${userQQQ.id}`,
        symbol: "CSX",
        symbolName: "CSX Corp",
      },
      {
        watchlistId: `${userQQQ.id}`,
        symbol: "MELI",
        symbolName: "MercadoLibre Inc",
      },
      {
        watchlistId: `${userQQQ.id}`,
        symbol: "ADSK",
        symbolName: "Autodesk Inc",
      },
      {
        watchlistId: `${userQQQ.id}`,
        symbol: "ASML",
        symbolName: "ASML Holding NV",
      },
      {
        watchlistId: `${userQQQ.id}`,
        symbol: "REGN",
        symbolName: "Regeneron Pharmaceuticals Inc",
      },
      {
        watchlistId: `${userQQQ.id}`,
        symbol: "FISV",
        symbolName: "Fiserv Inc",
      },
      {
        watchlistId: `${userQQQ.id}`,
        symbol: "JD",
        symbolName: "JD.com Inc ADR",
      },
      {
        watchlistId: `${userQQQ.id}`,
        symbol: "KLAC",
        symbolName: "KLA Corp",
      },
      {
        watchlistId: `${userQQQ.id}`,
        symbol: "ZM",
        symbolName: "Zoom Video Communications Inc",
      },
      {
        watchlistId: `${userQQQ.id}`,
        symbol: "DXCM",
        symbolName: "Dexcom Inc",
      },
      {
        watchlistId: `${userQQQ.id}`,
        symbol: "MRVL",
        symbolName: "Marvell Technology Inc",
      },
      {
        watchlistId: `${userQQQ.id}`,
        symbol: "TEAM",
        symbolName: "Atlassian Corp PLC",
      },
      {
        watchlistId: `${userQQQ.id}`,
        symbol: "ILMN",
        symbolName: "Illumina Inc",
      },
      {
        watchlistId: `${userQQQ.id}`,
        symbol: "LULU",
        symbolName: "Lululemon Athletica Inc",
      },
      {
        watchlistId: `${userQQQ.id}`,
        symbol: "NXPI",
        symbolName: "NXP Semiconductors NV",
      },
      {
        watchlistId: `${userQQQ.id}`,
        symbol: "WDAY",
        symbolName: "Workday Inc",
      },
      {
        watchlistId: `${userQQQ.id}`,
        symbol: "ALGN",
        symbolName: "Align Technology Inc",
      },
      {
        watchlistId: `${userQQQ.id}`,
        symbol: "SNPS",
        symbolName: "Synopsys Inc",
      },
      {
        watchlistId: `${userQQQ.id}`,
        symbol: "CRWD",
        symbolName: "Crowdstrike Holdings Inc",
      },
      {
        watchlistId: `${userQQQ.id}`,
        symbol: "XLNX",
        symbolName: "Xilinx Inc",
      },
      {
        watchlistId: `${userQQQ.id}`,
        symbol: "IDXX",
        symbolName: "IDEXX Laboratories Inc",
      },
      {
        watchlistId: `${userQQQ.id}`,
        symbol: "EXC",
        symbolName: "Exelon Corp",
      },
      {
        watchlistId: `${userQQQ.id}`,
        symbol: "DOCU",
        symbolName: "DocuSign Inc",
      },
      {
        watchlistId: `${userQQQ.id}`,
        symbol: "CDNS",
        symbolName: "Cadence Design Systems Inc",
      },
      {
        watchlistId: `${userQQQ.id}`,
        symbol: "MAR",
        symbolName: "Marriott International Inc/MD",
      },
      {
        watchlistId: `${userQQQ.id}`,
        symbol: "KDP",
        symbolName: "Keurig Dr Pepper Inc",
      },
      {
        watchlistId: `${userQQQ.id}`,
        symbol: "ATVI",
        symbolName: "Activision Blizzard Inc",
      },
      {
        watchlistId: `${userQQQ.id}`,
        symbol: "VRTX",
        symbolName: "Vertex Pharmaceuticals Inc",
      },
      {
        watchlistId: `${userQQQ.id}`,
        symbol: "MNST",
        symbolName: "Monster Beverage Corp",
      },
      {
        watchlistId: `${userQQQ.id}`,
        symbol: "EBAY",
        symbolName: "eBay Inc",
      },
      {
        watchlistId: `${userQQQ.id}`,
        symbol: "CTAS",
        symbolName: "Cintas Corp",
      },
      {
        watchlistId: `${userQQQ.id}`,
        symbol: "MCHP",
        symbolName: "Microchip Technology Inc",
      },
      {
        watchlistId: `${userQQQ.id}`,
        symbol: "PAYX",
        symbolName: "Paychex Inc",
      },
      {
        watchlistId: `${userQQQ.id}`,
        symbol: "KHC",
        symbolName: "Kraft Heinz Co/The",
      },
      {
        watchlistId: `${userQQQ.id}`,
        symbol: "ORLY",
        symbolName: "O'Reilly Automotive Inc",
      },
      {
        watchlistId: `${userQQQ.id}`,
        symbol: "CTSH",
        symbolName: "Cognizant Technology Solutions Corp",
      },
      {
        watchlistId: `${userQQQ.id}`,
        symbol: "AEP",
        symbolName: "American Electric Power Co Inc",
      },
      {
        watchlistId: `${userQQQ.id}`,
        symbol: "ROST",
        symbolName: "Ross Stores Inc",
      },
      {
        watchlistId: `${userQQQ.id}`,
        symbol: "WBA",
        symbolName: "Walgreens Boots Alliance Inc",
      },
      {
        watchlistId: `${userQQQ.id}`,
        symbol: "BIDU",
        symbolName: "Baidu Inc ADR",
      },
      {
        watchlistId: `${userQQQ.id}`,
        symbol: "MTCH",
        symbolName: "Match Group Inc",
      },
      {
        watchlistId: `${userQQQ.id}`,
        symbol: "EA",
        symbolName: "Electronic Arts Inc",
      },
      {
        watchlistId: `${userQQQ.id}`,
        symbol: "BIIB",
        symbolName: "Biogen Inc",
      },
      {
        watchlistId: `${userQQQ.id}`,
        symbol: "OKTA",
        symbolName: "Okta Inc",
      },
      {
        watchlistId: `${userQQQ.id}`,
        symbol: "CPRT",
        symbolName: "Copart Inc",
      },
      {
        watchlistId: `${userQQQ.id}`,
        symbol: "VRSK",
        symbolName: "Verisk Analytics Inc",
      },
      {
        watchlistId: `${userQQQ.id}`,
        symbol: "FAST",
        symbolName: "Fastenal Co",
      },
      {
        watchlistId: `${userQQQ.id}`,
        symbol: "XEL",
        symbolName: "Xcel Energy Inc",
      },
      {
        watchlistId: `${userQQQ.id}`,
        symbol: "ANSS",
        symbolName: "ANSYS Inc",
      },
      {
        watchlistId: `${userQQQ.id}`,
        symbol: "PDD",
        symbolName: "Pinduoduo Inc ADR",
      },
      {
        watchlistId: `${userQQQ.id}`,
        symbol: "NTES",
        symbolName: "NetEase Inc ADR",
      },
      {
        watchlistId: `${userQQQ.id}`,
        symbol: "SGEN",
        symbolName: "Seagen Inc",
      },
      {
        watchlistId: `${userQQQ.id}`,
        symbol: "PCAR",
        symbolName: "PACCAR Inc",
      },
      {
        watchlistId: `${userQQQ.id}`,
        symbol: "DLTR",
        symbolName: "Dollar Tree Inc",
      },
      {
        watchlistId: `${userQQQ.id}`,
        symbol: "SWKS",
        symbolName: "Skyworks Solutions Inc",
      },
      {
        watchlistId: `${userQQQ.id}`,
        symbol: "SIRI",
        symbolName: "Sirius XM Holdings Inc",
      },
      {
        watchlistId: `${userQQQ.id}`,
        symbol: "CDW",
        symbolName: "CDW Corp/DE",
      },
      {
        watchlistId: `${userQQQ.id}`,
        symbol: "VRSN",
        symbolName: "VeriSign Inc",
      },
      {
        watchlistId: `${userQQQ.id}`,
        symbol: "SPLK",
        symbolName: "Splunk Inc",
      },
      {
        watchlistId: `${userQQQ.id}`,
        symbol: "CERN",
        symbolName: "Cerner Corp",
      },
      {
        watchlistId: `${userQQQ.id}`,
        symbol: "TCOM",
        symbolName: "Trip.com Group Ltd ADR",
      },
      {
        watchlistId: `${userQQQ.id}`,
        symbol: "CHKP",
        symbolName: "Check Point Software Technologies Ltd",
      },
      {
        watchlistId: `${userQQQ.id}`,
        symbol: "INCY",
        symbolName: "Incyte Corp",
      },
      {
        watchlistId: `${userQQQ.id}`,
        symbol: "PTON",
        symbolName: "Peloton Interactive Inc",
      },
      {
        watchlistId: `${userQQQ.id}`,
        symbol: "FOXA",
        symbolName: "Fox Corp",
      },
      {
        watchlistId: `${userQQQ.id}`,
        symbol: "FOX",
        symbolName: "Fox Corp",
      },
    ]);

    return res.json({
      user,
    });
  })
);

//UPDATE user
router.put(
  "/:userId",
  asyncHandler(async function (req, res) {
    const { userId } = req.params;
    const { user } = req.body;

    const foundUser = await User.findByPk(userId);
    await foundUser.update(user);
    // console.log("\n\n foundUser: ", foundUser, "\n\n");
    return res.json({
      user: foundUser,
    });
  })
);

module.exports = router;
