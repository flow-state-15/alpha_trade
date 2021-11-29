import "./PortEntries.css";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setLastViewed } from "../../store/session";
import { getStockData } from "../../store/portData";
import {
  loadPortfolios,
  removePortfolio,
  updatePortfolio,
} from "../../store/portfolios";
import DeleteConfirmationModal from "../DeleteModal";

export default function PortEntries({ portId, user }) {
  const dispatch = useDispatch();
  const port = useSelector((state) => state?.portfolios[portId]);
  const portEntries = useSelector(
    (state) => state?.portfolios[portId]?.PortfolioEntries
  );
  const [showModal, setShowModal] = useState(false);
  const [editName, setEditName] = useState("");
  const [error, setError] = useState("");

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  useEffect(() => {
    (async () => {
      await dispatch(loadPortfolios(user.id));
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

    Object.values(port.portData).forEach((stock) => {
      acc += stock.ask * stock.amount;
    });
    return acc;
  };

  const handleDelete = async (e) => {
    await dispatch(removePortfolio(portId));
    await dispatch(loadPortfolios(user.id));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (editName.length > 20) {
      setError("Name too long");
    } else {
      setError(false);
      const update = {
        id: portId,
        name: editName,
        userId: e.target.value,
      };
      setEditName("");
      setShowModal(false);
      await dispatch(updatePortfolio(update));
      await dispatch(loadPortfolios(user.id));
    }
  };

  return (
    <div className="sidebar-wrapper">
      <div className="sidebar-name-wrapper">
        {/* <div>{port.name}</div>
              <div className="edit-link">Edit</div> */}
        <h2>{port ? port.name : null}</h2>
        <h2>
          {port ? "Portfolio value: " + formatter.format(port.value) : null}
        </h2>
      </div>
      {port ? (
        <div className="sb-port-crud-wrapper">
          <div className="sb-port-btn-wrap">
            <button
              className="btn-reg-clear"
              data-tip="edit"
              onClick={() => setShowModal(!showModal)}
            >
              edit
            </button>
            {/* <button className="btn-reg-clear" onClick={handleDelete}>delete</button> */}
            <DeleteConfirmationModal
              deleteRequest={handleDelete}
              resourceName={port.name}
            />
          </div>
          {showModal && (
            <form className="sb-form-vertical" onSubmit={handleUpdate}>
              <ul>
                {error ? (
                  <li
                    style={{
                      color: "red",
                      listStyleType: "none",
                      fontSize: "1.4rem",
                    }}
                  >
                    {"Error:  " + error}
                  </li>
                ) : null}
              </ul>
              <input
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                autoFocus={true}
              />
              <div className="port-crud-form-btn-wrap">
                <span
                  onClick={() => {
                    setShowModal(false);
                    setError(false);
                  }}
                >
                  cancel
                </span>
                <button disabled={editName === ""} type="submit">
                  rename portfolio
                </button>
              </div>
            </form>
          )}
        </div>
      ) : null}
      <div className="sb-port-item-wrap">
        {port?.portData ? (
          Object.keys(port?.portData).length ? (
            Object.values(port?.portData).map((entry) => (
              <div
                className="sb-port-item-wrap"
                key={entry.id}
                value={entry.symbol}
                // onClick={handleClick}
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
          )
        ) : (
          <h2>select a portfolio</h2>
        )}
      </div>
    </div>
  );
}
