import React, { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
// 1. Import 'Link' for routing and 'useNavigate' for the logout action
import { Link, useNavigate } from "react-router-dom";

type NavbarProps = {
  isLoggedIn: boolean;
};

const Navbar: React.FC<NavbarProps> = (props) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // 2. Get the navigate function
  const navigate = useNavigate();

  // 3. Create the handleLogout function
  const handleLogout = () => {
    localStorage.removeItem("ticketapp_session"); // Clear the token
    navigate("/auth/login"); // Redirect to login page
  };

  // --- 4. Define Mobile Link Variables (using <Link> and correct 'to' props) ---

  const loggedInMobileLinks = (
    <div className="flex flex-col w-full">
      <Link
        to="/dashboard"
        className="w-full block py-3 text-center text-green-800 hover:bg-green-50 transition-all duration-200"
      >
        Dashboard
      </Link>
      <Link
        to="/tickets/manage"
        className="w-full block py-3 text-center text-green-800 hover:bg-green-50 transition-all duration-200"
      >
        Tickets
      </Link>
      {/* 5. Logout is now a button that triggers the handler */}
      <button
        onClick={handleLogout}
        className="w-full block py-3 text-center text-green-800 hover:bg-green-50 transition-all duration-200"
      >
        Logout
      </button>
    </div>
  );

  const loggedOutMobileLinks = (
    <div className="flex flex-col w-full">
      <a
        href="/#features" // Use <a> for in-page anchors
        className="w-full block py-3 text-center text-green-800 hover:bg-green-50 transition-all duration-200"
      >
        Features
      </a>
      <a
        href="/#contact" // Use <a> for in-page anchors
        className="w-full block py-3 text-center text-green-800 hover:bg-green-50 transition-all duration-200"
      >
        Contact
      </a>
      <Link
        to="/auth/signup"
        className="w-full block py-3 text-center text-green-800 hover:bg-green-50 transition-all duration-200"
      >
        Sign Up
      </Link>
      <Link
        to="/auth/login"
        className="w-full block py-3 text-center text-green-800 hover:bg-green-50 transition-all duration-200"
      >
        Login
      </Link>
    </div>
  );

  // --- 6. Main Component Return (using <Link> and correct 'to' props) ---

  return (
    <nav className="shadow-md relative">
      <div className="max-w-[1440px] mx-auto px-6 py-4 flex justify-between items-center bg-white">
        <Link to="/" className="text-2xl font-bold text-green-800">
          Resolv
        </Link>

        {/* --- Desktop Links --- */}
        {props.isLoggedIn ? (
          // LOGGED IN (Desktop)
          <div className="hidden md:flex gap-4 items-center">
            <Link
              to="/dashboard"
              className="text-green-800 py-2.5 px-3 hover:text-green-900 transition-all duration-200"
            >
              Dashboard
            </Link>
            <Link
              to="/tickets/manage"
              className="text-green-800 py-2.5 px-3 hover:text-green-900 transition-all duration-200"
            >
              Tickets
            </Link>
            <button
              onClick={handleLogout}
              className="bg-green-800 hover:bg-green-900 text-white py-2 px-4 rounded-lg shadow-sm transition-all duration-200"
            >
              Logout
            </button>
          </div>
        ) : (
          // LOGGED OUT (Desktop)
          <div className="hidden md:flex gap-4">
            <a
              href="/#features"
              className="text-green-800 py-2.5 px-3 hover:text-green-900 transition-all duration-200"
            >
              Features
            </a>
            <a
              href="/#contact"
              className="text-green-800 py-2.5 px-3 hover:text-green-900 transition-all duration-200"
            >
              Contact
            </a>
            <Link
              to="/auth/signup"
              className="text-green-800 py-2.5 px-3 hover:text-green-900 transition-all duration-200"
            >
              Sign Up
            </Link>
            <Link
              to="/auth/login"
              className="bg-white border border-green-800 text-green-800 py-2.5 px-6 rounded-lg hover:bg-green-50 transition-all duration-200"
            >
              Login
            </Link>
          </div>
        )}

        {/* --- Mobile Menu Button --- */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden"
          aria-label="Toggle menu"
          aria-expanded={isMobileMenuOpen}
        >
          {isMobileMenuOpen ? (
            <FaTimes size={24} className="text-green-800" />
          ) : (
            <FaBars size={24} className="text-green-800" />
          )}
        </button>
      </div>

      {/* --- Mobile Menu Dropdown --- */}
      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 right-0 w-full bg-white flex flex-col items-center shadow-md md:hidden border-t border-green-200 z-50">
          {props.isLoggedIn ? loggedInMobileLinks : loggedOutMobileLinks}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
