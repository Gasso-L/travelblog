import { useProfile } from "../../../contexts/ProfileContext";
import { useAuth } from "../../../contexts/AuthContext";
import { FiSettings, FiPower } from "react-icons/fi";
import { FaChevronDown } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useState } from "react";
import "./usermenu.css";

const UserMenu = () => {
  const { token, handleLogout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { userData } = useProfile();

  const handleToggle = (isShown) => {
    setIsOpen(isShown);
  };

  return (
    <Dropdown align="end" className="pe-3" onToggle={handleToggle}>
      <Dropdown.Toggle variant="link" className="no-caret p-0 border-0">
        <div className="d-flex align-items-center gap-2">
          {userData && (
            <div className="dropdown-username">
              {userData.firstName || userData.userName}
            </div>
          )}
          <img
            src={
              userData?.avatar ||
              "https://res.cloudinary.com/dkfcilr87/image/upload/v1752317559/avatar9_ul9bmv.png"
            }
            alt="User Avatar"
            className="rounded-circle user-icon"
            referrerPolicy="no-referrer"
          />
          <FaChevronDown
            size={16}
            className={`icon-arrow ${isOpen ? "rotate" : ""}`}
          />
        </div>
      </Dropdown.Toggle>

      <Dropdown.Menu className="rounded-3 custom-dropdown-menu">
        <Link
          to={"/profile"}
          className="dropdown-item user-menu-link d-flex align-items-center gap-2"
        >
          <FiSettings />
          My Account
        </Link>
        <Dropdown.Divider />
        <Dropdown.Item
          onClick={handleLogout}
          className="dropdown-item logout-link d-flex align-items-center gap-2"
        >
          <FiPower />
          Logout
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default UserMenu;
