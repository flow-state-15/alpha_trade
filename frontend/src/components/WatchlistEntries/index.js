import "./WatchlistEntries.css";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, Link, Redirect, useHistory } from "react-router-dom";
import { setLastViewed } from "../../store/session";
import { removeWatchlistSymbol } from "../../store/watchlists";
import CrudModal from "../CrudModal"

export default function WatchlistEntries({ watchlistId, user }) {
  const dispatch = useDispatch();
  const watchlist = useSelector((state) => state?.watchlists[watchlistId]);
  const [content, setContent] = useState(null);

  const handleClick = async (e) => {
    const update = {
      ...user,
      lastViewedSym: e.target.name,
    };
    await dispatch(setLastViewed(update));
    console.log("in handle click, target: ", e.target)
    console.log("in handle click, value: ", e.target.value)
  };

  const handleRemove = async (e, entryId) => {
    await dispatch(removeWatchlistSymbol(watchlistId, entryId));
  }

  if (watchlist) {
    return (
      <div className="sidebar-wrapper">
        <div className="sidebar-name-wrapper">
          {/* <div>{watchlist.name}</div>
          <div className="edit-link">Edit</div> */}
          <CrudModal watchlistId={watchlist.id} userId={user.id} />
        </div>
        <div>
          {watchlist?.WatchlistEntries ?
          Object.values(watchlist?.WatchlistEntries).map((entry) => (
            <div
              className="sb-content-item-wrap"
              key={entry.id}
              value={entry.symbol}
              // onClick={handleClick}
            >
              <div className="sb-content-item-name-wrap">
                <button
                className="sb-content-item-symbol"
                value={entry.symbol}
                id={entry.id}
                onClick={handleClick}
                >{entry.symbol}</button>
                <h3>{entry.symbolName}</h3>
                <button onClick={(e) => handleRemove(e, entry.id)}>remove symbol</button>
              </div>
            </div>
          )) : null
          }
        </div>
      </div>
    );
  } else return null;
}
