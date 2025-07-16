import PostCardLarge from "../../blog/partials/postcardlarge/PostCardLarge";
import { Container, Card, Stack } from "react-bootstrap";
import "./postsearchfeed.css";

const PostSearchFeed = ({ posts }) => {
  return (
    <Container className="py-4">
      <Card className="p-4 rounded-5 shadow-sm card-container scrollbar-container">
        <Stack gap={4}>
          {posts.map((post) => (
            <div key={post._id}>
              <PostCardLarge post={post} layoutVariant="search" />
            </div>
          ))}
        </Stack>
      </Card>
    </Container>
  );
};

export default PostSearchFeed;
