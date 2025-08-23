import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { useAuth } from "./AuthContext";

const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
  const { token } = useAuth();
  const [userData, setUserData] = useState(null);
  const [userPosts, setUserPosts] = useState([]);
  const [publicUserData, setPublicUserData] = useState(null);
  const [publicUserPosts, setPublicUserPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const userProfile = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${import.meta.env.VITE_SERVER_BASE_URL}/me`, {
        headers: { authorization: token },
      });

      if (!res.ok) throw new Error("Failed to fetch user data");

      const { data } = await res.json();
      setUserData(data.user);

      const postsRes = await fetch(
        `${import.meta.env.VITE_SERVER_BASE_URL}/posts/user/${data.user._id}`,
        {
          headers: { authorization: token },
        }
      );

      if (!postsRes.ok) throw new Error("Failed to fetch user posts");

      const posts = await postsRes.json();
      setUserPosts(posts.posts.posts);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (updatedData) => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_SERVER_BASE_URL}/users/${userData._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            authorization: token,
          },
          body: JSON.stringify(updatedData),
        }
      );

      if (!res.ok) throw new Error("Failed to update profile");

      const updated = await res.json();
      setUserData(updated.editUser);
    } catch (err) {
      setError(err.message);
    }
  };

  const deletePost = async (postId) => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_SERVER_BASE_URL}/posts/${postId}`,
        {
          method: "DELETE",
          headers: { authorization: token },
        }
      );

      if (!res.ok) throw new Error("Failed to delete post");

      setUserPosts((prev) => prev.filter((p) => p._id !== postId));
    } catch (err) {
      setError(err.message);
    }
  };

  const getPublicProfile = useCallback(
    async (userId) => {
      try {
        setLoading(true);
        setError("");
        setPublicUserData(null);
        setPublicUserPosts([]);

        const userResponse = await fetch(
          `${import.meta.env.VITE_SERVER_BASE_URL}/users/${userId}`
        );

        if (!userResponse.ok) {
          throw new Error(errorData.message);
        }

        const { user } = await userResponse.json();
        setPublicUserData(user);

        const postsResponse = await fetch(
          `${import.meta.env.VITE_SERVER_BASE_URL}/posts/user/${userId}`
        );

        if (!postsResponse.ok) {
          setPublicUserPosts([]);
        } else {
          const publicPostsData = await postsResponse.json();
          if (
            publicPostsData &&
            publicPostsData.posts &&
            Array.isArray(publicPostsData.posts.posts)
          ) {
            setPublicUserPosts(publicPostsData.posts.posts);
          } else {
            setPublicUserPosts([]);
          }
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    },
    [setLoading, setError, setPublicUserData, setPublicUserPosts]
  );

  useEffect(() => {
    if (token) userProfile();
  }, [token]);

  return (
    <ProfileContext.Provider
      value={{
        userData,
        userPosts,
        publicUserData,
        publicUserPosts,
        loading,
        error,
        setError,
        setUserPosts,
        userProfile,
        updateProfile,
        deletePost,
        getPublicProfile,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => useContext(ProfileContext);
