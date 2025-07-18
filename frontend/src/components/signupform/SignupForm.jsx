import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import OAuthButtons from "../button/oauthbuttons/OAuthButtons";
import { validateField } from "../../utility/validation";
import CustomButton from "../button/CustomButton";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useState } from "react";
import "./signupform.css";

const SignupForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    avatar:
      "https://res.cloudinary.com/dkfcilr87/image/upload/v1752317559/avatar9_ul9bmv.png",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const invalidFields = Object.entries(formData).filter(
      ([name, value]) => !validateField(name, value)
    );

    if (invalidFields.length > 0) {
      setError("Please correct the highlighted fields.");
      return;
    }

    setError("");
    setSuccess(false);

    try {
      const res = await fetch(`${import.meta.env.VITE_SERVER_BASE_URL}/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || "Registration failed");
      }

      setSuccess(true);
      setTimeout(() => navigate("/"), 1800);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <h2 className="mb-5 fw-bold">Sign Up</h2>

          {success && <Alert variant="success">Account created! ✅</Alert>}
          {error && <Alert variant="danger">{error}</Alert>}
          <OAuthButtons />
          <hr className="my-3" />

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="firstName">
              <Form.Label>First Name*</Form.Label>
              <Form.Control
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
                isInvalid={!validateField("firstName", formData.firstName)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="lastName">
              <Form.Label>Last Name*</Form.Label>
              <Form.Control
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                isInvalid={!validateField("lastName", formData.lastName)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Email*</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                isInvalid={!validateField("email", formData.email)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="password">
              <Form.Label>Password* (min 12 characters)</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                isInvalid={!validateField("password", formData.password)}
              />
            </Form.Group>

            <CustomButton type="submit" variant="accent" className="w-100 mt-3">
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
