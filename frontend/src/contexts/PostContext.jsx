import { createContext, useContext, useEffect, useState } from "react";

const PostContext = createContext();
export const usePosts = () => useContext(PostContext);

export const PostProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const getAllPosts = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_SERVER_BASE_URL}/posts`);

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to fetch posts");
      }

      const result = await res.json();
      const realPosts = result.posts || [];

      realPosts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

      setPosts(realPosts);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const searchPosts = async (query) => {
    setLoading(true);
    try {
      const encodedQuery = encodeURIComponent(query.trim());

      const res = await fetch(
        `${
          import.meta.env.VITE_SERVER_BASE_URL
        }/posts/search?location=${encodedQuery}&tag=${encodedQuery}`
      );

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to perform search");
      }

      const result = await res.json();
      const backendResults = result.posts || [];

      backendResults.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );

      setSearchResults(backendResults);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getPostById = async (id) => {
    setLoading(true);
    try {
      const url = `${import.meta.env.VITE_SERVER_BASE_URL}/posts/${id}`;
      const res = await fetch(url);

      if (res.ok) {
        const result = await res.json();
        return result.post;
      } else {
        const errorData = await res.json();
        throw new Error(errorData.message || `Post with ID ${id} not found`);
      }
    } catch (err) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const createPost = async (postData) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_SERVER_BASE_URL}/posts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: localStorage.getItem("token"),
        },
        body: JSON.stringify(postData),
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.message || "Failed to create post");

      getAllPosts();
      return result.post;
    } catch (err) {
      console.error("Error creating post:", err);
      setError(err.message);
      return null;
    }
  };

  const uploadImages = async (postId, imageFiles) => {
    if (!shouldFetchFromBackend) {
      return null;
    }
    try {
      const formData = new FormData();
      imageFiles.forEach((file) => formData.append("images", file));

      const res = await fetch(
        `${import.meta.env.VITE_SERVER_BASE_URL}/posts/${postId}/images`,
        {
          method: "PATCH",
          headers: {
            authorization: localStorage.getItem("token"),
          },
          body: formData,
        }
      );

      const result = await res.json();
      if (!res.ok) throw new Error(result.message || "Failed to upload images");

      return result.post;
    } catch (err) {
      setError(err.message);
      return null;
    }
  };

  useEffect(() => {
    getAllPosts();
  }, []);

  return (
    <PostContext.Provider
      value={{
        posts,
        loading,
        error,
        getAllPosts,
        searchResults,
        searchPosts,
        getPostById,
        createPost,
        uploadImages,
        setError,
      }}
    >
      {children}
    </PostContext.Provider>
  );
};
