import { useNavigate, useSearchParams } from "react-router-dom";
import { Container, Spinner } from "react-bootstrap";
import { useAuth } from "../../contexts/AuthContext";
import parseJwt from "../../utility/parsejwt";
import { useEffect } from "react";
import "./successredirect.css";

const SuccessRedirect = () => {
  const [params] = useSearchParams();
  const { login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const token = params.get("token");

    if (token) {
      const decoded = parseJwt(token);
      if (decoded?.id) {
        login(token, decoded.id);
        setTimeout(() => {
          navigate("/");
        }, 1000);
      }
    }
  }, []);

  return (
    <Container>
      <div className="login-wrapper">
        <div className="login-container d-flex flex-column justify-content-center align-items-center">
          <Spinner animation="border" variant="warning" />
          <p className="text-black mt-3">
            You will be redirected to the home page...
          </p>
        </div>
      </div>
    </Container>
  );
};

export default SuccessRedirect;
