import { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Spinner,
  Alert,
} from "react-bootstrap";
import { FiEye, FiPlusCircle, FiEdit } from "react-icons/fi";
import { useNavigate, useLocation } from "react-router-dom";
import { useProfile } from "../../contexts/ProfileContext";
import EditProfileModal from "./partials/EditProfileModal";
import DeletePostButton from "./partials/DeletePostButton";
import { useAuth } from "../../contexts/AuthContext";
import CustomButton from "../button/CustomButton";
import { Link } from "react-router-dom";
import "./profiledetails.css";

const ProfileDetails = () => {
  const { token } = useAuth();
  const {
    userData,
    userPosts,
    loading,
    error,
    setError,
    updateProfile,
    deletePost,
    userProfile,
  } = useProfile();

  const location = useLocation();

  const [showEditModal, setShowEditModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (location.state?.refresh && token) {
      userProfile();
    }
  }, [location.state, token]);

  if (loading) {
    return (
      <Container className="py-5 text-center">
        <Spinner animation="border" variant="warning" />
      </Container>
    );
  }

  return (
    <Container className="py-5">
      {error && (
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
      )}

      <Row className="mb-4">
        <Col md={6} className="mx-auto">
          <Card className="profile-card shadow-sm">
            <Card.Body className="text-center">
              <img
                src={
                  userData.avatar ||
                  "https://res.cloudinary.com/dkfcilr87/image/upload/v1752317559/avatar9_ul9bmv.png"
                }
                alt="Avatar"
                className="profile-avatar mb-3"
                referrerPolicy="no-referrer"
              />
              <h4 className="fw-bold">
                {userData.firstName} {userData.lastName}
              </h4>
              <h6>{userData.email}</h6>
              <div className="d-flex justify-content-center gap-3 flex-wrap my-5">
                <CustomButton
                  variant="accent"
                  onClick={() => navigate("/create-post")}
                  className="d-flex justify-content-center align-items-center gap-2"
                >
                  <FiPlusCircle />
                  Create New Post
                </CustomButton>
                <CustomButton
                  variant="outline"
                  className="d-flex justify-content-center align-items-center gap-2"
                  onClick={() => setShowEditModal(true)}
                >
                  <FiEdit />
                  Edit Profile
                </CustomButton>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <h3 className="my-4 fw-bold">Your Posts</h3>
      <Row className={userPosts?.length > 0 ? "wrapper-post py-4" : ""}>
        {!Array.isArray(userPosts) || userPosts.length === 0 ? (
          <p>You haven't created any posts yet...</p>
        ) : (
          userPosts.map((post) => (
            <Col md={6} lg={4} key={post._id} className="mb-4">
              <Card className="post-profile-card h-100 rounded-4">
                <Card.Body>
                  <Card.Title className="text-truncate">
                    {post.title}
                  </Card.Title>
                  <Card.Text className="text-truncate">
                    {post.location}
                  </Card.Text>
                  <div className="d-flex d-lg-flex flex-lg-column gap-lg-3 justify-content-between align-items-center mt-5">
                    <CustomButton
                      variant="outline"
                      onClick={() => navigate(`/posts/${post._id}`)}
                      className="d-flex justify-content-center align-items-center gap-2"
                    >
                      <FiEye />
                      View Post
                    </CustomButton>
                    <DeletePostButton
                      postId={post._id}
                      onDeleted={deletePost}
                    />
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))
        )}
      </Row>

      <EditProfileModal
        show={showEditModal}
        handleClose={() => setShowEditModal(false)}
        userData={userData}
        onProfileUpdated={updateProfile}
      />
    </Container>
  );
};

export default ProfileDetails;
