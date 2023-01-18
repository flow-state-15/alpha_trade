const asyncHandler = require("express-async-handler");
const axios = require("axios");

const { symbols_from_portfolios } = require("../utils/td_api");

// collect all symbols from user's portfolio instances
const all_symbols = (portfolios) =>
	portfolios.reduce((array, p) => {
		array.push(
			...p.symbols.reduce((acc, s) => {
				// console.log("\n\n acc: ", acc, "\n\n");
				acc.push(s.symbol);
				return acc;
			}, [])
		);
		return array;
	}, []);

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
	let normalized = {};
	let portValue = 0;

	// TODO: create a utility to collect all symbols in all user portfolios into
	// an array to hit the api once. Reduce the data into portfolios

	console.log("\n\n all_symbols: ", all_symbols, "\n\n");

	for (let port of portfolios) {
		if (port.symbols && port.symbols.length) {
			const portList = [];
			port.symbols.forEach((entry) => {
				portList.push(entry.symbol);
			});

			const data = get_all_symbols();

			port.symbols.forEach((entry, i) => {
				port.symbols[i] = {
					...entry.dataValues,
					...data[entry.symbol],
				};
				console.log("\n\nentry: ", entry, "\n\n");
				portValue +=
					parseInt(data[entry.symbol].mark) * parseInt(entry.amount);
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
				value: portValue,
			};
		}
	}

	return res.json(normalized);
});

module.exports = {
	userPortfolios,
	all_symbols,
};
