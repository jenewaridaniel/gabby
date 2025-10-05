import { useState, useCallback, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Squash as Hamburger } from "hamburger-react";
import logo from "../assets/logosss.jpg";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState("");
  const navbarRef = useRef<HTMLDivElement>(null);

  const links = [
    { name: "Rooms & Suites", path: "/rooms" },
    { name: "Experiences", path: "/experiences" },
    { name: "Dining", path: "/dining" },
    { name: "Contact", path: "/contact-us" },
  ];

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = useCallback(() => setIsOpen(false), []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (
        navbarRef.current &&
        !navbarRef.current.contains(e.target as Node) &&
        isOpen
      ) {
        closeMenu();
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        closeMenu();
      }
    };

    window.addEventListener("scroll", handleScroll);
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, closeMenu]);

  return (
    <motion.nav
      ref={navbarRef}
      className={`navbar fixed w-full z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-xl py-4"
          : "bg-white/80 backdrop-blur-xl py-5"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <div className="max-w-7xl mx-auto px-5 flex justify-between items-center">
        {/* Logo */}
        <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative">
              <img
                src={logo}
                className="w-12 h-12 transition-all duration-300 group-hover:opacity-90"
                alt="Hotel Logo"
              />
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-amber-400/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>
          </Link>
        </motion.div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-1">
          {links.map((link) => (
            <motion.div
              key={link.path}
              whileHover={{ y: -2 }}
              whileTap={{ y: 0 }}
            >
              <Link
                to={link.path}
                className={`relative px-5 py-3 text-sm font-medium tracking-wide ${
                  activeLink === link.path
                    ? "text-amber-600"
                    : "text-gray-600 hover:text-amber-500"
                } transition-colors duration-300`}
                onClick={() => setActiveLink(link.path)}
              >
                {link.name}
                {activeLink === link.path && (
                  <motion.span
                    className="absolute left-0 right-0 bottom-2 h-0.5 bg-amber-400"
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                  />
                )}
              </Link>
            </motion.div>
          ))}
        </div>

        {/* CTA Button */}
        <div className="hidden lg:flex items-center gap-4">
          <motion.div
            className="relative"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="absolute inset-0 bg-amber-600 rounded-lg  group-hover:opacity-100 transition-opacity duration-300"></div>
            <Link
              to="/booking"
              className="relative px-6 py-3 rounded-lg bg-amber-600 text-white text-sm font-medium flex items-center gap-2"
            >
              Book Now
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5"
              >
                <path
                  fillRule="evenodd"
                  d="M5 10a.75.75 0 01.75-.75h6.638L10.23 7.29a.75.75 0 111.04-1.08l3.5 3.25a.75.75 0 010 1.08l-3.5 3.25a.75.75 0 11-1.04-1.08l2.158-1.96H5.75A.75.75 0 015 10z"
                  clipRule="evenodd"
                />
              </svg>
            </Link>
          </motion.div>
        </div>

        {/* Mobile Hamburger */}
        <div className="lg:hidden z-50">
          <Hamburger
            toggled={isOpen}
            toggle={toggleMenu}
            color={isScrolled ? "#4B5563" : "#4B5563"}
            rounded
            size={24}
            label="Show menu"
            hideOutline={false}
          />
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <>
              <motion.div
                className="fixed inset-0 bg-black/40 backdrop-blur-md z-40 lg:hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={closeMenu}
              />

              <motion.div
                className="lg:hidden fixed top-0 right-0 w-80 h-screen bg-white z-50 shadow-xl"
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
              >
                <div className="h-full flex flex-col">
                  {/* Header */}
                  <div className="px-6 py-5 border-b border-gray-100 flex justify-between items-center">
                    <Link to="/" className="flex items-center gap-3">
                      <img src={logo} className="w-10 h-10" alt="Logo" />
                    </Link>
                    <button
                      onClick={closeMenu}
                      className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6 text-gray-500"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>

                  {/* Menu Items */}
                  <div className="flex-1 overflow-y-auto py-8 px-6 space-y-1">
                    {links.map((link, index) => (
                      <motion.div
                        key={link.path}
                        initial={{ x: 20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: index * 0.05, duration: 0.3 }}
                      >
                        <Link
                          to={link.path}
                          className={`block py-4 px-5 rounded-xl text-gray-700 hover:bg-amber-50 hover:text-amber-600 transition-all duration-300 ${
                            activeLink === link.path
                              ? "bg-amber-50 text-amber-600 font-medium"
                              : ""
                          }`}
                          onClick={() => {
                            setActiveLink(link.path);
                            closeMenu();
                          }}
                        >
                          {link.name}
                        </Link>
                      </motion.div>
                    ))}
                  </div>

                  {/* Footer CTA */}
                  <div className="p-6 border-t border-gray-100 space-y-4 bg-gray-50">
                    <motion.div
                      className="relative"
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: links.length * 0.05 + 0.1 }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-amber-500 to-amber-600 rounded-xl blur-sm opacity-70"></div>
                      <Link
                        to="/booking"
                        className="relative block py-3 px-4 text-center rounded-xl bg-amber-500 text-white font-medium transition-all duration-300"
                        onClick={closeMenu}
                      >
                        Book Now
                      </Link>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navbar;
