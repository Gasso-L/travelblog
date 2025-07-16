import { Container, Card, Spinner, Alert, Image } from "react-bootstrap";
import { useComments } from "../../contexts/CommentContext";
import StarDisplay from "./partials/StarDisplay";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import "./commentsection.css";

const CommentSection = ({ postId }) => {
  const {
    comments,
    loadingComments,
    errorComments,
    getCommentsByPostId,
    postRatings,
  } = useComments();

  useEffect(() => {
    getCommentsByPostId(postId);
  }, [postId]);

  if (loadingComments)
    return (
      <Container className="text-center py-5">
        <Spinner animation="border" variant="warning" />
      </Container>
    );

  if (errorComments)
    return (
      <Container>
        <Alert
          variant="danger"
          className="d-flex flex-column justify-content-center my-5"
        >
          <p className="text-center pt-5">
            Ops...something went wrong. Please try later!
          </p>
          <div className="d-flex justify-content-center align-items-center m-4">
            <Link to="/" className="btn btn-warning">
              Go Back
            </Link>
          </div>
        </Alert>
      </Container>
    );
  const sortedComments = [...comments].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  return (
    <section className="mt-5">
      <h4 className="mb-4 fw-bold">Comments</h4>

      {sortedComments.length === 0 ? (
        <p className="fst-italic">No comments yet... be the first!</p>
      ) : (
        sortedComments.map((comment) => {
          const userRating = postRatings?.find(
            (r) => r.user === String(comment.user?._id)
          );

          return (
            <Card
              key={comment._id}
              className="mb-3 shadow-sm rounded-4 border-0 comment-card"
            >
              <Card.Body className="d-flex gap-3">
                <div>
                  <Image
                    src={
                      comment.user?.avatar ||
                      "https://res.cloudinary.com/dkfcilr87/image/upload/v1752317559/avatar9_ul9bmv.png"
                    }
                    roundedCircle
                    style={{
                      width: "50px",
                      height: "50px",
                      objectFit: "cover",
                    }}
                    alt="avatar"
                    referrerPolicy="no-referrer"
                  />
                </div>

                <div>
                  <div className="fw-semibold">
                    {comment.user?.firstName ||
                      comment.user?.userName ||
                      "Anonymous"}
                  </div>

                  <div className="text-muted mb-2 small">
                    {new Date(comment.createdAt).toLocaleDateString("en-GB", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </div>

                  <div className="fs-6">{comment.content}</div>

                  {userRating && (
                    <div className="d-flex align-items-center gap-2 mt-2">
                      <StarDisplay value={userRating?.value || 0} />
                      <span className="small text-muted">
                        {userRating ? `${userRating.value}/5` : "No rating"}
                      </span>
                    </div>
                  )}
                </div>
              </Card.Body>
            </Card>
          );
        })
      )}
    </section>
  );
};

export default CommentSection;
