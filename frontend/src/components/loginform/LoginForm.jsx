import { Container, Row, Col, Form, Alert } from "react-bootstrap";
import { useFormValidation } from "../../hooks/useFormValidation";
import OAuthButtons from "../button/oauthbuttons/OAuthButtons";
import { useAuth } from "../../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import CustomButton from "../button/CustomButton";
import { toast } from "react-toastify";
import { useState } from "react";
import "./loginform.css";

const LoginForm = ({ onLoginComplete }) => {
  const initialValues = {
    email: "",
    password: "",
  };

  const {
    values,
    handleChange,
    handleBlur,
    touched,
    errors,
    isFormValid,
    resetForm,
  } = useFormValidation(initialValues);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    if (!isFormValid()) {
      setError("Please correct the highlighted fields.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(`${import.meta.env.VITE_SERVER_BASE_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!res.ok) {
        const err = await res.json();
        setError(err.message || "Login failed");
        toast.error("Invalid email or password");
        resetForm();
        return;
      }

      const { token, user } = await res.json();
      login(token, user._id);

      setSuccess(true);
      if (onLoginComplete) onLoginComplete();
      setTimeout(() => navigate("/"), 1500);
    } catch (err) {
      setError(err.message);
      toast.error(err.message || "Something went wrong. Please try later!");
      resetForm();
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col xs={12} sm={10} md={8} lg={6}>
          <h2 className="mb-5 fw-bold">Log In</h2>

          <OAuthButtons />
          <hr className="my-3" />

          <Form onSubmit={handleSubmit}>
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
              <Form.Label>Password*</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={touched.password && !!errors.password}
              />
              <Form.Control.Feedback type="invalid">
                {errors.password}
              </Form.Control.Feedback>
            </Form.Group>

            <CustomButton
              type="submit"
              variant="accent"
              className="w-100 mt-3"
              disabled={!isFormValid() || loading}
            >
              {loading ? "Logging in..." : "Log In"}
            </CustomButton>
          </Form>

          <div className="mt-3 text-center">
            Don't have an account?{" "}
            <Link to="/signup" className="text-decoration-none signup-link">
              Sign up here
            </Link>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginForm;
