import { useState } from "react";
import { NavLink } from "react-router";
import { FaBell, FaSearch, FaBars, FaTimes } from "react-icons/fa";
import Logo from "/Logo/Vector.png";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className=" top-0 left-0 w-full text-white shadow-lg z-50">
      <div className="flex items-center justify-between px-6 py-4">
        {/* Logo & Name */}
        <div className="flex items-center space-x-3">
          <img
          src={Logo}
          alt="Logo"
          className="w-10 h-10 object-contain"
        />
          <h1 className="text-xl font-semibold">MovieStream</h1>
        </div>

        {/* Desktop Links */}
        <ul className="hidden md:flex items-center bg-black rounded-lg p-4 space-x-3 text-lg font-medium">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                `px-3 py-2 rounded-lg transition ${
                  isActive ? "bg-gray-700" : "hover:bg-gray-500"
                }`
              }
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/movies"
              className={({ isActive }) =>
                `px-3 py-2 rounded-lg transition ${
                  isActive ? "bg-gray-700" : "hover:bg-gray-500"
                }`
              }
            >
              Movies/Shows
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/subscription"
              className={({ isActive }) =>
                `px-3 py-2 rounded-lg transition ${
                  isActive ? "bg-gray-700" : "hover:bg-gray-500"
                }`
              }
            >
              Subscription
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/support"
              className={({ isActive }) =>
                `px-3 py-2 rounded-lg transition ${
                  isActive ? "bg-gray-700" : "hover:bg-gray-500"
                }`
              }
            >
              Support
            </NavLink>
          </li>
        </ul>

        {/* Search & Notifications */}
        <div className="hidden md:flex items-center space-x-5 text-xl">
          <FaSearch className="cursor-pointer hover:text-red-500 transition" />
          <FaBell className="cursor-pointer hover:text-red-500 transition" />
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden text-2xl">
          {menuOpen ? (
            <FaTimes
              onClick={() => setMenuOpen(false)}
              className="cursor-pointer"
            />
          ) : (
            <FaBars
              onClick={() => setMenuOpen(true)}
              className="cursor-pointer"
            />
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-black text-white px-6 py-4 space-y-4">
          <NavLink
            to="/"
            onClick={() => setMenuOpen(false)}
            className={({ isActive }) =>
              `block px-3 py-2 rounded-lg transition ${
                isActive ? "bg-gray-700" : "hover:text-red-500"
              }`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/movies"
            onClick={() => setMenuOpen(false)}
            className={({ isActive }) =>
              `block px-3 py-2 rounded-lg transition ${
                isActive ? "bg-gray-700" : "hover:text-red-500"
              }`
            }
          >
            Movies & Shows
          </NavLink>
          <NavLink
            to="/subscription"
            onClick={() => setMenuOpen(false)}
            className={({ isActive }) =>
              `block px-3 py-2 rounded-lg transition ${
                isActive ? "bg-gray-700" : "hover:text-red-500"
              }`
            }
          >
            Subscription
          </NavLink>
          <NavLink
            to="/support"
            onClick={() => setMenuOpen(false)}
            className={({ isActive }) =>
              `block px-3 py-2 rounded-lg transition ${
                isActive ? "bg-gray-700" : "hover:text-red-500"
              }`
            }
          >
            Support
          </NavLink>

          {/* Search & Notifications (mobile) */}
          <div className="flex items-center space-x-5 text-xl pt-3">
            <FaSearch className="cursor-pointer hover:text-red-500 transition" />
            <FaBell className="cursor-pointer hover:text-red-500 transition" />
          </div>
        </div>
      )}
    </nav>
  );
}