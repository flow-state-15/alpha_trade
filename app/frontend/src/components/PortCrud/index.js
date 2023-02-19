import { Modal } from "../../context/Modal";
import {
  updatePortfolio,
  removePortfolio,
  loadPortfolios,
} from "../../store/portfolios";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./PortCrud.css";

export default function PortCrud({ portId, userId }) {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const update = {
      id: portId,
      name: name,
      userId: e.target.value,
    };
    await dispatch(updatePortfolio(update));
    setName("");
    setShowModal(false);
  };

  const handleDelete = async (e) => {
    await dispatch(removePortfolio(portId));
  };

  return (
    <div className="sb-port-crud-wrapper">
      <div className="sb-port-btn-wrap">
        <button
          className="switcher tipper"
          data-tip="edit"
          onClick={() => setShowModal(!showModal)}
        >
          edit
        </button>
        <button onClick={handleDelete}>delete</button>
      </div>
      {showModal && (
        <form className="sb-form-vertical" onSubmit={handleSubmit}>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoFocus={true}
          />
          <div className="port-crud-form-btn-wrap">
            <span onClick={() => setShowModal(false)}>cancel</span>
            <button disabled={name === ""} type="submit">
              rename portfolio
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
