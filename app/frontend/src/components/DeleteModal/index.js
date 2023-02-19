import { useState } from "react";
import { Modal } from "../../context/Modal";
import "./DeleteModal.css"

export default function DeleteConfirmationModal({
  deleteRequest,
  resource,
  resourceName,
}) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button
        className="btn-reg-clear"
        onClick={() => setShowModal(true)}
      >
        delete
      </button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <div className="confirm-delete-modal">
            <p>{`Warning: Are you sure you wish to delete "${resourceName}"? Data will be permanently lost.`}</p>
            <p></p>
            <div className="delete-yes-no">
              <button className="delete-no" onClick={() => setShowModal(false)}>
                No
              </button>
              <button
                className="delete-yes"
                onClick={(e) => deleteRequest(e, resource)}
              >
                Yes
              </button>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
}
