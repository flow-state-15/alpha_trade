# AlphaTrade

AlphaTrade was bootstrapped from [Create React App](https://github.com/facebook/create-react-app) and built with React/Redux on the front end while using ExpressJS on the backend. This project uses TDAmeritrade, Yahoo Finance and TradingView APIs for data and charting features. Advanced charting is in the pipeline along with options trade features and strategy implementations.

View the live site hosted on Heroku:  [alpha-trade.herokuapp.com](https://alpha-trade.herokuapp.com/).

AlphaTrade was designed be a quick and simple trading app where you can experience the feel of trading without having to worry about Know Your Customer rules imposed upon brokers by the SEC. It is a purely simulated environment where where no data other than user information and list data is stored server side.

## Run App

Running the app for yourself is simple.

In the root, run

```npm start```

You'll need another terminal to open to the root of /frontend, and run

```npm start```

Please be aware that cloning this app will cause many features to break as half of this site requires a private API key along with database settings stored in the backend's .env file. You can obtain an API key for yourself from a TDAmeritrade developer account.

## Feature List

This app is a single page app for now, but more features like news feeds for your portfolios are in the works. Options strategies are planned as well.

A user can create portfolios and each one starts with $100k in buying power.

Every user starts with two default watchlists: stocks that make up the S&P 100 and the holdings of the popular QQQ etf.

This was by design, as AlphaTrade was not meant to be a single resource for all symbols in the stock market. AlphaTrade was designed to be used along side your favorite charting and analysis sources (many good ones are available to the public for free although the data is delayed). You can add any stock ticker to a watchlist as long as it's a valid symbol, and if the stock is optionable you'll see the option chain for it with corresponding data. ITM/OTM options have their corresponding styles for easy reading and support for trading specific options is coming soon.

I have a passion for trading stock options vs just the stock itself, and while there are pros and cons to going that route, there is better alpha potential as well. But as always, I must remind users that nothing in this project is to be taken as financial advice, and one should be well aware of trading risks when delving into the fascinating world of finance. Thank you for exploring AlphaTrade!
