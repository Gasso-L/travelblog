import { Container, Spinner, Alert } from "react-bootstrap";
import PostSearchFeed from "./partials/PostSearchFeed";
import { usePosts } from "../../contexts/PostContext";
import { useSearchParams } from "react-router-dom";
import CustomButton from "../button/CustomButton";
import { useNavigate } from "react-router-dom";
import { BsArrowLeft } from "react-icons/bs";
import { useEffect } from "react";

const PostSearch = () => {
  const [params] = useSearchParams();
  const query = params.get("q");
  const { searchResults, searchPosts, loading, error } = usePosts();
  const navigate = useNavigate();

  useEffect(() => {
    if (query) {
      searchPosts(query);
    }
  }, [query]);

  return (
    <Container className="py-4">
      <h2 className="mb-4 text-center text-md-start">
        Results for: <em>{query}</em>
      </h2>

      {loading && (
        <div className="text-center py-5">
          <Spinner animation="border" variant="warning" />
        </div>
      )}

      {error && (
        <Alert
          variant="danger"
          className="d-flex flex-column justify-content-center my-5"
        >
          <p className="text-center pt-5">
            Ops...something went wrong. Please try later!
          </p>
          <div className="d-flex justify-content-center align-items-center m-4">
            <Link to="/" className="btn btn-warning">
              Go Back
            </Link>
          </div>
        </Alert>
      )}

      {!loading && !error && searchResults.length === 0 && (
        <Alert variant="info" className="text-center">
          <div className="d-flex flex-column align-items-center gap-2">
            <p>
              No results found for{" "}
              <span className="fw-bold fs-5">"{query}"</span>.
            </p>
            <CustomButton
              variant="accent"
              className="d-flex justify-content-center align-items-center gap-1"
              onClick={() => navigate(-1)}
            >
              <BsArrowLeft size={18} />
              Go Back
            </CustomButton>
          </div>
        </Alert>
      )}

      {!loading && !error && searchResults.length !== 0 && (
        <PostSearchFeed posts={searchResults} />
      )}
    </Container>
  );
};

export default PostSearch;
