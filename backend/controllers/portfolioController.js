const asyncHandler = require("express-async-handler");
const axios = require("axios");

const { symbols_from_portfolios } = require("../utils/td_api");
const { Portfolio, PortfolioEntry } = require('../db')

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

module.exports = {
	userPortfolios,
};
