const axios = require("axios");

const symbols_from_portfolios = async (portfolios) => {
	const all_symbols = portfolios.reduce((array, p) => {
		array.push(
			...p.symbols.reduce((acc, s) => {
                acc.push(s.symbol);
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

module.exports = {
	symbols_from_portfolios,
};
