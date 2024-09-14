import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { MdMenu } from "react-icons/md";
import Logo from "../../assets/logo.png";
import Sidebar from "./Sidebar";

const NavBar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
            {["doubleFlexi", "flexiHealth", "ste", "studentLife"].map((path, index) => (
              <Link
                key={index}
                to={`/${path}`}
                className={`font-semibold text-lg text-white hover:text-yellow-200 transition-colors duration-300 relative`}
                style={{ textShadow: "0.5px 0.2px 1px rgba(0, 0, 0, 0.5)" }}
              >
                {path.charAt(0).toUpperCase() + path.slice(1).replace(/([A-Z])/g, ' $1').trim()}
              </Link>
            ))}
          </div>

          <div className="flex justify-center items-center gap-4">
            <div className="text-white">Profile Data</div>
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
