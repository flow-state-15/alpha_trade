import PortEntries from "../PortEntries";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addPortfolio, loadPortfolios } from "../../store/portfolios";
import "./PortsContainer.css";

export default function PortsContainer({ user }) {
  const dispatch = useDispatch();
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const ports = useSelector((state) => state.portfolios);
  const [selectedOption, setSelectedOption] = useState(
    Object.keys(ports)[0] || 0
  );
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (name.length > 20) {
      setError("Name too long");
    } else {
      setError(false);
      const add = {
        name: name,
        userId: user.id,
        startingFunds: 100000,
        currentFunds: 100000,
      };
      setName("");
      setShowForm(false);
      await dispatch(addPortfolio(add));
      await dispatch(loadPortfolios(user.id));
    }
  };

  const selectOptions = Object.values(ports).map((port) => {
    return (
      <option key={port.id} value={port.id}>
        {port.name}
      </option>
    );
  });

  return (
    <div className="sb-ports-wrapper">
      <h2>Select Portfolio</h2>
      <select
        value={selectedOption}
        onChange={async (e) => {
          await setSelectedOption(e.target.value);
        }}
      >
        <option value={false}>select portfolio</option>
        {selectOptions}
      </select>
      <button className="btn-reg-clear" onClick={() => setShowForm(true)}>
        - create portfolio -
      </button>
      {showForm && (
        <form className="sb-form-vertical" onSubmit={handleSubmit}>
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
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoFocus={true}
          />
          <span onClick={() => setShowForm(false)}>cancel</span>
          <button disabled={name === ""} type="submit">
            create portfolio
          </button>
        </form>
      )}
      <PortEntries portId={selectedOption} user={user} />
    </div>
  );
}
