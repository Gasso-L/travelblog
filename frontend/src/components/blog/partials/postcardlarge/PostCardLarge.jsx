import { Row, Col, Card, Badge } from "react-bootstrap";
import PostAuthor from "../postauthor/PostAuthor";
import truncateHtml from "html-truncate";
import { FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./postcardlarge.css";

const PostCardLarge = ({ post, rank, layoutVariant }) => {
  const { _id, title, content, location, images, tags, ratings, author } = post;
  const randomImage = images[Math.floor(Math.random() * images.length)];
  const avgRating = ratings.length
    ? (ratings.reduce((sum, r) => sum + r.value, 0) / ratings.length).toFixed(1)
    : "N/A";

  const randomTags = [...tags]
    .sort(() => 0.5 - Math.random())
    .slice(0, Math.min(tags.length, 4));

  const truncatedContent = truncateHtml(content, 125);

  return (
    <Link to={`/posts/${_id}`} className="large-card-link-wrapper">
      <Card
        className={`h-100 post-card-large shadow-sm rounded-4 overflow-hidden ${
          layoutVariant ? `post-card-${layoutVariant}` : ""
        }`}
      >
        <Row className="g-0 align-items-stretch h-100">
          <Col md={5}>
            <div className="w-100 h-100 image-container">
              <Card.Img
                src={randomImage}
                alt={title}
                className="img-left object-fit-cover w-100 h-100 rounded-end-0"
              />
              {rank && (
                <span className="badge bg-warning text-dark position-absolute top-0 start-0 m-2">
                  #{rank}
                </span>
              )}
            </div>
          </Col>
          <Col md={7} className="d-flex flex-column">
            <Card.Body className="d-flex flex-column justify-content-between p-4 flex-grow-1">
              <div>
                <Card.Title title={title} className="fw-bold">
                  {title.length > 30 ? `${title.substring(0, 30)}...` : title}
                </Card.Title>
                <Card.Subtitle className="text-muted mb-2 fw-bold">
                  {location}
                </Card.Subtitle>
                <div className="mb-2">
                  {randomTags.map((tag) => (
                    <Badge key={tag} bg="secondary" className="me-1">
                      #{tag}
                    </Badge>
                  ))}
                </div>
                <Card.Text
                  className="d-none d-md-flex fw-bold"
                  dangerouslySetInnerHTML={{ __html: truncatedContent }}
                ></Card.Text>
                <Card.Text className="text-sm d-flex justify-content-start align-items-center">
                  <FaStar className="me-1 star-icon" />
                  <span>Average rating: {avgRating}</span>
                </Card.Text>
              </div>
            </Card.Body>
            <Card.Footer className="mt-auto">
              <PostAuthor {...author} />
            </Card.Footer>
          </Col>
        </Row>
      </Card>
    </Link>
  );
};

export default PostCardLarge;
