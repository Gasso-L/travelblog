import { Container, Row, Col, Form, Alert } from "react-bootstrap";
import OAuthButtons from "../button/oauthbuttons/OAuthButtons";
import { Link, useNavigate } from "react-router-dom";
import CustomButton from "../button/CustomButton";
import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import "./loginform.css";

const LoginForm = ({ onLoginComplete }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    try {
      const res = await fetch(`${import.meta.env.VITE_SERVER_BASE_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || "Login failed");
      }

      const { token, userId } = await res.json();

      login(token, userId);

      setSuccess(true);
      if (onLoginComplete) {
        onLoginComplete();
      }
      setTimeout(() => navigate("/"), 1500);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <h2 className="mb-5 fw-bold">Log In</h2>

          <OAuthButtons />
          <hr className="my-3" />

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Email*</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="password">
              <Form.Label>Password*</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <CustomButton type="submit" variant="accent" className="w-100 mt-3">
              Log In
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
