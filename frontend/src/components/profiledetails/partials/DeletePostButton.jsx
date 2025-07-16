import { useState } from "react";
import { Button, Modal, Spinner } from "react-bootstrap";
import { FiTrash2 } from "react-icons/fi";
import { toast } from "react-toastify";
import CustomButton from "../../button/CustomButton";

const DeletePostButton = ({ postId, onDeleted }) => {
  const [showConfirm, setShowConfirm] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await onDeleted(postId);
      toast.success("Post deleted successfully");
      setShowConfirm(false);
    } catch (err) {
      toast.error("Failed to delete post");
      console.error("Errore nella cancellazione:", err);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <CustomButton
        variant="outline-danger"
        onClick={() => setShowConfirm(true)}
        disabled={isDeleting}
        className="d-flex justify-content-center align-items-center"
      >
        <FiTrash2 className="me-1" />
        Delete
      </CustomButton>

      <Modal
        show={showConfirm}
        onHide={() => setShowConfirm(false)}
        centered
        className="dark-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this post? This action cannot be
          undone.
        </Modal.Body>
        <Modal.Footer>
          <CustomButton
            variant="transparent"
            onClick={() => setShowConfirm(false)}
          >
            Cancel
          </CustomButton>

          <CustomButton
            variant="danger"
            onClick={handleDelete}
            disabled={isDeleting}
          >
            {isDeleting ? (
              <>
                <Spinner
                  animation="border"
                  size="sm"
                  className="me-2"
                  variant="warning"
                />
                Deleting...
              </>
            ) : (
              "Delete"
            )}
          </CustomButton>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default DeletePostButton;
