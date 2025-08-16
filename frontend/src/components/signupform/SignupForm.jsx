import { Container, Row, Col, Form, InputGroup, Alert } from "react-bootstrap";
import { useFormValidation } from "../../hooks/useFormValidation";
import { FaEye, FaEyeSlash, FaCheckCircle } from "react-icons/fa";
import OAuthButtons from "../button/oauthbuttons/OAuthButtons";
import { useNavigate, Link } from "react-router-dom";
import CustomButton from "../button/CustomButton";
import { toast } from "react-toastify";
import { useState } from "react";
import "./signupform.css";

const SignupForm = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    avatar:
      "https://res.cloudinary.com/dkfcilr87/image/upload/v1752317559/avatar9_ul9bmv.png",
  };

  const {
    values,
    handleChange,
    handleBlur,
    touched,
    errors,
    isFieldValid,
    isFormValid,
    resetForm,
  } = useFormValidation(initialValues);

  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);
  const toggleConfirmPasswordVisibility = () =>
    setShowConfirmPassword((prev) => !prev);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isFormValid()) {
      toast.error("Please correct the highlighted fields.");
      return;
    }

    if (values.password !== values.confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    try {
      const { confirmPassword, ...payload } = values;

      const res = await fetch(`${import.meta.env.VITE_SERVER_BASE_URL}/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || "Registration failed");
      }

      toast.success("Account created - Please Log In");
      resetForm();
      setTimeout(() => navigate("/login"), 2500);
    } catch (err) {
      toast.error(err.message);
      resetForm();
    }
  };

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col xs={12} sm={10} md={8} lg={6}>
          <h2 className="mb-5 fw-bold">Sign Up</h2>
          <OAuthButtons />
          <hr className="my-3" />

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="firstName">
              <Form.Label>First Name*</Form.Label>
              <Form.Control
                type="text"
                name="firstName"
                value={values.firstName}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={touched.firstName && !!errors.firstName}
              />
              <Form.Control.Feedback type="invalid">
                {errors.firstName}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="lastName">
              <Form.Label>Last Name*</Form.Label>
              <Form.Control
                type="text"
                name="lastName"
                value={values.lastName}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={touched.lastName && !!errors.lastName}
              />
              <Form.Control.Feedback type="invalid">
                {errors.lastName}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Email*</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={touched.email && !!errors.email}
              />
              <Form.Control.Feedback type="invalid">
                {errors.email}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="password">
              <Form.Label>Password* (min 12 characters)</Form.Label>
              <InputGroup hasValidation>
                <Form.Control
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={touched.password && !!errors.password}
                />
                <InputGroup.Text
                  onClick={togglePasswordVisibility}
                  style={{ cursor: "pointer" }}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </InputGroup.Text>
                <Form.Control.Feedback type="invalid">
                  {errors.password}
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>

            <Form.Group className="mb-3" controlId="confirmPassword">
              <Form.Label>Confirm Password*</Form.Label>
              <InputGroup hasValidation>
                <Form.Control
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={values.confirmPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={
                    touched.confirmPassword && !!errors.confirmPassword
                  }
                />
                <InputGroup.Text
                  onClick={toggleConfirmPasswordVisibility}
                  style={{ cursor: "pointer" }}
                >
                  {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                </InputGroup.Text>
                <Form.Control.Feedback type="invalid">
                  {errors.confirmPassword}
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>

            <CustomButton
              type="submit"
              variant="accent"
              className="w-100 mt-3"
              disabled={!isFormValid()}
            >
              Register
            </CustomButton>
          </Form>

          <div className="mt-3 text-center">
            Already registered?{" "}
            <Link to="/login" className="text-decoration-none login-link">
              Log in here
            </Link>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default SignupForm;
