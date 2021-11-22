import "./UserPage.css";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import TradingViewWidget, { Themes } from "react-tradingview-widget";
import { loadPortfolios } from "../../store/portfolios";
import { loadWatchlists } from "../../store/watchlists";
import TradeCard from "../TradeCard";
import WatchlistEntries from "../WatchlistEntries";
import { addWatchlist } from "../../store/watchlists"
import PortsContainer from "../PortsContainer";

export default function UserPage() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const portfolios = useSelector((state) => state.portfolios);
  const watchlists = useSelector((state) => state.watchlists);
  const allWatchlists = useSelector(state => state.watchlists)
  const [selectedOption, setSelectedOption] = useState(Object.keys(watchlists)[0] || 0);
  const [wlName, setWLName] = useState("")

  // console.log(wlName)

  useEffect(() => {
    // (()=>{
      dispatch(loadPortfolios(user.id));
    //   // console.log("dispatching load ports");
      dispatch(loadWatchlists(user.id));
    //   // console.log("dispatching load watch");
    // })()
  }, [dispatch]);

  const selectOptions = Object.values(allWatchlists).map(wl => {
    return (<option key={wl.id} value={wl.id}>{wl.name}</option>)
  })

  // console.log(selectOptions)

  const handleSubmit = async (e) => {
    e.preventDefault()
    const newWL = {
      name: wlName,
      userId: user.id,
    }
    console.log("in handle submit, newWL: ", newWL)
    await dispatch(addWatchlist(newWL));
    await setWLName("")
    console.log(wlName)
  }

  // const sbPorts = Object.values

  const portsClick = () => {
    dispatch(loadPortfolios(user.id))
  }

  return (
    <div className="userpage-container">
      <PortsContainer user={user} />
      {/* <PortEntries /> */}
      <div className="wrapper-userpage-chart-trade">
        <div className="tradingview-chart-container">
          <button onClick={portsClick}>load ports</button>
          <TradingViewWidget
            className="tv-widget"
            symbol={user.lastViewedSym}
            // theme={Themes.DARK}
            styles={{ width: "200rem !important" }}
            hide-side-toolbar={false}
            />
        </div>
        <TradeCard portfolios={portfolios} watchlists={watchlists} user={user} />
      </div>
      <div className="sb-select-with-content-wrapper">
        <h2>Select Watchlist</h2>
        <div className="sb-wl-slct-crud-wrap">
          <form>
            <select
              value={selectedOption}
              onChange={(e) => {
                setSelectedOption(e.target.value);
              }}
            >
              <option>select watchlist</option>
              {selectOptions}
            </select>
          </form>
          <button>create new watchlist</button>
        </div>
        <WatchlistEntries watchlistId={selectedOption} user={user}/>
        <form onSubmit={handleSubmit}>
          <label>Create New Watchlist</label>
          <input
            required

            value={wlName}

            onChange={(e) => setWLName(e.target.value)}
            />
          <button type="submit" disabled={wlName === ''}>create</button>
        </form>
      </div>
    </div>
  );
}
