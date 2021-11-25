import "./UserPage.css";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import TradingViewWidget, { Themes } from "react-tradingview-widget";
import { loadPortfolios } from "../../store/portfolios";
import { loadWatchlists } from "../../store/watchlists";
import TradeCard from "../TradeCard";
import WatchlistEntries from "../WatchlistEntries";
import { addWatchlist } from "../../store/watchlists";
import PortsContainer from "../PortsContainer";
import OptionsData from "../OptionsData";

export default function UserPage() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const portfolios = useSelector((state) => state.portfolios);
  const watchlists = useSelector((state) => state.watchlists);
  const allWatchlists = useSelector((state) => state.watchlists);
  const [selectedOption, setSelectedOption] = useState(
    Object.keys(watchlists)[0] || 0
  );
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");

  // console.log(wlName)

  useEffect(() => {
    (async () => {
      dispatch(loadPortfolios(user.id));
      dispatch(loadWatchlists(user.id));
    })()
  }, [dispatch, user]);

  const selectOptions = Object.values(allWatchlists).map((wl) => {
    return (
      <option key={wl.id} value={wl.id}>
        {wl.name}
      </option>
    );
  });

  // console.log(selectOptions)

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newWL = {
      name: name,
      userId: user.id,
    };
    console.log("in handle submit, newWL: ", newWL);
    await dispatch(addWatchlist(newWL));
    await setName("");
    console.log(name);
  };

  // const sbPorts = Object.values

  return (
    <div className="userpage-container">
      <PortsContainer user={user} />
      <div className="wrapper-userpage-chart-trade">
        <div className="userpage-chart-trade-card">
          <div className="tradingview-chart-container">
            <TradingViewWidget
              className="tv-widget"
              symbol={user.lastViewedSym}
              // theme={Themes.DARK}
              styles={{ width: "200rem !important" }}
              hide-side-toolbar={false}
            />
          </div>
          <TradeCard
            portfolios={portfolios}
            watchlists={watchlists}
            user={user}
          />
        </div>
        <OptionsData user={user} />
      </div>
      <div className="sb-select-with-content-wrapper">
        <h2>Select Watchlist</h2>

        <select
          value={selectedOption}
          onChange={(e) => {
            setSelectedOption(e.target.value);
          }}
        >
          <option>select watchlist</option>
          {selectOptions}
        </select>
        <button className="btn-reg-clear" onClick={() => setShowForm(true)}>
          - create watchlist -
        </button>
        {showForm && (
          <form className="sb-form-vertical" onSubmit={handleSubmit}>
            <input
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoFocus={true}
            />
            <div className="create-crud-btn-wrap">
              <span onClick={() => setShowForm(false)}>cancel</span>
              <button disabled={name === ""} type="submit">
                create portfolio
              </button>
            </div>
          </form>
        )}
        <WatchlistEntries watchlistId={selectedOption} user={user} />
      </div>
    </div>
  );
}
