import React, { useState, useEffect, useRef } from "react";
import "./Header.css";
import {
  Container,
  Row,
  Button,
  Modal,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import { NavLink, useNavigate } from "react-router-dom";
import { auth } from "../../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import logo from "./../../assets/images/logo.png";
import defaultProfilePic from "./../../assets/images/user.png";

const nav__links = [
  { path: "/home", display: "Home" },
  { path: "/about", display: "About" },
  { path: "/tours", display: "Tours" },
];

export default function Header() {
  const headerRef = useRef(null);
  const [user, setUser] = useState(null);
  const [userProfilePic, setUserProfilePic] = useState(defaultProfilePic);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMenuActive, setIsMenuActive] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // State for Modal
  const dropdownRef = useRef(null);
  const overlayRef = useRef(null);
  const navigate = useNavigate();

  const stickyHeaderFunc = () => {
    window.addEventListener("scroll", () => {
      if (
        document.body.scrollTop > 80 ||
        document.documentElement.scrollTop > 80
      ) {
        headerRef.current.classList.add("sticky__header");
      } else {
        headerRef.current.classList.remove("sticky__header");
      }
    });
  };

  useEffect(() => {
    stickyHeaderFunc();
    return () => window.removeEventListener("scroll", stickyHeaderFunc);
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        setUserProfilePic(currentUser.photoURL || defaultProfilePic);
      }
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      setUserProfilePic(defaultProfilePic);
      setIsModalOpen(false); // Close the modal
      setIsMenuActive(false); // Close the menu overlay
      navigate("/login");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const toggleMenu = () => {
    setIsMenuActive(!isMenuActive);
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
    if (isModalOpen) {
      setIsMenuActive(false); // Close the overlay when modal is toggled
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
      if (
        overlayRef.current &&
        isMenuActive &&
        !overlayRef.current.contains(event.target)
      ) {
        setIsMenuActive(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuActive, isDropdownOpen]);

  return (
    <header className="header" ref={headerRef}>
      <Container>
        <Row>
          <div className="nav_wrapper d-flex align-items-center justify-content-between">
            <div className="logo">
              <img src={logo} alt="Logo" />
            </div>

            <div className={`navigation ${isMenuActive ? "active" : ""}`}>
              <ul className="menu d-flex align-items-center gap-5">
                {nav__links.map((item, index) => (
                  <li className="nav_item" key={index}>
                    <NavLink
                      to={item.path}
                      className={(navClass) =>
                        navClass.isActive ? "active_link" : ""
                      }
                      onClick={() => setIsMenuActive(false)}
                    >
                      {item.display}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>

            <div className="nav_right d-flex align-items-center gap-4">
              {user ? (
                <div className="profile_dropdown" ref={dropdownRef}>
                  <img
                    src={userProfilePic}
                    alt={user.displayName || "User"}
                    className="profile_pic"
                    onClick={toggleDropdown}
                  />
                  {isDropdownOpen && (
                    <div className="dropdown_menu">
                      <span>{user.displayName || user.email}</span>
                      <Button className="btn" onClick={toggleModal}>
                        Logout
                      </Button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="nav_btns d-flex align-items-center gap-4">
                  <NavLink
                    to="/login"
                    className={({ isActive }) =>
                      isActive ? "active_link" : ""
                    }
                  >
                    {({ isActive }) => (
                      <Button
                        className={`btn ${
                          isActive ? "primary__btn" : "primary__btn_active"
                        }`}
                      >
                        Login
                      </Button>
                    )}
                  </NavLink>

                  <NavLink
                    to="/register"
                    className={({ isActive }) =>
                      isActive ? "active_link" : ""
                    }
                  >
                    {({ isActive }) => (
                      <Button
                        className={`btn ${
                          isActive ? "primary__btn" : "primary__btn_active"
                        }`}
                      >
                        Register
                      </Button>
                    )}
                  </NavLink>
                </div>
              )}

              <span className="mobile_menu" onClick={toggleMenu}>
                <i
                  className={isMenuActive ? "ri-close-line" : "ri-menu-line"}
                ></i>
              </span>
            </div>
          </div>
        </Row>
      </Container>

      {/* {isMenuActive && <div className="menu_overlay" ref={overlayRef}></div>} */}

      {/* Confirmation Modal */}
      <Modal isOpen={isModalOpen} toggle={toggleModal} centered>
        <ModalBody>
          <h5>Are you sure you want to logout?</h5>
        </ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={handleLogout}>
            Confirm
          </Button>
          <Button color="secondary" onClick={toggleModal}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </header>
  );
}
