import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUserCircle, FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <nav className="bg-[#191970] text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-xl font-bold tracking-wide text-[#00BFFF]">
          TourBook
        </Link>

        {/* Center Menu */}
        <div className="hidden md:flex gap-6 text-sm font-medium">
          <Link to="/packages" className="hover:text-[#00BFFF] transition">Packages</Link>
        </div>

        {/* Right Side */}
        <div className="hidden md:flex items-center gap-4">
          {isLoggedIn ? (
            <>
              <Link to="/profile" className="flex items-center gap-1 hover:text-[#00BFFF]">
                <FaUserCircle className="text-lg" />
                Profile
              </Link>
              <button
                onClick={handleLogout}
                className="bg-[#00BFFF] px-3 py-1 rounded hover:bg-[#1E90FF] text-[#0B0C10] font-medium"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-[#00BFFF]">Login</Link>
              <Link
                to="/register"
                className="bg-[#00BFFF] px-3 py-1 rounded hover:bg-[#1E90FF] text-[#0B0C10] font-medium"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden px-4 pb-4 space-y-3">
          <Link to="/packages" className="block hover:text-[#00BFFF]">Packages</Link>
          {isLoggedIn ? (
            <>
              <Link to="/profile" className="block hover:text-[#00BFFF]">Profile</Link>
              <button onClick={handleLogout} className="block text-left w-full hover:text-[#00BFFF]">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="block hover:text-[#00BFFF]">Login</Link>
              <Link to="/register" className="block hover:text-[#00BFFF]">Sign Up</Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
