import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="site-footer">
      <Container>
        <Row className="py-4">
          <Col md={4}>
            <h5 className="footer-title">Tripspire</h5>
            <p className="footer-text">
              Be Inspired. Go Explore. Share the Journey.
            </p>
          </Col>
          <Col md={4}>
            <h6>Useful links</h6>
            <ul className="footer-links">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/contacts">Contacts</Link>
              </li>
            </ul>
          </Col>
        </Row>
        <hr className="footer-divider" />
        <Row>
          <Col className="text-center">
            <small>
              &copy; {new Date().getFullYear()} Tripspire. All rights reserved.
            </small>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
