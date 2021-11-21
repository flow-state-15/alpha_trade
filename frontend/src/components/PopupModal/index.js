import { useState } from "react";
import { Modal } from "../../context/Modal";

export default function DeleteConfirmationModal({
  deleteRequest,
  resource,
  resourceName,
}) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button
        className="generic-resource-delete-button"
        onClick={() => setShowModal(true)}
      >
        Delete
      </button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <div className="confirm-delete-modal">
            <p>{`Are you sure you wish to delete "${resourceName}"?`}</p>
            <p></p>
            <div className="delete-yes-no">
              <button
                className="delete-yes"
                onClick={(e) => deleteRequest(e, resource)}
              >
                Yes
              </button>
              <button className="delete-no" onClick={() => setShowModal(false)}>
                No
              </button>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
}
