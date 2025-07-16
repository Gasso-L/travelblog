import PostAuthor from "../postauthor/PostAuthor";
import { Card, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import "./postcard.css";

const PostCard = ({ post }) => {
  const { _id, title, location, images, tags, ratings, author } = post;

  const avgRating = ratings.length
    ? (ratings.reduce((sum, r) => sum + r.value, 0) / ratings.length).toFixed(1)
    : "N/A";

  const randomImage = images[Math.floor(Math.random() * images.length)];

  const randomTags = [...tags]
    .sort(() => 0.5 - Math.random())
    .slice(0, Math.min(tags.length, 3));

  return (
    <Link to={`/posts/${_id}`} className="card-link-wrapper">
      <Card className="h-100 shadow-sm rounded-4 post-card">
        <Card.Img
          variant="top"
          src={randomImage}
          alt={title}
          className="custom-card-img rounded-top-4"
          style={{ height: "220px", objectFit: "cover" }}
        />
        <Card.Body>
          <Card.Title title={title}>
            {title.length > 20 ? `${title.substring(0, 20)}...` : title}
          </Card.Title>
          <Card.Subtitle className="text-muted mb-2">{location}</Card.Subtitle>
          <div>
            {randomTags.map((tag) => (
              <Badge key={tag} bg="secondary" className="me-1">
                #{tag}
              </Badge>
            ))}
          </div>
          <Card.Text className="text-sm pt-1 d-flex justify-content-start align-items-center">
            <FaStar className="me-1 star-icon" />
            <span>Average rating: {avgRating}</span>
          </Card.Text>
        </Card.Body>
        <Card.Footer>
          <PostAuthor {...author} />
        </Card.Footer>
      </Card>
    </Link>
  );
};

export default PostCard;
