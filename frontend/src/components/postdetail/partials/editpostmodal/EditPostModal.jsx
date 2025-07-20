import { sanitizeContent } from "../../../../utility/sanitizeContent";
import { validateField } from "../../../../utility/validation";
import { Modal, Form, Spinner, Alert } from "react-bootstrap";
import CustomButton from "../../../button/CustomButton";
import "react-quill-new/dist/quill.snow.css";
import { useState, useEffect } from "react";
import ReactQuill from "react-quill-new";
import { toast } from "react-toastify";
import "./editpostmodal.css";

const EditPostModal = ({ show, handleClose, postData, onPostUpdated }) => {
  const [formData, setFormData] = useState({
    title: "",
    location: "",
    tags: "",
  });
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [newImages, setNewImages] = useState([]);
  const [currentImages, setCurrentImages] = useState([]);
  const [error, setError] = useState("");
  const [isModified, setIsModified] = useState(false);

  useEffect(() => {
    if (postData) {
      setFormData({
        title: postData.title || "",
        location: postData.location || "",
        tags: postData.tags ? postData.tags.join(", ") : "",
      });
      setContent(postData.content || "");
      setCurrentImages(postData.images || []);
      setNewImages([]);
      setIsModified(false);
      setError("");
    }
  }, [postData, show]);

  useEffect(() => {
    const initialTags = postData.tags ? postData.tags.join(", ") : "";
    const hasChanges =
      formData.title !== (postData?.title || "") ||
      formData.location !== (postData?.location || "") ||
      formData.tags !== initialTags ||
      content !== (postData?.content || "") ||
      newImages.length > 0;

    setIsModified(hasChanges);
  }, [formData, content, newImages, postData]);

  const getTextFromHTML = (html) => {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = html;
    return tempDiv.textContent || tempDiv.innerText || "";
  };

  const isContentValid = () => {
    const text = getTextFromHTML(content);
    return text.trim().length >= 2 && text.trim().length <= 5000;
  };

  const isFormValid =
    validateField("title", formData.title) &&
    validateField("location", formData.location) &&
    validateField("tags", formData.tags) &&
    isContentValid();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    setNewImages(Array.from(e.target.files));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isFormValid) {
      toast.warning("Please fill out all fields correctly.");
      return;
    }

    setLoading(true);
    setError("");

    toast.info("Updating post...", {
      autoClose: false,
      toastId: "updating-post",
    });

    try {
      const cleanContent = sanitizeContent(content);
      const updatedFields = {};
      if (formData.title !== (postData?.title || ""))
        updatedFields.title = formData.title;
      if (formData.location !== (postData?.location || ""))
        updatedFields.location = formData.location;
      if (content !== (postData?.content || ""))
        updatedFields.content = cleanContent;

      const initialTagsArray = postData.tags || [];
      const newTagsArray = formData.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean);
      if (
        JSON.stringify(newTagsArray.sort()) !==
        JSON.stringify(initialTagsArray.sort())
      ) {
        updatedFields.tags = newTagsArray;
      }
      await onPostUpdated(updatedFields, newImages);

      toast.dismiss("updating-post");
      toast.success("Post updated successfully!");
      handleClose();
    } catch (err) {
      toast.dismiss("updating-post");
      setError(err.message || "Failed to update post.");
      toast.error("Failed to update post.");
    } finally {
      setLoading(false);
    }
  };

  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline"],
      [{ list: "ordered" }],
    ],
  };

  const formats = ["header", "bold", "italic", "underline", "list"];

  return (
    <Modal
      show={show}
      onHide={handleClose}
      centered
      dialogClassName="edit-post-modal"
    >
      <Modal.Header closeButton className="border-0">
        <Modal.Title className="fw-bold">Edit Post</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Title</Form.Label>
            <Form.Control
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              isInvalid={!validateField("title", formData.title)}
              disabled={loading}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Location</Form.Label>
            <Form.Control
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
              isInvalid={!validateField("location", formData.location)}
              disabled={loading}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Tags (comma separated)</Form.Label>
            <Form.Control
              name="tags"
              value={formData.tags}
              onChange={handleChange}
              isInvalid={!validateField("tags", formData.tags)}
              disabled={loading}
            />
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label>Current Images</Form.Label>
            {currentImages.length > 0 ? (
              <div className="d-flex flex-wrap mb-2">
                {currentImages.map((imgUrl, index) => (
                  <img
                    key={index}
                    src={imgUrl}
                    alt={`Current Post Image ${index}`}
                    className="img-thumbnail me-2 mb-2"
                    style={{
                      width: "80px",
                      height: "80px",
                      objectFit: "cover",
                    }}
                  />
                ))}
              </div>
            ) : (
              <p className="text-white">No existing images.</p>
            )}

            <Form.Label className="mt-2">
              Upload New Images (replaces old ones)
            </Form.Label>
            <Form.Control
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageChange}
              disabled={loading}
            />
            <Form.Text>
              Uploading new images will replace existing ones. Select all images
              you want for this post.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-5 py-3">
            <Form.Label>Content</Form.Label>
            <div
              className={`quill-editor ${
                !isContentValid() ? "is-invalid" : ""
              }`}
            >
              <ReactQuill
                theme="snow"
                value={content}
                onChange={setContent}
                modules={modules}
                formats={formats}
                placeholder="Write your post here..."
                disabled={loading}
              />
            </div>
            {!isContentValid() && (
              <div className="invalid-feedback d-block">
                Content must be between 2 and 5000 characters.
              </div>
            )}
          </Form.Group>

          {!isModified && (
            <Form.Text className="mb-3 d-block text-center text-warning">
              No changes detected.
            </Form.Text>
          )}

          <div className="d-flex justify-content-end align-items-center mt-5 gap-2">
            <CustomButton
              variant="outline"
              onClick={handleClose}
              disabled={loading}
            >
              Cancel
            </CustomButton>

            <CustomButton
              type="submit"
              variant="accent"
              disabled={loading || !isModified || !isFormValid}
            >
              {loading ? (
                <Spinner size="sm" animation="border" variant="light" />
              ) : (
                "Save Changes"
              )}
            </CustomButton>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default EditPostModal;
