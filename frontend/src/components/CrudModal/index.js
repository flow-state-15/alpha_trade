import { Modal } from "../../context/Modal";
import {
  updateWatchlist,
  removeWatchlist,
  loadWatchlists,
} from "../../store/watchlists";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

export default function CrudModal({ watchlistId, userId }) {
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
          className="switcher tipper"
          data-tip="edit"
          onClick={() => setShowModal(!showModal)}
        >
          {/* <svg aria-hidden="false" width="20" height="20" viewBox="0 0 24 24">
          <path
            fill="currentColor"
            fillRule="evenodd"
            clipRule="evenodd"
            d="M19.738 10H22V14H19.739C19.498 14.931 19.1 15.798 18.565 16.564L20 18L18 20L16.565 18.564C15.797 19.099 14.932 19.498 14 19.738V22H10V19.738C9.069 19.498 8.203 19.099 7.436 18.564L6 20L4 18L5.436 16.564C4.901 15.799 4.502 14.932 4.262 14H2V10H4.262C4.502 9.068 4.9 8.202 5.436 7.436L4 6L6 4L7.436 5.436C8.202 4.9 9.068 4.502 10 4.262V2H14V4.261C14.932 4.502 15.797 4.9 16.565 5.435L18 3.999L20 5.999L18.564 7.436C19.099 8.202 19.498 9.069 19.738 10ZM12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16Z"
          ></path>
        </svg> */}
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
              rename watchlist
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
