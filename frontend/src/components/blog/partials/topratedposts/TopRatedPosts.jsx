import PostCardLarge from "../postcardlarge/PostCardLarge";
import { Row, Col, Container } from "react-bootstrap";
import SwiperNavControls from "../SwiperNavControls";
import { Swiper, SwiperSlide } from "swiper/react";
import { useMediaQuery } from "react-responsive";
import { Navigation } from "swiper/modules";
import PostCard from "../postcard/PostCard";
import "swiper/css/navigation";
import "./topratedposts.css";
import "swiper/css";

const TopRatedPosts = ({ posts }) => {
  const isTablet = useMediaQuery({ maxWidth: 768 });

  const topPosts = posts
    .map((post) => ({
      ...post,
      avgRating:
        post.ratings.length > 0
          ? post.ratings.reduce((sum, r) => sum + r.value, 0) /
            post.ratings.length
          : 0,
    }))
    .sort((a, b) => b.avgRating - a.avgRating)
    .slice(0, 5);

  if (isTablet) {
    return (
      <Container>
        <Swiper
          modules={[Navigation]}
          spaceBetween={20}
          slidesPerView={1}
          breakpoints={{
            576: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
          }}
          className="py-3"
        >
          {topPosts.map((post) => (
            <SwiperSlide key={post._id}>
              <PostCard post={post} />
            </SwiperSlide>
          ))}

          <SwiperNavControls />
        </Swiper>
      </Container>
    );
  }

  return (
    <Container>
      <Row className="py-3">
        <Col sm={8}>
          <PostCardLarge post={topPosts[0]} rank={1} layoutVariant="home" />
        </Col>
        <Col sm={4}>
          <PostCard post={topPosts[1]} />
        </Col>
      </Row>
      <Row>
        {topPosts.slice(2).map((post) => (
          <Col key={post._id} sm>
            <PostCard post={post} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default TopRatedPosts;
