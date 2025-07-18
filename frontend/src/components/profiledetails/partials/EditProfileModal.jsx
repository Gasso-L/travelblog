import { Modal, Form, Spinner, Alert, Image } from "react-bootstrap";
import { useProfile } from "../../../contexts/ProfileContext";
import { validateField } from "../../../utility/validation";
import { useAuth } from "../../../contexts/AuthContext";
import CustomButton from "../../button/CustomButton";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

import "./editprofilemodal.css";

const EditProfileModal = ({
  show,
  handleClose,
  userData,
  onProfileUpdated,
}) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    bio: "",
  });
  const [preview, setPreview] = useState("");
  const [avatarFile, setAvatarFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isModified, setIsModified] = useState(false);

  const isFormValid =
    validateField("firstName", formData.firstName) &&
    validateField("lastName", formData.lastName) &&
    validateField("email", formData.email) &&
    validateField("bio", formData.bio) &&
    (formData.password.length === 0 ||
      validateField("password", formData.password));

  const { userProfile } = useProfile();
  const { token } = useAuth();
  const navigate = useNavigate();

  const email = userData?.email || "";
  const isSocialUser =
    email.includes("@gmail.com") || email.includes("github.local");
  const isLocalUser = !isSocialUser;

  useEffect(() => {
    if (userData) {
      setFormData({
        firstName: userData.firstName || "",
        lastName: userData.lastName || "",
        email: userData.email || "",
        password: "",
        bio: userData.bio || "",
      });
      setPreview(userData.avatar || "");
      setAvatarFile(null);
    }
  }, [userData, show]);

  useEffect(() => {
    const hasChanges =
      formData.firstName !== userData?.firstName ||
      formData.lastName !== userData?.lastName ||
      formData.email !== userData?.email ||
      formData.password.length > 0 ||
      formData.bio !== userData?.bio ||
      avatarFile !== null;

    setIsModified(hasChanges);
  }, [formData, avatarFile, userData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setAvatarFile(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const payload = {};
    if (formData.firstName !== userData.firstName)
      payload.firstName = formData.firstName;
    if (formData.lastName !== userData.lastName)
      payload.lastName = formData.lastName;
    if (formData.email !== userData.email) payload.email = formData.email;
    if (formData.password.length > 0) payload.password = formData.password;
    if (formData.bio !== userData.bio) payload.bio = formData.bio;

    try {
      if (Object.keys(payload).length > 0) {
        await onProfileUpdated(payload);
      }

      if (avatarFile) {
        const avatarFormData = new FormData();
        avatarFormData.append("avatar", avatarFile);

        const res = await fetch(
          `${import.meta.env.VITE_SERVER_BASE_URL}/users/${
            userData._id
          }/avatar`,
          {
            method: "PATCH",
            headers: {
              authorization: token,
            },
            body: avatarFormData,
          }
        );

        if (!res.ok) throw new Error("Failed to upload avatar");
      }

      await userProfile();
      toast.success("Profile updated successfully");
      handleClose();

      setTimeout(() => {
        navigate("/profile");
      }, 1000);
    } catch (err) {
      setError("Failed to update profile. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      show={show}
      onHide={handleClose}
      centered
      dialogClassName="edit-profile-modal"
    >
      <Modal.Header closeButton className="border-0">
        <Modal.Title className="fw-bold">Edit Profile</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleSubmit}>
          <div className="text-center mb-4">
            <Image
              src={
                preview ||
                "https://res.cloudinary.com/dkfcilr87/image/upload/v1752317559/avatar9_ul9bmv.png"
              }
              roundedCircle
              className="profile-avatar-preview mb-3"
              style={{ width: "100px", height: "100px", objectFit: "cover" }}
            />
            <Form.Control
              type="file"
              accept="image/*"
              onChange={handleAvatarChange}
              className="mt-2"
            />
          </div>

          <Form.Group className="mb-3">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
              isInvalid={!validateField("firstName", formData.firstName)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
              isInvalid={!validateField("lastName", formData.lastName)}
            />
          </Form.Group>
          <Form.Group className="mb-4">
            <Form.Label>Email</Form.Label>
            <Form.Control
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              isInvalid={!validateField("email", formData.email)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-4">
            <Form.Label>Bio</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              placeholder="Tell us something about yourself..."
              isInvalid={!validateField("bio", formData.bio)}
              required
            />
          </Form.Group>

          {isLocalUser && (
            <Form.Group className="mb-4">
              <Form.Label>New Password</Form.Label>
              <Form.Control
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Leave blank to keep current password"
                isInvalid={!validateField("password", formData.password)}
              />
            </Form.Group>
          )}

          {!isModified && (
            <Form.Text className="mb-3 d-block text-center">
              No changes detected.
            </Form.Text>
          )}

          <div className="d-flex justify-content-end gap-3 mt-4">
            <CustomButton variant="ghost" onClick={handleClose}>
              Cancel
            </CustomButton>
            <CustomButton
              type="submit"
              variant="accent"
              disabled={loading || !isModified || !isFormValid}
            >
              {loading ? (
                <Spinner animation="border" size="sm" variant="light" />
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

export default EditProfileModal;
