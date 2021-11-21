import "./TradeCard.css";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { portTransaction } from '../../store/portfolios'

export default function TradeCard({ portfolios, watchlists, user }) {
  const dispatch = useDispatch();
  const [selectedOption, setSelectedOption] = useState(
    // Object.keys(portfolios)[0] || 0
    "select portfolio"
  );
  const portfolio = useSelector((state) => state.portfolios[selectedOption]);
  const [ticker, setTicker] = useState(user.lastViewedSym);
  const [shares, setShares] = useState("")
  const [price, setPrice] = useState("")
  let totalPrice = 0.00

  useEffect(() => {
    setTicker(user.lastViewedSym)
  }, [user]);

  const selectOptions = Object.values(portfolios).map((port) => {
    return (
      <option key={port.id} value={port.id}>
        {port.name}
      </option>
    );
  });

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  const findPrice = (sharePrice, amount) => {
    totalPrice = sharePrice * amount;
    return totalPrice
  };

  const handleTransaction = async (e) => {
    e.preventDefault();
    console.log("portfolio >>>>",portfolio)
    const action = {
      portfolioId: portfolio.id,
      amount: shares,
      symbol: ticker,
    };
    console.log("in handleTransaction, port >> action", portfolio, action)
    await dispatch(portTransaction(action))
    setShares("");
    setPrice("")
  };

  if (user) {
    return (
      <div className="wrapper-trade-card">
        <div className="wrapper-buy-sell-trade-card">
          <div>Buy</div>
          <div>Sell</div>
        </div>
        <div className="wrapper-trade-components">
          <form className="wrapper-trade-form" onSubmit={handleTransaction}>
            <label>Select Portfolio</label>
            <select
              value={selectedOption}
              onChange={(e) => {
                setSelectedOption(e.target.value); console.log(selectedOption, e.target.value);
              }}
            >
              <option value="select portfolio">select portfolio</option>
              {selectOptions}
            </select>
            <label>ticker:</label>
            <input value={ticker} onChange={(e) => setTicker(e.target.value)}/>
            <label>Shares</label>
            <input value={shares} onChange={(e) => setShares(e.target.value)}/>
            <label>Price</label>
            <input value={price} onChange={(e) => setPrice(e.target.value)}/>
            <div>Est. price: {formatter.format(findPrice(shares, price))}</div>
            <button type="submit">Submit Order</button>
            <h3>
              {(selectedOption !== "select portfolio") ?
              formatter.format(portfolio?.currentFunds)+" buying power available" : <p>please select a portfolio for this transaction</p>}
            </h3>
          </form>
        </div>
      </div>
    );
  } else {
    return <h1>loading...</h1>;
  }
}
