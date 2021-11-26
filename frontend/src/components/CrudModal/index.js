import { Modal } from "../../context/Modal";
import DeleteConfirmationModal from "../DeleteModal";
import {
  updateWatchlist,
  removeWatchlist,
  loadWatchlists,
} from "../../store/watchlists";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

export default function CrudModal({ watchlistId, userId, wlName }) {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const update = {
      id: watchlistId,
      name: name,
      userId: e.target.value,
    };
    await dispatch(updateWatchlist(update));
    await dispatch(loadWatchlists(userId));
    setName("");
    setShowModal(false);
  };

  const handleDelete = async (e) => {
    await dispatch(removeWatchlist(watchlistId));
  };

  return (
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
            resourceName={wlName}
            />
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
              rename watchlist
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
