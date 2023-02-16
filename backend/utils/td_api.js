const axios = require("axios");

const symbols_from_portfolios = async (portfolios) => {
	const all_symbols = portfolios.reduce((array, p) => {
		array.push(
			...p.symbols.reduce((acc, s) => {
				acc.push(s.symbol.toUpperCase());
				return acc;
			}, [])
		);
		return array;
	}, []);

	const query_string = `https://api.tdameritrade.com/v1/marketdata/quotes?apikey=${
		process.env.API_KEY
	}&symbol=${all_symbols.join("%2C")}`;

	const raw = await axios.get(query_string);
	return raw.data;
};

const option_data = async (sym) => {
	const raw = await axios.get(
		`https://api.tdameritrade.com/v1/marketdata/chains?apikey=${process.env.API_KEY}&symbol=${sym.toUpperCase()}&contractType=ALL&strikeCount=30&includeQuotes=TRUE&strategy=SINGLE&range=ALL&optionType=ALL`
	);

	return raw.data;
};

const validate_symbol = async (sym) => {
	const response = await axios(`https://api.tdameritrade.com/v1/marketdata/${sym.toUpperCase()}/quotes?apikey=${process.env.API_KEY}`)
    const data = response.data
	return data
}

module.exports = {
	symbols_from_portfolios,
	option_data,
	validate_symbol
};
