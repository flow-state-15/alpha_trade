import "./PortEntries.css";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, Link, Redirect, useHistory } from "react-router-dom";
import { setLastViewed } from "../../store/session";
import PortCrud from "../PortCrud";
import { getStockData } from "../../store/portData";
import { loadPortfolios } from "../../store/portfolios";

export default function PortEntries({ portId, user }) {
  const dispatch = useDispatch();
  const port = useSelector((state) => state?.portfolios[portId]);
  const portEntries = useSelector(
    (state) => state?.portfolios[portId]?.PortfolioEntries
  );
  const portData = useSelector((state) => state?.portData);
  const [portV, setPortV] = useState("loading...");

  // console.log("logging port in port entries",port)

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  useEffect(() => {
    (async () => {
      // console.log(portId, portEntries)
      await dispatch(loadPortfolios(user.id));
      // if(Object.keys(port.portData).length){
      //   setPortV(formatter.format(getPortValue()));
      // }
    })();
  }, [portId]);

  const callStockInfo = async () => {
    dispatch(getStockData(user.id, portId));
  };

  const handleClick = async (e) => {
    const update = {
      id: user.id,
      email: user.email,
      lastViewedSym: e.target.value,
    };
    await dispatch(setLastViewed(update));
  };

  const getPortValue = () => {
    let acc = 0;
    console.log("Object.values(port.portData) ::", port.portData, Object.values(port.portData));
    Object.values(port.portData).forEach((stock) => {
      acc += stock.ask * stock.amount;
    });
    return acc;
  };

  if (port) {
    return (
      <div className="sidebar-wrapper">
        <div className="sidebar-name-wrapper">
          {/* <div>{port.name}</div>
          <div className="edit-link">Edit</div> */}
          <h2>{port.name}</h2>
          <h2>{"Portfolio value: " + formatter.format(port.value)}</h2>
          <PortCrud portId={port.id} userId={user.id} />
        </div>
        {(Object.keys(port.portData).length) ? (
          Object.values(port.portData).map((entry) => (
            <div
              className="sb-port-item-wrap"
              key={entry.id}
              value={entry.symbol}
              onClick={handleClick}
            >
              <div className="sb-port-item-name-wrap">
                <h3>{entry.amount}</h3>
                <h3>{entry.symbol}</h3>
                <h3 className="sb-port-item-symbol">
                  {formatter.format(entry.ask)}
                </h3>
                <h3 className="sb-port-item-symbol">
                  {parseFloat(entry.regularMarketChange).toFixed(2) + "%"}
                </h3>
              </div>
            </div>
          ))
        ) : (
          <h2>No holdings in portfolio</h2>
        )}
      </div>
    );
  } else return (
    null
  );
}
