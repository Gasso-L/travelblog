import { useFormValidation } from "../../../../hooks/useFormValidation";
import { sanitizeContent } from "../../../../utility/sanitizeContent";
import { Modal, Form, Spinner, Alert } from "react-bootstrap";
import CustomButton from "../../../button/CustomButton";
import { useState, useEffect, useRef } from "react";
import "react-quill-new/dist/quill.snow.css";
import ReactQuill from "react-quill-new";
import { toast } from "react-toastify";
import "./editpostmodal.css";

const EditPostModal = ({ show, handleClose, postData, onPostUpdated }) => {
  const {
    values,
    handleChange,
    handleBlur,
    touched,
    errors,
    isFormValid,
    setValues,
  } = useFormValidation({
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
  const [isInitialized, setIsInitialized] = useState(false);
  const initialValuesRef = useRef(null);

  useEffect(() => {
    if (postData) {
      const initialTags = postData.tags ? postData.tags.join(", ") : "";

      initialValuesRef.current = {
        title: postData.title || "",
        location: postData.location || "",
        tags: initialTags,
        content: postData.content || "",
      };

      setValues({
        title: postData.title || "",
        location: postData.location || "",
        tags: initialTags,
      });
      setContent(postData.content || "");
      setCurrentImages(postData.images || []);
      setNewImages([]);
      setIsModified(false);
      setError("");
      setIsInitialized(true);
    }
  }, [postData, show]);

  useEffect(() => {
    if (!isInitialized || !initialValuesRef.current) return;
    const sanitize = (html) => sanitizeContent(html).trim();

    const {
      title,
      location,
      tags,
      content: initialContent,
    } = initialValuesRef.current;

    const hasChanges =
      values.title !== title ||
      values.location !== location ||
      values.tags !== tags ||
      sanitize(content) !== sanitize(initialContent) ||
      newImages.length > 0;

    setIsModified(hasChanges);
  }, [values, content, newImages, isInitialized]);

  const getTextFromHTML = (html) => {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = html;
    return tempDiv.textContent || tempDiv.innerText || "";
  };

  const isContentValid = () => {
    const text = getTextFromHTML(content);
    return text.trim().length >= 2 && text.trim().length <= 5000;
  };

  const handleImageChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    if (selectedFiles.length > 10) {
      toast.warning("You can upload up to 10 images.");
      return;
    }
    setNewImages(selectedFiles);
  };

  const removeImage = (indexToRemove) => {
    setNewImages((prevImages) =>
      prevImages.filter((_, idx) => idx !== indexToRemove)
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isFormValid() || !isContentValid()) {
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

      if (values.title !== (postData?.title || ""))
        updatedFields.title = values.title;
      if (values.location !== (postData?.location || ""))
        updatedFields.location = values.location;
      if (content !== (postData?.content || ""))
        updatedFields.content = cleanContent;

      const initialTagsArray = postData.tags || [];
      const newTagsArray = values.tags
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
      animation
      size="lg"
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
              value={values.title}
              onChange={handleChange}
              onBlur={handleBlur}
              isInvalid={touched.title && !!errors.title}
              disabled={loading}
              required
            />
            <Form.Control.Feedback type="invalid">
              {errors.title}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Location</Form.Label>
            <Form.Control
              name="location"
              value={values.location}
              onChange={handleChange}
              onBlur={handleBlur}
              isInvalid={touched.location && !!errors.location}
              disabled={loading}
              required
            />
            <Form.Control.Feedback type="invalid">
              {errors.location}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Tags (comma separated)</Form.Label>
            <Form.Control
              name="tags"
              value={values.tags}
              onChange={handleChange}
              onBlur={handleBlur}
              isInvalid={touched.tags && !!errors.tags}
              disabled={loading}
              required
            />
            <Form.Control.Feedback type="invalid">
              {errors.tags}
            </Form.Control.Feedback>
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

            {newImages.length > 0 && (
              <div className="d-flex flex-wrap gap-2 mt-3">
                {newImages.map((img, idx) => (
                  <div
                    key={idx}
                    style={{
                      position: "relative",
                      width: "80px",
                      height: "80px",
                    }}
                  >
                    <img
                      src={URL.createObjectURL(img)}
                      alt={`preview-${idx}`}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        borderRadius: "6px",
                        border: "1px solid #ccc",
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(idx)}
                      style={{
                        position: "absolute",
                        top: "-6px",
                        right: "-6px",
                        background: "#F59E0B",
                        color: "white",
                        border: "none",
                        borderRadius: "50%",
                        width: "20px",
                        height: "20px",
                        fontSize: "12px",
                        cursor: "pointer",
                      }}
                      title="Remove image"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
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
                <Spinner size="sm" animation="border" variant="warning" />
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
