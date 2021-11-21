import "./PortEntries.css";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, Link, Redirect, useHistory } from "react-router-dom";
import { setLastViewed } from "../../store/session";
import PortCrud from "../PortCrud";
import { getStockData } from "../../store/portfolios"

export default function PortEntries({ portId, user }) {
  const dispatch = useDispatch();
  const port = useSelector((state) => state?.portfolios[portId]);
  console.log("in port entries comp, portId:", port);

  const callStockInfo = async () => {
    dispatch(getStockData(user.id, portId));
  }

  const handleClick = async (e) => {
    const update = {
      id: user.id,
      email: user.email,
      lastViewedSym: e.target.value,
    };
    await dispatch(setLastViewed(update));
  };

  if (port) {
    return (
      <div className="sidebar-wrapper">
        <div className="sidebar-name-wrapper">
          {/* <div>{port.name}</div>
          <div className="edit-link">Edit</div> */}
          <h2>{port.name}</h2>
          <h2>{"Portfolio value: " + port.currentFunds}</h2>
          <PortCrud portId={port.id} userId={user.id} />
        </div>
        <button onClick={callStockInfo}>getStockInfo</button>
        <div>
          {port.PortfolioEntries ? (
            Object.values(port?.PortfolioEntries).map((entry) => (
              <div
                className="sb-content-item-wrap"
                key={entry.id}
                value={entry.symbol}
                onClick={handleClick}
              >
                <div className="sb-content-item-name-wrap">
                  <h3>{entry.amount}</h3>
                  <h3 className="sb-content-item-symbol">{entry.symbol}</h3>
                </div>
              </div>
            ))
          ) : (
            <h1>No holdings in portfolio</h1>
          )}
        </div>
      </div>
    );
  } else return null;
}
