import {
  Navbar,
  Container,
  Offcanvas,
  Nav,
  Modal,
  Button,
} from "react-bootstrap";
import { FiSettings, FiPower, FiLogIn } from "react-icons/fi";
import { FaHome, FaSearch, FaUserPlus } from "react-icons/fa";
import { useAuth } from "../../contexts/AuthContext";
import CustomButton from "../button/CustomButton";
import SignupForm from "../signupform/SignupForm";
import { MdHelpOutline } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import SearchBar from "../searchbar/SearchBar";
import LoginForm from "../loginform/LoginForm";
import UserMenu from "./partials/UserMenu";
import logo from "../../assets/logo.png";
import { Link } from "react-router-dom";
import { useState } from "react";
import "./customnavbar.css";

const CustomNavBar = () => {
  const [showOffcanvas, setShowOffcanvas] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const { token, handleLogout } = useAuth();
  const navigate = useNavigate();

  const handleCloseSignup = () => setShowSignup(false);
  const handleOpenSignup = () => setShowSignup(true);

  const handleCloseLogin = () => setShowLogin(false);
  const handleOpenLogin = () => setShowLogin(true);

  const handleOpenSearch = () => setShowSearch(true);
  const handleCloseSearch = () => {
    setShowSearch(false);
    setShowOffcanvas(false);
  };

  const handleNavigate = (path) => {
    setShowOffcanvas(false);
    setTimeout(() => {
      navigate(path);
    }, 300);
  };

  return (
    <>
      <Navbar expand={false} className="custom-navbar">
        <Container>
          <Navbar.Brand>
            <Link to="/" className="brand-nav">
              <div className="d-flex justify-content-center align-items-center">
                <img src={logo} alt="TravelBlog Logo" className="navbar-logo" />
                <h2 className="d-none d-lg-inline">Tripspire</h2>
              </div>
            </Link>
          </Navbar.Brand>
          <div className="d-flex justify-content-center gap-3">
            {token ? (
              <UserMenu />
            ) : (
              <>
                <CustomButton
                  variant="outline"
                  onClick={handleOpenLogin}
                  className="d-none d-md-flex"
                >
                  Login
                </CustomButton>
                <CustomButton
                  variant="accent"
                  onClick={handleOpenSignup}
                  className="d-none d-md-flex"
                >
                  Sign Up
                </CustomButton>
              </>
            )}

            <Navbar.Toggle
              aria-controls="offcanvasNavbar"
              className="custom-toggle"
              onClick={() => setShowOffcanvas(true)}
            />
          </div>

          <Navbar.Offcanvas
            show={showOffcanvas}
            onHide={() => setShowOffcanvas(false)}
            id="offcanvasNavbar"
            aria-labelledby="offcanvasNavbarLabel"
            placement="end"
            className="offcanvas-end-custom ps-2"
          >
            <Offcanvas.Header closeButton></Offcanvas.Header>

            <Offcanvas.Body>
              <Nav className="justify-content-end flex-grow-1 pe-3">
                <Link
                  to="/"
                  className="nav-link d-flex justify-content-start align-items-center gap-2"
                  onClick={() => setShowOffcanvas(false)}
                >
                  <FaHome title="Home" />
                  Home
                </Link>
                <Button
                  variant="link"
                  className="nav-link d-flex justify-content-start align-items-center gap-2"
                  onClick={handleOpenSearch}
                >
                  <FaSearch title="Search" />
                  Search
                </Button>

                <hr />
                <h4 className="py-2">Profile</h4>
                {token ? (
                  <>
                    <Button
                      variant="link"
                      className="nav-link d-flex justify-content-start align-items-center gap-2"
                      onClick={() => handleNavigate("/profile")}
                    >
                      <FiSettings />
                      Account
                    </Button>
                    <Button
                      variant="link"
                      className="nav-link d-flex justify-content-start text-danger align-items-center gap-2"
                      onClick={handleLogout}
                    >
                      <FiPower />
                      Logout
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      variant="link"
                      className="nav-link d-flex justify-content-start align-items-center gap-2"
                      onClick={handleOpenLogin}
                    >
                      <FiLogIn />
                      Log in
                    </Button>
                    <Button
                      variant="link"
                      className="nav-link d-flex justify-content-start align-items-center gap-2"
                      onClick={handleOpenSignup}
                    >
                      <FaUserPlus />
                      Sign up
                    </Button>
                  </>
                )}
                <hr />
                <h4 className="py-2">Support</h4>
                <Link
                  to="#"
                  className="nav-link d-flex justify-content-start align-items-center gap-2"
                  onClick={() => handleNavigate("/contacts")}
                >
                  <MdHelpOutline title="Support" />
                  Contact Us
                </Link>
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
      <Modal
        show={showLogin}
        onHide={handleCloseLogin}
        centered
        size="lg"
        className="dark-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title className="fw-bold">Log In</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <LoginForm onLoginComplete={handleCloseLogin} />
        </Modal.Body>
      </Modal>

      <Modal
        show={showSignup}
        onHide={handleCloseSignup}
        centered
        size="lg"
        className="dark-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title className="fw-bold">Sign Up</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <SignupForm />
        </Modal.Body>
      </Modal>
      <Modal
        show={showSearch}
        onHide={handleCloseSearch}
        size="lg"
        dialogClassName="search-modal"
        className="dark-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title className="fw-bold">Search Destinations</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <SearchBar onSearchComplete={handleCloseSearch} />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default CustomNavBar;
