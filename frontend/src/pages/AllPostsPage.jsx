import {
  Container,
  Row,
  Col,
  Pagination,
  Spinner,
  Alert,
} from "react-bootstrap";
import PostCard from "../components/blog/partials/postcard/PostCard";
import HeroSection from "../components/herosection/HeroSection";
import { usePosts } from "../contexts/PostContext";
import { FaMapMarkedAlt } from "react-icons/fa";
import { useState, useEffect } from "react";
import "./allpostspage.css";

const AllPostsPage = () => {
  const { posts, loading, error } = usePosts();
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(6);
  const totalPages = Math.ceil(posts.length / postsPerPage);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  useEffect(() => {
    const updatePostsPerPage = () => {
      if (window.matchMedia("(max-width: 575px)").matches) {
        setPostsPerPage(2);
      } else if (window.matchMedia("(max-width: 991px)").matches) {
        setPostsPerPage(4);
      } else {
        setPostsPerPage(6);
      }
    };

    updatePostsPerPage();
    window.addEventListener("resize", updatePostsPerPage);

    return () => window.removeEventListener("resize", updatePostsPerPage);
  }, []);

  return (
    <>
      <HeroSection />
      <Container className="py-4">
        <h2 className="text-center py-2">All Posts</h2>
        <p className="text-center mb-5 d-flex justify-content-center align-items-center flex-wrap">
          <FaMapMarkedAlt className="me-2" size={25} />
          Explore what travelers are sharing around the world
        </p>

        {loading && <Spinner animation="border" variant="primary" />}
        {error && <Alert variant="danger">{error}</Alert>}

        <Row xs={1} md={2} lg={3} className="g-4">
          {currentPosts.map((post) => (
            <Col key={post._id} className="card-fade-in">
              <PostCard post={post} />
            </Col>
          ))}
        </Row>

        <Pagination className="justify-content-center mt-4">
          <Pagination.First
            onClick={() => handlePageChange(1)}
            disabled={currentPage === 1}
          />
          <Pagination.Prev
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          />

          {[...Array(totalPages)].map((_, index) => (
            <Pagination.Item
              key={index}
              active={index + 1 === currentPage}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </Pagination.Item>
          ))}

          <Pagination.Next
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          />
          <Pagination.Last
            onClick={() => handlePageChange(totalPages)}
            disabled={currentPage === totalPages}
          />
        </Pagination>
      </Container>
    </>
  );
};

export default AllPostsPage;
