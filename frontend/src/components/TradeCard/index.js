import "./TradeCard.css";

export default function TradeCard({ portfolios, watchlists }) {
  const findPrice = (sharePrice, amount) => {
    const totalPrice = sharePrice * amount;
    return "testing" + 100;
  };

  return (
    <div className="wrapper-trade-card">
      <div className="wrapper-buy-sell-trade-card">
        <div>Buy</div>
        <div>Sell</div>
      </div>
      <div className="wrapper-trade-components">
        <form className="wrapper-trade-form">
          <label>Select Portfolio</label>
          <select />
          <label>ticker:</label>
          <input />
          <label>Shares</label>
          <input />
          <div>Est. price: {findPrice()}</div>
          <button type="submit">Submit Order</button>
          <div>${} buying power available</div>
        </form>
      </div>
    </div>
  );
}
