import { sanitizeContent } from "../../utility/sanitizeContent";
import { Form, Card, Alert, Spinner } from "react-bootstrap";
import { validateField } from "../../utility/validation";
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
  const [formData, setFormData] = useState({
    title: "",
    location: "",
    tags: "",
  });
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState([]);
  const navigate = useNavigate();

  const getTextFromHTML = (html) => {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = html;
    return tempDiv.textContent || tempDiv.innerText || "";
  };

  const isContentValid = () => {
    const text = getTextFromHTML(content);
    return text.trim().length >= 2 && text.trim().length <= 5000;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    setImages(Array.from(e.target.files));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const cleanContent = sanitizeContent(content);

    const postPayload = {
      ...formData,
      tags: formData.tags.split(",").map((tag) => tag.trim()),
      content: cleanContent,
    };

    const createdPost = await createPost(postPayload, token);
    if (!createdPost) return setLoading(false);

    if (images.length > 0) {
      await uploadImages(createdPost._id, images);
    }
    toast.success("Post created!");

    navigate("/profile", { state: { refresh: true } });
  };

  const isFormValid =
    validateField("title", formData.title) &&
    validateField("location", formData.location) &&
    validateField("tags", formData.tags) &&
    isContentValid();

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
            value={formData.title}
            onChange={handleChange}
            required
            isInvalid={!validateField("title", formData.title)}
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
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Tags (comma separated)</Form.Label>
          <Form.Control
            name="tags"
            value={formData.tags}
            onChange={handleChange}
            isInvalid={!validateField("tags", formData.tags)}
          />
        </Form.Group>

        <Form.Group className="mb-4">
          <Form.Label>Images</Form.Label>
          <Form.Control
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageChange}
          />
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
