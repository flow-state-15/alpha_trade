const asyncHandler = require("express-async-handler");
const axios = require("axios");

const { symbols_from_portfolios } = require("../utils/td_api");
const { Portfolio, PortfolioEntry } = require("../db/models");

const create_portfolio = asyncHandler(async (req, res) => {
	const port = await Portfolio.create(req.body);
	const found = await Portfolio.findOne({
		where: { id: port.id },
		include: [{ model: PortfolioEntry }],
	});
	return res.json(found);
});

const userPortfolios = asyncHandler(async (req, res) => {
	const userId = req.params.userId;
	const portfolios = await Portfolio.findAll({
		where: { userId: userId },
		include: [
			{
				model: PortfolioEntry,
				as: "symbols",
			},
		],
	});
	const symData = await symbols_from_portfolios(portfolios);
	let normalized = {};
	let portValue = 0;
	for (let port of portfolios) {
		if (port.symbols && port.symbols.length) {
			port.symbols.forEach((entry, i) => {
				port.symbols[i] = {
					...entry.dataValues,
					...symData[entry.symbol],
				};
				portValue +=
					parseInt(symData[entry.symbol].mark) *
					parseInt(entry.amount);
			});

			normalized[port.id] = {
				...port.dataValues,
				portData: port.symbols,
				value: portValue,
			};
			continue;
		} else {
			normalized[port.id] = {
				...port,
				portData: {},
				// value: portValue,
			};
		}
	}

	return res.json(normalized);
});

const update_portfolio = asyncHandler(async function (req, res) {
	const id = req.params.id;
	const port = await Portfolio.findByPk(id);
	await port.update(req.body);
	const updatedport = await Portfolio.findOne({
		where: { id: id },
		include: [{ model: PortfolioEntry, as: "symbols" }],
	});
	return res.json(updatedport);
});

const delete_portfolio = asyncHandler(async function (req, res) {
	const id = req.params.id;
	const port = await Portfolio.findByPk(id);
	if (!port) throw new Error("Cannot find portfolio to delete");
	await Portfolio.destroy({ where: { id: id } });
	return res.json(port);
});

const portfolio_add_sym = asyncHandler(async (req, res) => {
	const portId = req.params.portId;

	const found = await PortfolioEntry.findOne({
		where: { portfolioId: req.body.portfolioId, symbol: req.body.symbol },
		// raw: true,
	});
	if (!found) {
		const entry = await PortfolioEntry.create(req.body);
		const port = await Portfolio.findOne({
			where: { id: portId },
			include: [{ model: PortfolioEntry, as: "symbols" }],
		});
		return res.json(port);
	} else {
		if (req.body.amount === 0) {
			await PortfolioEntry.destroy({
				where: {
					portfolioId: req.body.portfolioId,
					symbol: req.body.symbol,
				},
			});
		} else {
			await found.update({
				amount: req.body.amount,
			});
		}
		const port = await Portfolio.findOne({
			where: { id: portId },
			include: [{ model: PortfolioEntry, as: "symbols" }],
		});

		return res.json(port);
	}
});

const single_portfolio_sym_data = asyncHandler(async (req, res) => {
	const { userId, portId } = req.params;
	const port = await PortfolioEntry.findAll({
		where: { portfolioId: portId },
		raw: true,
		nest: true,
	});
	const stockList = [];
	port.map((stock) => stockList.push(stock.symbol));
	const td_api_data = get_multiple(stockList);
	console.log("\n\n", "td_api_data: ", td_api_data, "\n\n");
	// const data = await si.getStocksInfo(stockList);

	updatedData = [];
	data.map((stock) => {
		const found = port.find((stk) => stk.symbol === stock.symbol);
		updatedData.push({ ...stock, amount: found.amount });
	});
	return res.json(updatedData);
});

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

module.exports = {
	userPortfolios,
	delete_portfolio,
	update_portfolio,
	create_portfolio,
	portfolio_add_sym,
	single_portfolio_sym_data,
};
