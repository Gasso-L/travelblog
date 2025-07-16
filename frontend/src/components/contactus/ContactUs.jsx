import { Container, Form, Row, Col, Alert } from "react-bootstrap";
import CustomButton from "../button/CustomButton";
import { useState } from "react";
import "./contactus.css";

const ContactsUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await fetch("https://formspree.io/f/xjkovlzp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        throw new Error("Failed to send message");
      }

      setSubmitted(true);
      setFormData({ name: "", email: "", message: "" });
    } catch (err) {
      setError("Something went wrong. Please try again later.");
    }
  };

  return (
    <Container className="py-5 contacts-page">
      <Row className="justify-content-center mb-4">
        <Col lg={8} className="text-center">
          <h1 className="fw-bold display-5">Contact Us</h1>
          <p className="lead">
            We'd love to hear from you! Whether you have a question, feedback,
            or just want to say hello.
          </p>
        </Col>
      </Row>

      <Row className="justify-content-center">
        <Col lg={6}>
          {submitted && (
            <Alert variant="success" className="text-center">
              Message sent successfully! We'll get back to you soon.
            </Alert>
          )}

          {error && (
            <Alert variant="danger" className="text-center">
              {error}
            </Alert>
          )}

          <Form onSubmit={handleSubmit} className="shadow-sm p-4 rounded-4">
            <Form.Group className="mb-3">
              <Form.Label className="fw-semibold">Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Your name"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="fw-semibold">Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="you@example.com"
              />
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label className="fw-semibold">Message</Form.Label>
              <Form.Control
                as="textarea"
                rows={5}
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                placeholder="Write your message here..."
              />
            </Form.Group>

            <div className="d-flex justify-content-end">
              <CustomButton type="submit" variant="accent">
                Send Message
              </CustomButton>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default ContactsUs;
