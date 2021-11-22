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
  const [LV, setLV] = useState("");

  useEffect(() => {
    (async(e) => {
      // console.log("in handle click, LV: ", LV)
      const update = {
        ...user,
        lastViewedSym: LV.toUpperCase(),
      };
      await dispatch(setLastViewed(update));
      // console.log("updated user : ", user)
    })();
  }, [LV])


  const handleRemove = async (e, entryId) => {
    await dispatch(removeWatchlistSymbol(watchlistId, entryId));
  }

  if (watchlist) {
    return (
      <div className="sidebar-wrapper">
        <div className="sidebar-name-wrapper">
          {/* <div>{watchlist.name}</div>
          <div className="edit-link">Edit</div> */}
          <h2>{watchlist.name}</h2>
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
                onClick={e => setLV(e.target.value)}
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
