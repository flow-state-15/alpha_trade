import PortEntries from "../PortEntries";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addPortfolio } from "../../store/portfolios"

export default function PortsContainer({ user }) {
    const dispatch = useDispatch();
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const ports = useSelector((state) => state.portfolios);

  const sbPorts = Object.values(ports).map((port) => (
    <PortEntries portId={port.id} user={user} />
  ));


  const handleSubmit = async (e) => {
      e.preventDefault()
    const add = {
      name: name,
      userId: user.id,
      startingFunds: 100000,
      currentFunds: 100000,
    };
    await dispatch(addPortfolio(add));
    setName("")
    setShowForm(false);
  };

  return (
    <div className="sb-ports-wrapper">
      <button onClick={() => setShowForm(true)}>create portfolio</button>
      {showForm && (
        <form className="sb-form-vertical" onSubmit={handleSubmit}>
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
      {sbPorts}
    </div>
  );
}
