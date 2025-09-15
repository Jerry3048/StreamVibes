import { useState } from "react";
import { FaBars, FaTimes, FaSearch, FaBell } from "react-icons/fa";
import Logo from "/Logo/Vector.png";
import { NavLink } from "react-router";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className=" text-white  flex items-center justify-between px-6 py-4">
      {/* Left - Logo */}
      
      <div className="flex items-center space-x-3">
          <img
          src={Logo}
          alt="Logo"
          className="w-10 h-10 object-contain"
        />
          <h1 className="text-xl font-semibold">MovieStream</h1>
      </div>

      {/* Middle - Desktop Nav */}
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
              to="/movies-shows"
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
              to="/Support"
              className={({ isActive }) =>
                `px-3 py-2 rounded-lg transition ${
                  isActive ? "bg-gray-700" : "hover:bg-gray-500"
                }`
              }
            >
              Support
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
        </ul>


      {/* Right - Search + Bell (Always Visible) */}
      <div className="flex items-center space-x-2">
        <button className="p-2 hover:bg-gray-800 rounded-full">
          <FaSearch className="text-xl" />
        </button>
        <button className="p-2 hover:bg-gray-800 rounded-full">
          <FaBell className="text-xl" />
        </button>

        {/* Hamburger (Mobile Only) */}
        <button
          className="md:hidden p-2 hover:bg-gray-800 rounded-full z-100"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FaTimes className="text-xl" /> : <FaBars className="text-xl" />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="absolute top-0 right-0 w-[60%] bg-black/90 flex flex-col items-left space-y-4 py-6 md:hidden z-50 p-3 h-[40vh]">
          <a href="/" className="hover:text-red-500 mt-10">Home</a>
          <a href="/movies-shows" className="hover:text-red-500">Movies/Shows</a>
          <a href="/support" className="hover:text-red-500">Support</a>
          <a href="/subscription" className="hover:text-red-500">Subscription</a>
          
        </div>
      )}
    </header>
  );
}
