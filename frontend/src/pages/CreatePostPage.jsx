import { Container, Row, Col } from "react-bootstrap";
import CreatePostForm from "../components/createpostform/CreatePostForm";

const CreatePostPage = () => {
  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={8}>
          <CreatePostForm />
        </Col>
      </Row>
    </Container>
  );
};

export default CreatePostPage;
