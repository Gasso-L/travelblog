import { Outlet, Link, useLocation } from "react-router-dom";
import { Container, Row, Col, Card } from "react-bootstrap";
import { AuthProvider } from "../../contexts/AuthContext";
import logo from "../../assets/logo.png";
import { FaHome } from "react-icons/fa";
import "./authlayout.css";

const AuthLayout = () => {
  const location = useLocation();
  const isLogin = location.pathname === "/login";

  return (
    <AuthProvider>
      <Container className="auth-layout-container mt-5">
        <Row>
          <Col
            xs={12}
            md={12}
            className="d-flex flex-column justify-content-center auth-form-col"
          >
            <main className="auth-main flex-grow-1 d-flex align-items-center justify-content-center">
              <Card className="auth-card shadow-lg border-0 rounded-4 w-100">
                <Card.Header className="d-flex justify-content-center align-items-center">
                  <Link
                    to="/"
                    className="d-flex align-items-center justify-content-center gap-1 text-decoration-none"
                  >
                    <img
                      src={logo}
                      alt="Tripspire Logo"
                      className="auth-logo"
                    />
                  </Link>
                </Card.Header>
                <Card.Body className="">
                  <Card.Title className="d-flex justify-content-center align-items-center">
                    {isLogin ? "Welcome back" : "Tripspire"}
                  </Card.Title>
                  <Outlet />
                </Card.Body>
                <Card.Footer className="text-center border-0 py-4">
                  <Link to="/" className="card-footer-link">
                    <FaHome /> Back to Home
                  </Link>
                </Card.Footer>
              </Card>
            </main>
          </Col>
        </Row>
      </Container>
    </AuthProvider>
  );
};

export default AuthLayout;
