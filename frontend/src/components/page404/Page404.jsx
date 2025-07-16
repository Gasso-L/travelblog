import { Alert, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

const Page404 = () => {
  return (
    <Container fluid>
      <Row className="justify-content-center h-100">
        <Col sm={6}>
          <Alert variant="danger" className="mt-5">
            <Alert.Heading className="fw-bold fs-1 mb-3">SORRY</Alert.Heading>
            <p className="mb-4 fs-5">We Couldn't Find That Page</p>
            <hr />
            <p className="fw-bold m-3 text-center">404 Error Page</p>
            <hr />
            <div className="d-flex justify-content-center align-items-center m-4">
              <Link to="/" className="btn btn-warning">
                Go Back
              </Link>
            </div>
          </Alert>
        </Col>
      </Row>
    </Container>
  );
};

export default Page404;
