import { Container, Row, Col, Spinner, Alert, Card } from "react-bootstrap";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useProfile } from "../../contexts/ProfileContext";
import PostCard from "../blog/partials/postcard/PostCard";
import "./publicprofiledetails.css";
import { useEffect } from "react";

const PublicProfileDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    publicUserData,
    publicUserPosts,
    getPublicProfile,
    loading,
    error,
    userData: loggedInUserData,
  } = useProfile();

  useEffect(() => {
    if (id) {
      getPublicProfile(id);
    }
  }, [id, getPublicProfile]);

  if (loading) {
    return (
      <Container className="py-5 text-center fade-in">
        <Spinner animation="border" variant="warning" />
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <Alert
          variant="danger"
          className="d-flex flex-column justify-content-center my-5 fade-in"
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

  if (!publicUserData) {
    return (
      <Container>
        <Alert
          variant="dark"
          className="d-flex flex-column justify-content-center my-5 fade-in"
        >
          <p className="text-center pt-5">
            User profile not found or unavailable.
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

  return (
    <Container className="mt-5 fade-in">
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <Card className="shadow-sm border-0 rounded-4 profile-card-slide-in">
            <Card.Body className="p-4 text-center">
              <div className="mb-4">
                <img
                  src={
                    publicUserData.avatar ||
                    "https://res.cloudinary.com/dkfcilr87/image/upload/v1752317559/avatar9_ul9bmv.png"
                  }
                  alt={`${publicUserData.userName}'s avatar`}
                  style={{
                    width: "150px",
                    height: "150px",
                    objectFit: "cover",
                  }}
                  className="avatar-pop-in rounded-circle"
                />
              </div>
              <Card.Title as="h1" className="mb-1 text-dark">
                {publicUserData.firstName}
              </Card.Title>
              <Card.Subtitle className="text-muted fs-5 mb-3">
                @{publicUserData.userName}
              </Card.Subtitle>

              {publicUserData.bio ? (
                <Card.Text className="mb-4">
                  <strong>Bio:</strong> {publicUserData.bio}
                </Card.Text>
              ) : (
                <Card.Text className="mb-4 text-muted">
                  <strong>Bio:</strong> No Bio yet
                </Card.Text>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <div className="my-5">
        <h2 className="text-center mb-4 fade-in">
          {publicUserData.userName}'s Posts
        </h2>
        {publicUserPosts.length > 0 ? (
          <Row>
            {publicUserPosts.map((post, index) => (
              <Col
                key={post._id}
                md={6}
                lg={4}
                className="mb-4 post-card-enter"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <PostCard post={post} />
              </Col>
            ))}
          </Row>
        ) : (
          <p className="text-center fade-in">No posts to display.</p>
        )}
      </div>
    </Container>
  );
};

export default PublicProfileDetails;
