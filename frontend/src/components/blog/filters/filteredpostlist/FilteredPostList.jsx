import CustomButton from "../../../button/CustomButton";
import { Row, Col, Accordion } from "react-bootstrap";
import { MdLocationOn } from "react-icons/md";
import { Link } from "react-router-dom";
import "./filteredpostlist.css";

const FilteredPostList = ({ posts, selectedTag }) => {
  const filtered = selectedTag
    ? posts.filter((post) => post.tags.includes(selectedTag))
    : posts;

  return (
    <Row className="g-4 py-5">
      {filtered.length === 0 ? (
        <Col>
          <p className="text-muted text-center">
            No experiences found for #{selectedTag}
          </p>
        </Col>
      ) : (
        <Accordion className="mx-auto mt-4 accordion-width">
          {filtered.map((post, idx) => (
            <Accordion.Item eventKey={String(idx)} key={post._id}>
              <Accordion.Header>{post.title}</Accordion.Header>
              <Accordion.Body>
                <p className="mb-1 text-muted d-flex justify-content-start align-items-center">
                  <MdLocationOn size={16} />
                  <strong>{post.location}</strong>
                </p>
                <div className="mb-4">
                  {post.tags.map((tag) => (
                    <span key={tag} className="badge bg-secondary me-1">
                      #{tag}
                    </span>
                  ))}
                </div>
                <Link to={`/posts/${post._id}`}>
                  <CustomButton
                    variant="accent"
                    size="sm"
                    className="rounded-4"
                  >
                    View details
                  </CustomButton>
                </Link>
              </Accordion.Body>
            </Accordion.Item>
          ))}
        </Accordion>
      )}
    </Row>
  );
};

export default FilteredPostList;
