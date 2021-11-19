import "./WatchlistEntries.css";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, Link, Redirect, useHistory } from "react-router-dom";
import { setLastViewed } from "../../store/session";

export default function WatchlistEntries({ watchlistId, user }) {
  const dispatch = useDispatch();
  const watchlist = useSelector((state) => state.watchlists[watchlistId]);

  const ddContent = Object.values(watchlist.WatchlistEntries).map((entry) => (
    <div
      className="sb-content-item-wrap"
      key={entry.id}
      onClick={async (e) => {
        const update = {
          id: user.id,
          email: user.email,
          lastViewedSym: entry.symbol,
        };
        // console.log("clicked symbol sending dispatch", update)
        return dispatch(setLastViewed(update));
      }}
    >
      <div className="sb-content-item-name-wrap">
        <h3 className="sb-content-item-symbol">{entry.symbol}</h3>
        <h3>{entry.symbolName}</h3>
      </div>
    </div>
  ));

  return (
    <div className="sidebar-wrapper">
      <div className="sidebar-name-wrapper">
        <div>{watchlist.name}</div>
      </div>
      <div>{ddContent}</div>
    </div>
  );
}
