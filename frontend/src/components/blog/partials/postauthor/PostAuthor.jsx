import { Col, Image, Row } from "react-bootstrap";
import "./postauthor.css";

const PostAuthor = ({ firstName, userName, avatar }) => (
  <Row className="align-items-center">
    <Col xs="auto" className="ps-2">
      <Image
        src={avatar}
        roundedCircle
        className="img-author"
        alt={`${userName} avatar`}
      />
    </Col>
    <Col className="d-flex flex-column justify-content-center">
      <span className="author-text">by</span>
      <span className="author-username fw-bold">
        {firstName ? firstName : userName}
      </span>
    </Col>
  </Row>
);

export default PostAuthor;
