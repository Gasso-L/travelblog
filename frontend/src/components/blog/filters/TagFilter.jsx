import FilteredPostList from "./filteredpostlist/FilteredPostList";
import { Col, Container, Row } from "react-bootstrap";
import CustomButton from "../../button/CustomButton";
import "./tagfilter.css";
import { useState } from "react";

const TagFilter = ({ posts }) => {
  const [selectedTag, setSelectedTag] = useState(null);

  const uniqueTags = Array.from(new Set(posts.flatMap((p) => p.tags)));
  const [randomTags] = useState(() =>
    uniqueTags
      .sort(() => 0.5 - Math.random())
      .slice(0, Math.min(8, uniqueTags.length))
  );

  const firstRowTags = randomTags.slice(0, 4);
  const secondRowTags = randomTags.slice(4, 8);

  const toggleTag = (tag) => {
    setSelectedTag((prev) => (prev === tag ? null : tag));
  };

  return (
    <section className="mb-5">
      <h2 className="m-4 text-center">Find Your Perfect Experience</h2>
      <Container className="py-4">
        <Row className="pb-4">
          <Col className="d-flex justify-content-center align-items-center gap-2">
            {firstRowTags.map((tag) => (
              <CustomButton
                key={tag}
                variant={selectedTag === tag ? "accent" : "outline"}
                onClick={() => toggleTag(tag)}
                className="tag-button"
              >
                #{tag}
              </CustomButton>
            ))}
          </Col>
        </Row>
        <Row>
          <Col className="d-flex justify-content-center align-items-center gap-2">
            {secondRowTags.map((tag) => (
              <CustomButton
                key={tag}
                variant={selectedTag === tag ? "accent" : "outline"}
                onClick={() => toggleTag(tag)}
                className="tag-button"
              >
                #{tag}
              </CustomButton>
            ))}
          </Col>
        </Row>
      </Container>

      {selectedTag && (
        <FilteredPostList posts={posts} selectedTag={selectedTag} />
      )}
    </section>
  );
};

export default TagFilter;
