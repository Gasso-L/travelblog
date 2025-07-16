import { createContext, useContext, useEffect, useState } from "react";
import { FaRegHandshake } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import parseJwt from "../utility/parsejwt";
import { FiSmile } from "react-icons/fi";
import { toast } from "react-toastify";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);
  const navigate = useNavigate();

  const isAuthenticated = !!token;

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUserId = localStorage.getItem("userId");

    if (storedToken && storedUserId) {
      setToken(storedToken);
      setUserId(storedUserId);
    }
  }, []);

  const login = (receivedToken, receivedUserId) => {
    setToken(receivedToken);
    setUserId(receivedUserId);

    localStorage.setItem("token", receivedToken);
    localStorage.setItem("userId", receivedUserId);

    try {
      const decoded = parseJwt(receivedToken);
      toast(
        <div className="d-flex align-items-center gap-3">
          <FiSmile size={20} />
          <span className="fs-5">
            Welcome back, {decoded.firstName || "traveler"}
          </span>
          <FaRegHandshake />
        </div>,
        {
          className: "toast-dark",
          icon: false,
        }
      );
    } catch {
      toast("Welcome back!", {
        className: "toast-dark",
      });
    }
  };

  const logout = () => {
    setToken(null);
    setUserId(null);

    localStorage.removeItem("token");
    localStorage.removeItem("userId");
  };

  const handleLogout = () => {
    toast(
      <div className="d-flex align-items-center gap-3">
        <FiSmile size={20} />
        <span className="fs-5">Goodbye, see you soon!</span>
      </div>,
      {
        className: "toast-dark",
        icon: false,
      }
    );
    setTimeout(() => {
      logout();
      navigate("/");
      setTimeout(() => {
        window.location.reload();
      }, 100);
    }, 2000);
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        userId,
        login,
        logout,
        handleLogout,
        isAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
