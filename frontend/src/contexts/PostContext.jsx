import { createContext, useContext, useEffect, useState } from "react";
import mockPosts from "../data/posts";

const PostContext = createContext();
export const usePosts = () => useContext(PostContext);

export const PostProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const isBackendEnabledInDev =
    import.meta.env.VITE_USE_BACKEND_IN_DEV === "true";

  const isProduction = import.meta.env.MODE === "production";

  const shouldFetchFromBackend = isBackendEnabledInDev || isProduction;

  const getAllPosts = async () => {
    setLoading(true);
    try {
      let combinedPosts = [];

      combinedPosts = [...mockPosts];

      if (shouldFetchFromBackend) {
        const res = await fetch(
          `${import.meta.env.VITE_SERVER_BASE_URL}/posts`
        );

        const result = await res.json();
        const realPosts = result.posts || [];

        const uniqueRealPosts = realPosts.filter(
          (realPost) =>
            !combinedPosts.some(
              (mockPost) => String(mockPost._id) === String(realPost._id)
            )
        );

        combinedPosts = [...combinedPosts, ...uniqueRealPosts];

        combinedPosts.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
      }

      setPosts(combinedPosts);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const searchPosts = async (query) => {
    setLoading(true);
    try {
      let combinedSearchResults = [];

      const allMockPosts = mockPosts;
      const localResults = allMockPosts.filter(
        (post) =>
          post.title.toLowerCase().includes(query.toLowerCase()) ||
          post.tags.some((tag) =>
            tag.toLowerCase().includes(query.toLowerCase())
          ) ||
          post.location.toLowerCase().includes(query.toLowerCase())
      );
      combinedSearchResults = [...localResults];

      if (shouldFetchFromBackend) {
        const encodedQuery = encodeURIComponent(query.trim());
        const res = await fetch(
          `${
            import.meta.env.VITE_SERVER_BASE_URL
          }/posts/search?location=${encodedQuery}&tag=${encodedQuery}`
        );

        if (!res.ok) {
          const errorData = await res.json();
          console.error(
            `Errore nella ricerca reale: ${res.status} - ${errorData.message}`
          );
        } else {
          const result = await res.json();
          const backendResults = result.posts || [];

          const uniqueBackendResults = backendResults.filter(
            (backendPost) =>
              !combinedSearchResults.some(
                (localPost) => String(localPost._id) === String(backendPost._id)
              )
          );
          combinedSearchResults = [
            ...combinedSearchResults,
            ...uniqueBackendResults,
          ];

          combinedSearchResults.sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
          );
        }
      }

      setSearchResults(combinedSearchResults);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getPostById = async (id) => {
    setLoading(true);
    try {
      let data;

      if (shouldFetchFromBackend) {
        const url = `${import.meta.env.VITE_SERVER_BASE_URL}/posts/${id}`;
        const res = await fetch(url);

        if (res.ok) {
          const result = await res.json();
          data = result.post;
        } else {
          const allPosts = mockPosts;
          data = allPosts.find((p) => String(p._id) === String(id));
        }
      } else {
        const allPosts = mockPosts;
        data = allPosts.find((p) => String(p._id) === String(id));
      }

      return data;
    } catch (err) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const createPost = async (postData, token) => {
    if (!shouldFetchFromBackend) {
      const newMockPost = {
        _id: Date.now().toString(),
        createdAt: new Date().toISOString(),
        ...postData,
      };
      setPosts((prevPosts) => [newMockPost, ...prevPosts]); // Aggiungi in cima
      return newMockPost;
    }
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

      return result.post;
    } catch (err) {
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
