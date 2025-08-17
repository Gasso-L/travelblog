import { useFormValidation } from "../../hooks/useFormValidation";
import { sanitizeContent } from "../../utility/sanitizeContent";
import { Form, Card, Alert, Spinner } from "react-bootstrap";
import { usePosts } from "../../contexts/PostContext";
import { useAuth } from "../../contexts/AuthContext";
import CustomButton from "../button/CustomButton";
import { useNavigate } from "react-router-dom";
import "react-quill-new/dist/quill.snow.css";
import ReactQuill from "react-quill-new";
import { toast } from "react-toastify";
import { useState } from "react";
import "./createpost.css";

const CreatePostForm = () => {
  const { createPost, uploadImages, error, setError } = usePosts();
  const { token } = useAuth();
  const navigate = useNavigate();

  const {
    values,
    handleChange,
    handleBlur,
    touched,
    errors,
    isFormValid,
    resetForm,
  } = useFormValidation({
    title: "",
    location: "",
    tags: "",
  });

  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState([]);

  const handleImageChange = (e) => {
    const selected = Array.from(e.target.files);
    const total = images.length + selected.length;

    if (total > 10) {
      toast.warning("You can upload up to 10 images.");
      return;
    }

    setImages((prev) => [...prev, ...selected]);
  };

  const removeImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const isContentValid = () => {
    const text = document.createElement("div");
    text.innerHTML = content;
    const plain = text.textContent || text.innerText || "";
    return plain.trim().length >= 2 && plain.trim().length <= 5000;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isFormValid() || !isContentValid()) {
      toast.warning("Please fill out all fields correctly.");
      return;
    }

    setLoading(true);
    setError("");
    toast.info("Creating post...", { autoClose: false, toastId: "creating" });

    try {
      const cleanContent = sanitizeContent(content);
      const postPayload = {
        ...values,
        tags: values.tags.split(",").map((tag) => tag.trim()),
        content: cleanContent,
      };

      const createdPost = await createPost(postPayload, token);
      if (!createdPost || !createdPost._id) {
        throw new Error("Post creation failed or missing _id");
      }

      toast.dismiss("creating");

      if (images.length > 0) {
        toast.info("Uploading images...", {
          autoClose: false,
          toastId: "uploading",
        });
        try {
          await uploadImages(createdPost._id, images);
          toast.dismiss("uploading");
        } catch {
          toast.dismiss("uploading");
          toast.error("Image upload failed");
        }
      }

      toast.success("Post created!");
      resetForm();
      setContent("");
      navigate("/profile", { state: { refresh: true } });
    } catch {
      toast.dismiss("creating");
      toast.error("Something went wrong. Please try again.");
      setError("Something went wrong. Please try again.");
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
    <Card className="p-4 shadow-sm card-add-post">
      <h3 className="mb-4 fw-bold">Create New Post</h3>
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

        <Form.Group className="my-4">
          <Form.Label>Images</Form.Label>
          <Form.Control
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageChange}
            disabled={loading}
          />
          <div className="d-flex flex-wrap gap-2 mt-3">
            {images.map((img, idx) => (
              <div
                key={idx}
                style={{
                  position: "relative",
                  width: "100px",
                  height: "100px",
                }}
              >
                <img
                  src={URL.createObjectURL(img)}
                  alt={`preview-${idx}`}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    borderRadius: "8px",
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
        </Form.Group>

        <Form.Group className="mb-5 py-3">
          <Form.Label>Content</Form.Label>
          <div
            className={`quill-editor ${!isContentValid() ? "is-invalid" : ""}`}
          >
            <ReactQuill
              theme="snow"
              value={content}
              onChange={setContent}
              modules={modules}
              formats={formats}
              placeholder="Write your post here..."
            />
          </div>
          {!isContentValid() && (
            <div className="invalid-feedback d-block">
              Content must be between 2 and 5000 characters.
            </div>
          )}
        </Form.Group>

        <div className="d-flex justify-content-end align-items-center mt-5 gap-2">
          <CustomButton variant="outline" onClick={() => navigate(-1)}>
            Go Back
          </CustomButton>

          <CustomButton
            type="submit"
            variant="accent"
            disabled={loading || !isFormValid}
          >
            {loading ? (
              <Spinner size="sm" animation="border" variant="warning" />
            ) : (
              "Publish Post"
            )}
          </CustomButton>
        </div>
      </Form>
    </Card>
  );
};

export default CreatePostForm;
