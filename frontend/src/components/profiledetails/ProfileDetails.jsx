import { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Accordion,
  Spinner,
  Alert,
} from "react-bootstrap";
import { FiEye, FiPlusCircle, FiEdit } from "react-icons/fi";
import EditPostModal from "../postdetail/partials/editpostmodal/EditPostModal";
import { useNavigate, useLocation } from "react-router-dom";
import { useProfile } from "../../contexts/ProfileContext";
import EditProfileModal from "./partials/EditProfileModal";
import DeletePostButton from "./partials/DeletePostButton";
import { usePosts } from "../../contexts/PostContext";
import { useAuth } from "../../contexts/AuthContext";
import CustomButton from "../button/CustomButton";
import { MdLocationOn } from "react-icons/md";
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
    setUserPosts,
  } = useProfile();

  const location = useLocation();

  const [selectedPost, setSelectedPost] = useState(null);
  const [showEditPostModal, setShowEditPostModal] = useState(false);

  const [showEditModal, setShowEditModal] = useState(false);
  const navigate = useNavigate();

  const { updatePost, uploadImages } = usePosts();

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

  const handleOpenEditPostModal = (post) => {
    setSelectedPost(post);
    setShowEditPostModal(true);
  };

  const handleCloseEditPostModal = () => {
    setShowEditPostModal(false);
    setSelectedPost(null);
  };

  const handlePostUpdate = async (updatedFields, newImages) => {
    if (!selectedPost) return;

    try {
      const updatedPost = await updatePost(
        selectedPost._id,
        updatedFields,
        token
      );
      let finalPost = updatedPost;

      if (newImages.length > 0) {
        const postWithImages = await uploadImages(selectedPost._id, newImages);
        finalPost = postWithImages;
      }

      const updatedPosts = userPosts.map((p) =>
        p._id === finalPost._id ? finalPost : p
      );
      setUserPosts(updatedPosts);

      setSelectedPost(finalPost);

      handleCloseEditPostModal();
    } catch (err) {
      handleCloseEditPostModal();
    }
  };

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
      <Row
        className={
          userPosts?.length > 0
            ? "wrapper-post wrapper-post-scrollable py-4"
            : ""
        }
      >
        {!Array.isArray(userPosts) || userPosts.length === 0 ? (
          <p>You haven't created any posts yet...</p>
        ) : (
          <Accordion className="mx-auto mt-4 accordion-posts">
            {userPosts.map((post) => (
              <Accordion.Item eventKey={String(post._id)} key={post._id}>
                <Accordion.Header>{post.title}</Accordion.Header>
                <Accordion.Body>
                  <p className="mb-1 text-muted d-flex justify-content-start align-items-center gap-1">
                    <MdLocationOn size={16} className="text-white" />
                    <strong className="text-white">{post.location}</strong>
                  </p>
                  <div className="mb-4">
                    {post.tags.map((tag) => (
                      <span key={tag} className="badge bg-secondary me-1">
                        #{tag}
                      </span>
                    ))}
                  </div>
                  <div className="d-flex flex-column d-md-flex flex-md-row gap-2 gap-md-0 justify-content-md-between align-items-md-center mt-5">
                    <CustomButton
                      variant="outline"
                      onClick={() => navigate(`/posts/${post._id}`)}
                      className="d-flex justify-content-center align-items-center gap-2"
                    >
                      <FiEye />
                      View Post
                    </CustomButton>
                    <CustomButton
                      variant="accent"
                      onClick={() => handleOpenEditPostModal(post)}
                      className="d-flex justify-content-center align-items-center gap-2"
                    >
                      <FiEdit />
                      Edit Post
                    </CustomButton>
                    <DeletePostButton
                      postId={post._id}
                      onDeleted={deletePost}
                    />
                  </div>
                </Accordion.Body>
              </Accordion.Item>
            ))}
          </Accordion>
        )}
      </Row>

      <EditProfileModal
        show={showEditModal}
        handleClose={() => setShowEditModal(false)}
        userData={userData}
        onProfileUpdated={updateProfile}
      />

      {selectedPost && (
        <EditPostModal
          show={showEditPostModal}
          handleClose={handleCloseEditPostModal}
          postData={selectedPost}
          onPostUpdated={handlePostUpdate}
        />
      )}
    </Container>
  );
};

export default ProfileDetails;
