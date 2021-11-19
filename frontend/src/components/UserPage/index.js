import "./UserPage.css";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReactDOM from "react-dom";
import TradingViewWidget, { Themes } from "react-tradingview-widget";
import { createChart } from "lightweight-charts";
import { loadPortfolios } from "../../store/portfolios";
import { loadWatchlists } from "../../store/watchlists";
import TradeCard from "../TradeCard";
import DataApi from "../DataApi";
import WatchlistEntries from "../WatchlistEntries"

export default function UserPage() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const portfolios = useSelector((state) => state.portfolios);
  const watchlists = useSelector((state) => state.watchlists);

  useEffect(() => {
    if (user) {
      dispatch(loadPortfolios(user.id));
      // console.log("dispatching load ports");
      dispatch(loadWatchlists(user.id));
      // console.log("dispatching load watch");
    }
  }, [user]);

  useEffect(() => {

  }, [user])



  const wlSidebar = Object.values(watchlists).map(watchlist => {
    return (<WatchlistEntries watchlistId={watchlist.id} key={watchlist.id} user={user} />)
  })

  return (
    <div className="userpage-container">
      <div className="wrapper-userpage-chart-trade">
        <div className="tradingview-chart-container">
          <TradingViewWidget
            className="tv-widget"
            symbol={user.lastViewedSym}
            theme={Themes.DARK}
            styles={{ width: "200rem !important" }}
            hide-side-toolbar={false}
          />
        </div>
        <TradeCard portfolios={portfolios} watchlists={watchlists} />
        {wlSidebar}
      </div>
    </div>
  );
}
