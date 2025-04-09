import { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaUserCircle, FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/login");
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-[#191970] text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link
          to="/"
          className='text-3xl font-extrabold tracking-wide text-[#00BFFF] [font-family:"Passion_One",cursive]'
        >
          IncredibleYatra
        </Link>

        {/* Center Menu */}
        <div className="hidden md:flex gap-8 text-[15px] font-medium">
          <Link
            to="/packages"
            className={`transition duration-200 ${
              isActive("/packages")
                ? "text-[#00BFFF] border-b-2 border-[#00BFFF]"
                : "hover:text-[#00BFFF]"
            }`}
          >
            Packages
          </Link>
        </div>

        {/* Right Side Buttons */}
        <div className="hidden md:flex items-center gap-6">
          {isLoggedIn ? (
            <>
              <Link
                to="/profile"
                className={`flex items-center gap-1 transition duration-200 ${
                  isActive("/profile")
                    ? "text-[#00BFFF] border-b-2 border-[#00BFFF]"
                    : "hover:text-[#00BFFF]"
                }`}
              >
                <FaUserCircle className="text-xl" />
                Profile
              </Link>
              <button
                onClick={handleLogout}
                className="bg-[#00BFFF] hover:bg-[#1E90FF] transition px-4 py-1.5 rounded-full text-black font-semibold"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-[#00BFFF] transition">
                Login
              </Link>
              <Link
                to="/register"
                className="bg-[#00BFFF] hover:bg-[#1E90FF] transition px-4 py-1.5 rounded-full text-black font-semibold"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden px-4 pb-4 space-y-3 animate-slide-down">
          <Link
            to="/packages"
            className={`block text-sm font-medium ${
              isActive("/packages")
                ? "text-[#00BFFF] border-l-4 pl-2 border-[#00BFFF]"
                : "hover:text-[#00BFFF]"
            }`}
            onClick={() => setMenuOpen(false)}
          >
            Packages
          </Link>

          {isLoggedIn ? (
            <>
              <Link
                to="/profile"
                className={`block text-sm font-medium ${
                  isActive("/profile")
                    ? "text-[#00BFFF] border-l-4 pl-2 border-[#00BFFF]"
                    : "hover:text-[#00BFFF]"
                }`}
                onClick={() => setMenuOpen(false)}
              >
                Profile
              </Link>
              <button
                onClick={() => {
                  handleLogout();
                  setMenuOpen(false);
                }}
                className="block w-full text-left text-sm font-medium hover:text-[#00BFFF]"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="block text-sm font-medium hover:text-[#00BFFF]"
                onClick={() => setMenuOpen(false)}
              >
                Login
              </Link>
              <Link
                to="/register"
                className="block text-sm font-medium hover:text-[#00BFFF]"
                onClick={() => setMenuOpen(false)}
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
