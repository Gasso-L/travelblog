import { Container, Row, Col, Badge, Spinner, Alert } from "react-bootstrap";
import AddComment from "../commentsection/partials/addcomment/AddComment";
import PostAuthor from "../blog/partials/postauthor/PostAuthor";
import CommentSection from "../commentsection/CommentSection";
import PostGallery from "./partials/postgallery/PostGallery";
import { usePosts } from "../../contexts/PostContext";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";
import { Link, Navigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import CustomButton from "../button/CustomButton";

import "./postdetail.css";

const PostDetail = () => {
  const { id } = useParams();
  const { getPostById } = usePosts();
  const [post, setPost] = useState(null);
  const [localError, setLocalError] = useState("");
  const [loading, setLoading] = useState(true);
  const { userId } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const getPost = async () => {
      setLoading(true);
      try {
        const data = await getPostById(id);

        if (!data) {
          setLocalError("Post not found");
        } else {
          setPost(data);
        }
      } catch (err) {
        setLocalError("Failed to load post");
      } finally {
        setLoading(false);
      }
    };
    getPost();
  }, [id]);

  if (loading) {
    return (
      <Container className="text-center py-5">
        <Spinner animation="border" variant="warning" />
      </Container>
    );
  }

  if (localError) {
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
  }

  if (!post) {
    return null;
  }

  const { title, location, images, ratings, tags, content, author } = post;

  const avgRating = ratings.length
    ? (ratings.reduce((sum, r) => sum + r.value, 0) / ratings.length).toFixed(1)
    : "N/A";
  const isAuthor = String(userId) === String(author._id);
  const hasAlreadyCommented = post.comments?.some(
    (comment) => String(comment.user._id) === String(userId)
  );

  const handleCommentAdded = async () => {
    const updatedPost = await getPostById(id);
    if (updatedPost) {
      setPost(updatedPost);
    }
  };

  return (
    <Container className="post-detail-page rounded-5 p-4 mb-5">
      <PostGallery images={images} />

      <div className="text-center my-4">
        <h1 className="fw-bold display-5 pb-1">{title}</h1>
        <p className="fs-5 fst-italic">{location}</p>
        <div className="text-sm d-flex justify-content-center align-items-center py-2">
          <FaStar className="me-1 star-icon" />
          <div>Average rating: {avgRating}</div>
        </div>
      </div>

      <div className="text-center pt-2 mb-5">
        {tags.map((tag) => (
          <Badge key={tag} bg="secondary" className="me-2">
            #{tag}
          </Badge>
        ))}
      </div>

      <Row className="justify-content-center">
        <Col lg={8}>
          <div
            className="post-content fs-5 lh-lg"
            dangerouslySetInnerHTML={{ __html: content }}
          ></div>

          <div className="mt-5">
            <PostAuthor {...author} />
          </div>

          <div className="mt-5">
            {!userId ? (
              <Alert
                variant="light"
                className="text-center mt-4 rounded-3 shadow-sm"
              >
                <p className="mb-3">
                  You must be logged in to comment on this post.
                </p>
                <CustomButton
                  variant="danger"
                  onClick={() => navigate("/login")}
                >
                  Login
                </CustomButton>
              </Alert>
            ) : isAuthor ? (
              <Alert
                variant="warning"
                className="text-center mt-4 rounded-3 shadow-sm"
              >
                <strong>Note:</strong> You are the author of this post and
                cannot comment on it.
              </Alert>
            ) : hasAlreadyCommented ? (
              <Alert
                variant="info"
                className="text-center mt-4 rounded-3 shadow-sm"
              >
                <strong>Note:</strong> You have already commented on this post.
              </Alert>
            ) : (
              <AddComment
                postId={post._id}
                onCommentAdded={handleCommentAdded}
              />
            )}

            <CommentSection postId={post._id} />
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default PostDetail;
