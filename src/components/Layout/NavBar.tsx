import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { MdMenu, MdPerson } from "react-icons/md";
import Logo from "../../assets/logo.png";
import Sidebar from "./Sidebar";
import { useAuth } from "../../context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";

const NavBar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { username, logout } = useAuth(); 
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleProfileMenu = () => {
    setIsProfileOpen((prev) => !prev);
  };

  return (
    <>
      <nav
        className={`fixed top-0 w-full z-50 ${
          isScrolled
            ? "bg-gradient-to-r from-blue-200 to-sky-500 shadow-lg"
            : "bg-gradient-to-r from-white to-sky-400"
        } transition-all duration-300 ease-in-out`}
      >
        <div className="flex justify-between items-center py-2 px-6">
          <div className="flex justify-center items-center gap-4 text-3xl font-bold text-white">
            <img src={Logo} alt="logo" className="w-14 h-14" />
            <span
              className={`${isScrolled ? "text-white" : "text-sky-500"}`}
              style={{ textShadow: "10px 7px 5px skyblue" }}
            >
              Insurance
            </span>
          </div>

          <div className="hidden md:flex space-x-6">
            {["doubleFlexi", "flexiHealth", "ste", "studentLife"].map(
              (path, index) => (
                <Link
                  key={index}
                  to={`/${path}`}
                  className={`font-semibold text-lg text-white hover:text-yellow-200 transition-colors duration-300 relative`}
                  style={{
                    textShadow: "0.5px 0.2px 1px rgba(0, 0, 0, 0.5)",
                  }}
                >
                  {path
                    .charAt(0)
                    .toUpperCase() +
                    path.slice(1).replace(/([A-Z])/g, " $1").trim()}
                </Link>
              )
            )}
          </div>

          <div className="flex justify-center items-center gap-2 relative">
            <div className="text-white font-bold relative">
              <button
                className="text-3xl text-white hover:bg-blue-500 focus:outline-none border-2 rounded-full "
                onClick={toggleProfileMenu}
              >
                <MdPerson />
              </button>

              <AnimatePresence>
                {isProfileOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg py-2 z-50"
                  >
                    <div className="px-4 py-2 text-sm text-gray-800">
                      {username ? `${username}` : ""}
                    </div>
                    <hr className="my-2" />
                    <button
                      onClick={logout}
                      className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <button
              className="md:hidden text-3xl text-white"
              onClick={() => setIsSidebarOpen(true)}
            >
              <MdMenu />
            </button>
          </div>
        </div>
      </nav>

      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
    </>
  );
};

export default NavBar;
