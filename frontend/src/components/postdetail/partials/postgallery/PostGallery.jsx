import { Carousel } from "react-bootstrap";
import "./postgallery.css";

const PostGallery = ({ images }) => {
  if (!images?.length) return null;

  return (
    <Carousel fade className="rounded-4 overflow-hidden mb-4">
      {images.map((src, i) => (
        <Carousel.Item key={i}>
          <img
            src={src}
            alt={`Image ${i}`}
            className="d-block w-100 carousel-img"
            style={{ maxHeight: "500px" }}
          />
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default PostGallery;
