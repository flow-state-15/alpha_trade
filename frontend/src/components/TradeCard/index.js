import "./TradeCard.css";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadPortfolios, portTransaction, updatePortfolio } from '../../store/portfolios'
import { getOptionsChain } from '../../store/portData'

export default function TradeCard({ portfolios, watchlists, user }) {
  const dispatch = useDispatch();
  const [selectedOption, setSelectedOption] = useState(
    // Object.keys(portfolios)[0] || 0
    "select portfolio"
  );
  const portfolio = useSelector((state) => state.portfolios[selectedOption]);
  const [ticker, setTicker] = useState(
    (user.lastViewedSym)? user.lastViewedSym.toUpperCase(): "AAPL"
    );
  const [shares, setShares] = useState("")
  const [price, setPrice] = useState("")
  const [transType, setTransType] = useState("buy")
  const [error, setError] = useState("")

  useEffect(() => {
    setTicker(user.lastViewedSym)
  }, [user]);

  // useEffect(() => {
  //   console.log(transType)
  // }, [transType])

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
    return sharePrice * amount;
  };

  const handleTransaction = async (e, type) => {
    e.preventDefault();

    if(type === "buy" && portfolio.currentFunds < findPrice(price, shares)){
      setError("not enough buying power");
    } else if (type === "buy" && portfolio.currentFunds > findPrice(price, shares)) {
      let amount;
      if (!portfolio.portData[ticker]){
        amount = parseInt(shares)
      } else {
        amount = parseInt(portfolio.portData[ticker].amount) + parseInt(shares)
      }
      const action = {
        portfolioId: portfolio.id,
        amount: amount,
        symbol: ticker.toUpperCase(),
      };
      // console.log("in handleTransaction, port >> action", portfolio, action)
      await dispatch(portTransaction(action))
      const portUpdate = {
        ...portfolio, currentFunds: portfolio.currentFunds - findPrice(price, shares)
      }
      await dispatch(updatePortfolio(portUpdate))
      await dispatch(loadPortfolios(user.id))
      setShares("");
      setPrice("")
      setError("")
    } else if (transType === "sell" && portfolio.portData.hasOwnProperty(ticker) && portfolio.portData[ticker].amount >= shares) {
      const newAmount = parseInt(portfolio.portData[ticker].amount) - parseInt(shares)
      const action = {
        portfolioId: portfolio.id,
        amount: newAmount,
        symbol: ticker.toUpperCase(),
      };
      console.log("in handleTransaction, port >> action", portfolio, action)
      await dispatch(portTransaction(action))
      const portUpdate = {
        id: portfolio.id,
        currentFunds: parseInt(portfolio.currentFunds) + parseInt(findPrice(price, shares))
      }
      console.log("logging portUpdate, currentfunds: ", portUpdate)
      await dispatch(updatePortfolio(portUpdate))
      dispatch(loadPortfolios(user.id))
      setShares("");
      setPrice("")
      setError("")
    } else {
      setError("short selling is currently unavailable")
    }
  };


  const portsClick = () => {
    console.log(getOptionsChain)
    dispatch(getOptionsChain({ symbol: ticker }));
  };

  if (user) {
    return (
      <div className="wrapper-trade-card">
        <div className="wrapper-buy-sell-trade-card">
          <div onClick={() => setTransType("buy")}>Buy</div>
          <div onClick={() => setTransType("sell")}>Sell</div>
        </div>
        <ul>
          {(error) ? <li style={{color: "red", listStyleType: "none"}}>{"Error:  "+error}</li> : null}
        </ul>
        <div className="wrapper-trade-components">
          <form className="wrapper-trade-form" onSubmit={(e) => handleTransaction(e, transType)}>
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
            <input required value={ticker} onChange={(e) => setTicker(e.target.value.toUpperCase())}/>
            <label>Shares</label>
            <input required value={shares} onChange={(e) => {setShares(e.target.value); setError("")}}/>
            <label>Price</label>
            <input required value={price} onChange={(e) => {setPrice(e.target.value); setError("")}}/>
            <div>Est. price: {formatter.format(findPrice(shares, price))}</div>
            <button type="submit" disabled={selectedOption === "select portfolio"}>Submit Order</button>
            <div>
              {(selectedOption !== "select portfolio") ?
              formatter.format(portfolio?.currentFunds)+" buying power available" : <p>please select a portfolio for this transaction</p>}
            </div>
            <button onClick={portsClick}>get options data</button>
          </form>
        </div>
      </div>
    );
  } else {
    return <h1>loading...</h1>;
  }
}
