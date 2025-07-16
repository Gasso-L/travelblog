import { createContext, useContext, useState } from "react";

const CommentContext = createContext();
export const useComments = () => useContext(CommentContext);

export const CommentProvider = ({ children }) => {
  const [comments, setComments] = useState([]);
  const [postRatings, setPostRatings] = useState([]);
  const [loadingComments, setLoadingComments] = useState(false);
  const [errorComments, setErrorComments] = useState("");

  const isBackendEnabledInDev =
    import.meta.env.VITE_USE_BACKEND_IN_DEV === "true";
  const isProduction = import.meta.env.MODE === "production";
  const shouldFetchFromBackend = isBackendEnabledInDev || isProduction;

  const getCommentsByPostId = async (postId) => {
    setLoadingComments(true);
    try {
      let fetchedComments = [];
      let fetchedRatings = [];

      if (shouldFetchFromBackend) {
        const res = await fetch(
          `${import.meta.env.VITE_SERVER_BASE_URL}/comments/${postId}`
        );
        const result = await res.json();

        fetchedComments = result.comments || [];
        fetchedRatings = result.postRatings || [];
      } else {
        const post = mockPosts.find((p) => String(p._id) === postId);
        fetchedComments = post?.comments || [];
        fetchedRatings = post?.ratings || [];
      }

      setComments(fetchedComments);
      setPostRatings(fetchedRatings);
    } catch (err) {
      setErrorComments(err.message);
    } finally {
      setLoadingComments(false);
    }
  };

  const addCommentToPost = async (postId, content, token, rating) => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_SERVER_BASE_URL}/comments/${postId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: token,
          },
          body: JSON.stringify({ content, rating }),
        }
      );

      if (!res.ok) throw new Error("Failed to add comment");

      const result = await res.json();

      setComments((prev) => [...prev, result.comment]);
      return result.comment;
    } catch (err) {
      setErrorComments(err.message);
      throw err;
    }
  };

  return (
    <CommentContext.Provider
      value={{
        comments,
        postRatings,
        loadingComments,
        errorComments,
        getCommentsByPostId,
        addCommentToPost,
      }}
    >
      {children}
    </CommentContext.Provider>
  );
};
