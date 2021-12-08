import "./TradeConfirmModal.css";
import { useState } from "react";
import { Modal } from "../../context/Modal";

export default function TradeConfirmModal({
  price,
  ticker,
  selectedOption,
  transType,
  shares,
  handleTransaction,
  formatter,
}) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button
              // type="submit"
              disabled={
                selectedOption === "select portfolio" ||
                ticker === "" ||
                shares === "" ||
                price === ""
              }
              className="btn-submit-order"
              onClick={(e) => {
                e.preventDefault();
                setShowModal(true)
              }}
            >
              Submit Order
            </button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <div className="confirm-delete-modal">
            <p>{`Are you sure you wish to ${transType} ${shares} shares of ${ticker}?`}</p>
            <div className="confirm-modal-red-green-wrap">
              <p>Buying power effect: </p>
              <br />
              <p
              style={{color: (transType === "buy") ? "red" : 'green'}}
              >{`${transType === "buy" ? "-" : "+"}${formatter.format(
                shares * price
              )}`}</p>
            </div>
            <div className="delete-yes-no">
              <button className="delete-no" onClick={() => setShowModal(false)}>
                Cancel
              </button>
              <button
                // type="submit"
                className="delete-yes"
                onClick={(e) => {
                  e.preventDefault();
                  handleTransaction(e, transType);
                  setShowModal(false)
                }}
              >
                Submit Order
              </button>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
}
