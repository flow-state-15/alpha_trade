import "./WatchlistEntries.css";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setLastViewed } from "../../store/session";
import { removeWatchlistSymbol } from "../../store/watchlists";
import { Container, Row, Col } from "react-grid-system";
import CrudModal from "../CrudModal";

export default function WatchlistEntries({ watchlistId, user }) {
  const dispatch = useDispatch();
  const watchlist = useSelector((state) => state?.watchlists[watchlistId]);
  const [LV, setLV] = useState("");

  useEffect(() => {
    (async (e) => {
      // console.log("in handle click, LV: ", LV)
      const update = {
        ...user,
        lastViewedSym: LV.toUpperCase(),
      };
      await dispatch(setLastViewed(update));
      // console.log("updated user : ", user)
    })();
  }, [LV]);

  const handleRemove = async (e, entryId) => {
    await dispatch(removeWatchlistSymbol(watchlistId, entryId));
  };

  if (watchlist) {
    return (
      <div className="sidebar-wrapper">
        <div className="sidebar-name-wrapper">
          {/* <div>{watchlist.name}</div>
          <div className="edit-link">Edit</div> */}
          <h2>{watchlist.name}</h2>
          <CrudModal watchlistId={watchlist.id} userId={user.id} />
        </div>
        <Container
          style={{
            maxHeight: "100vh",
            overflow: "hidden",
            scrollbarWidth: "4px",
            scrollbarGutter: "stable"
          }}
          className="sb-grid-container"
        >
          {watchlist?.WatchlistEntries
            ? Object.values(watchlist?.WatchlistEntries).map((entry) => (
                <Row
                  className="sb-content-item-name-wrap"
                  key={entry.id}
                  value={entry.symbol}
                >
                  <Col
                    style={{
                      textAlign: "left !important",
                      paddingRight: "0 !important",
                      maxWidth: "5rem",
                    }}
                  >
                    <button
                      className="sb-content-item-symbol"
                      value={entry.symbol}
                      id={entry.id}
                      onClick={(e) => setLV(e.target.value)}
                    >
                      {entry.symbol}
                    </button>
                  </Col>
                  <Col
                    style={{
                      textAlign: "left !important",
                      paddingRight: "0 !important",
                    }}
                  >
                    <h3>{entry.symbolName}</h3>
                  </Col>
                  <Col xs="content" style={{ paddingRight: "none !important" }}>
                    <button className="btn-reg-clear" onClick={(e) => handleRemove(e, entry.id)}>
                      remove 
                    </button>
                  </Col>
                </Row>
              ))
            : null}
        </Container>
      </div>
    );
  } else return null;
}
