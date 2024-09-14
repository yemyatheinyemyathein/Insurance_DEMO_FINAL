
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { HiRectangleGroup } from "react-icons/hi2";
import { FaHome } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import Logo from "../../assets/logo.png";
interface SidebarProps {
    isOpen: boolean;
    onClose: () => void;
  }
  
  const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const menuItems = [
    { icon: <FaHome className="text-2xl" />, text: "Home Page", to: "/" },
    { icon: <HiRectangleGroup className="text-2xl" />, text: "Double Flexi", to: "/doubleFlexi" },
    { icon: <HiRectangleGroup className="text-2xl" />, text: "Flexi Health", to: "/flexiHealth" },
    { icon: <HiRectangleGroup className="text-2xl" />, text: "STE", to: "/ste" },
    { icon: <HiRectangleGroup className="text-2xl" />, text: "Student Life", to: "/studentLife" },
  ];

  return (
    <motion.div
      initial={{ x: "100%" }}
      animate={{ x: isOpen ? 0 : "100%" }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="fixed top-0 right-0 h-full w-80 bg-gradient-to-b from-white to-sky-400 shadow-lg z-50 flex flex-col p-4"
    >
      <div className="flex justify-between items-center mb-8">
        <img src={Logo} alt="logo" className="w-12 h-12" />
        <span
              className={`text-2xl font-bold text-sky-400`}
            >
              Insurance
            </span>
        <IoMdClose className="text-sky-500 text-2xl cursor-pointer" onClick={onClose} />
      </div>
      <div className="flex flex-col space-y-4">
        {menuItems.map((item, index) => (
          <Link
            key={index}
            to={item.to}
            className="border-b border-sky-500 flex items-center gap-2 text-sky-500 text-lg hover:bg-sky-600 hover:text-white p-2 rounded-lg transition-colors duration-200"
            onClick={onClose}
          >
            {item.icon}
            {item.text}
          </Link>
        ))}
      </div>
    </motion.div>
  );
};

export default Sidebar;
