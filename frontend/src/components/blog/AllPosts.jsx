import useRefreshOnRouteEnter from "../../hooks/useRefreshOnRouteEnter";
import TopRatedPosts from "./partials/topratedposts/TopRatedPosts";
import SwiperNavControls from "./partials/SwiperNavControls";
import { Container, Spinner, Alert } from "react-bootstrap";
import { usePosts } from "../../contexts/PostContext";
import PostCard from "./partials/postcard/PostCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import TagFilter from "./filters/TagFilter";
import "swiper/css/navigation";
import "./allposts.css";
import "swiper/css";

const AllPosts = () => {
  const { posts, loading, error, getAllPosts } = usePosts();

  useRefreshOnRouteEnter("/", () => {
    getAllPosts();
  });

  return (
    <>
      <section>
        <Container className="my-4">
          <h2 className="text-center text-md-start py-3">
            Discover Your Next Destination
          </h2>
          {loading && !error && (
            <div className="text-center py-5">
              <Spinner animation="border" variant="waring" />
            </div>
          )}

          {error && !loading && (
            <Alert variant="danger" className="d-flex justify-content-center">
              Ops...something went wrong. Please try later!
            </Alert>
          )}
          {!loading && !error && (
            <Swiper
              modules={[Navigation]}
              spaceBetween={20}
              slidesPerView={1}
              breakpoints={{
                576: { slidesPerView: 1 },
                768: { slidesPerView: 2 },
                992: { slidesPerView: 3 },
              }}
              className="py-3"
            >
              {posts.map((post) => (
                <SwiperSlide key={post._id}>
                  <PostCard post={post} />
                </SwiperSlide>
              ))}

              <SwiperNavControls />
            </Swiper>
          )}
        </Container>
      </section>
      <section className="py-4">
        <Container>
          <h2 className="text-center text-md-start mb-4">
            Top 5 Rated Destinations
          </h2>
        </Container>
        {loading && !error && (
          <div className="text-center py-5">
            <Spinner animation="border" variant="waring" />
          </div>
        )}

        {error && !loading && (
          <Container>
            <Alert variant="danger" className="d-flex justify-content-center">
              Ops...something went wrong. Please try later!
            </Alert>
          </Container>
        )}
        {!loading && !error && <TopRatedPosts posts={posts} />}
      </section>
      <section className="py-4">
        <Container>
          {loading && !error && (
            <div className="text-center py-5">
              <Spinner animation="border" variant="waring" />
            </div>
          )}

          {error && !loading && (
            <Alert variant="danger" className="d-flex justify-content-center">
              Ops...something went wrong. Please try later!
            </Alert>
          )}

          {!loading && !error && <TagFilter posts={posts} />}
        </Container>
      </section>
    </>
  );
};

export default AllPosts;
