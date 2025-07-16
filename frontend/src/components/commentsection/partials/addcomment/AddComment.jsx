import { useComments } from "../../../../contexts/CommentContext";
import { useAuth } from "../../../../contexts/AuthContext";
import CustomButton from "../../../button/CustomButton";
import { Form, Button } from "react-bootstrap";
import { FaStar } from "react-icons/fa";
import { toast } from "react-toastify";
import { useState } from "react";

const AddComment = ({ postId, onCommentAdded }) => {
  const [rating, setRating] = useState(0);
  const [hasCommented, setHasCommented] = useState(false);
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const { addCommentToPost, getCommentsByPostId } = useComments();
  const { token, user } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim()) return toast.warning("Comment cannot be empty");
    if (content.length < 5 || content.length > 1000) {
      return toast.warning("Comment must be between 5 and 1000 characters");
    }

    setLoading(true);
    try {
      await addCommentToPost(postId, content, token, rating);
      toast.success("Comment added!");
      setContent("");
      setHasCommented(true);

      await getCommentsByPostId(postId);

      if (typeof onCommentAdded === "function") {
        await onCommentAdded();
      }
    } catch (err) {
      toast.error("Failed to add comment");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form onSubmit={handleSubmit} className="mb-4">
      <Form.Group controlId="commentContent">
        <Form.Label className="fw-semibold">Add a comment</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write your thoughts..."
        />
      </Form.Group>
      {!hasCommented && (
        <div className="d-flex gap-2 align-items-center mt-3">
          {[1, 2, 3, 4, 5].map((star) => (
            <FaStar
              key={star}
              onClick={() => setRating(star)}
              style={{
                cursor: "pointer",
                color: star <= rating ? "#ffc107" : "#ccc",
                transition: "color 0.2s",
              }}
              size={24}
            />
          ))}
          <span className="small ms-2">{rating}/5</span>
        </div>
      )}

      {hasCommented && (
        <p className="text-muted fst-italic mt-3">
          You rated this post {rating}/5
        </p>
      )}

      <div className="d-flex justify-content-end mt-2">
        <CustomButton type="submit" variant="accent" disabled={loading}>
          {loading ? "Posting..." : "Post Comment"}
        </CustomButton>
      </div>
    </Form>
  );
};

export default AddComment;
