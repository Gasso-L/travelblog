import {
  Modal,
  Form,
  Spinner,
  Alert,
  Image,
  InputGroup,
} from "react-bootstrap";
import { useFormValidation } from "../../../hooks/useFormValidation";
import { useProfile } from "../../../contexts/ProfileContext";
import { validateField } from "../../../utility/validation";
import { useAuth } from "../../../contexts/AuthContext";
import CustomButton from "../../button/CustomButton";
import { FaEye, FaEyeSlash } from "react-icons/fa";
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
  const [preview, setPreview] = useState("");
  const [avatarFile, setAvatarFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isModified, setIsModified] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);
  const toggleConfirmPasswordVisibility = () =>
    setShowConfirmPassword((prev) => !prev);

  const { userProfile } = useProfile();
  const { token, handleLogout } = useAuth();
  const navigate = useNavigate();
  const isLocalUser = userData?.authProvider === "local";

  const {
    values,
    setValues,
    handleChange,
    handleBlur,
    getFeedback,
    isFieldValid,
    isFormValid,
    isModifiedFieldValid,
    dirty,
    resetForm,
  } = useFormValidation({
    firstName: "",
    lastName: "",
    userName: "",
    email: "",
    password: "",
    bio: "",
    confirmPassword: "",
  });

  useEffect(() => {
    if (userData) {
      setValues({
        firstName: userData.firstName || "",
        lastName: userData.lastName || "",
        userName: userData.userName || "",
        email: userData.email || "",
        password: "",
        bio: userData.bio || "",
        confirmPassword: "",
      });
      setPreview(userData.avatar || "");
      setAvatarFile(null);
    }
  }, [userData, show]);

  useEffect(() => {
    const hasChanges =
      values.firstName !== userData?.firstName ||
      values.lastName !== userData?.lastName ||
      values.userName !== (userData?.userName || "") ||
      values.email !== userData?.email ||
      values.password.length > 0 ||
      values.bio !== userData?.bio ||
      avatarFile !== null;

    setIsModified(hasChanges);
  }, [values, avatarFile, userData]);

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
    if (values.firstName !== userData.firstName)
      payload.firstName = values.firstName;
    if (values.lastName !== userData.lastName)
      payload.lastName = values.lastName;
    if (values.userName !== (userData.userName || ""))
      payload.userName = values.userName;
    if (values.email !== userData.email) payload.email = values.email;
    if (values.password.length > 0) payload.password = values.password;
    if (values.bio !== userData.bio) payload.bio = values.bio;

    try {
      if (Object.keys(payload).length > 0) {
        await onProfileUpdated(payload);
      }

      if (payload.email || payload.password) {
        handleLogout("Email or password changed. Please log in again.");
        return;
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
            headers: { authorization: token },
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
      size="lg"
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

          {["firstName", "lastName", "userName", "bio"].map((field) => (
            <Form.Group className="mb-3" key={field}>
              <Form.Label>
                {field === "userName"
                  ? "Username"
                  : field === "bio"
                  ? "Bio"
                  : field.replace(/^\w/, (c) => c.toUpperCase())}
              </Form.Label>
              <Form.Control
                name={field}
                type="text"
                as={field === "bio" ? "textarea" : undefined}
                rows={field === "bio" ? 3 : undefined}
                value={values[field]}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={dirty[field] && !!getFeedback(field)}
                required
              />
              {dirty[field] && getFeedback(field) && (
                <Form.Control.Feedback type="invalid">
                  {getFeedback(field)}
                </Form.Control.Feedback>
              )}
            </Form.Group>
          ))}

          {isLocalUser && (
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                name="email"
                type="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={dirty.email && !!getFeedback("email")}
                required
              />
              {dirty.email && getFeedback("email") && (
                <Form.Control.Feedback type="invalid">
                  {getFeedback("email")}
                </Form.Control.Feedback>
              )}
            </Form.Group>
          )}

          {isLocalUser && (
            <Form.Group className="mb-4">
              <Form.Label>New Password</Form.Label>
              <InputGroup hasValidation>
                <Form.Control
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Leave blank to keep current password"
                  isInvalid={dirty.password && !!getFeedback("password")}
                />
                <InputGroup.Text
                  onClick={togglePasswordVisibility}
                  style={{ cursor: "pointer" }}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </InputGroup.Text>
                {dirty.password && getFeedback("password") && (
                  <Form.Control.Feedback type="invalid">
                    {getFeedback("password")}
                  </Form.Control.Feedback>
                )}
              </InputGroup>
            </Form.Group>
          )}

          {isLocalUser && values.password.length > 0 && (
            <Form.Group className="mb-4">
              <Form.Label>Confirm New Password</Form.Label>
              <InputGroup hasValidation>
                <Form.Control
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  value={values.confirmPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={
                    dirty.confirmPassword && !!getFeedback("confirmPassword")
                  }
                  required
                />
                <InputGroup.Text
                  onClick={toggleConfirmPasswordVisibility}
                  style={{ cursor: "pointer" }}
                >
                  {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                </InputGroup.Text>
                {dirty.confirmPassword && getFeedback("confirmPassword") && (
                  <Form.Control.Feedback type="invalid">
                    {getFeedback("confirmPassword")}
                  </Form.Control.Feedback>
                )}
              </InputGroup>
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
              disabled={loading || !isModified || !isModifiedFieldValid()}
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
