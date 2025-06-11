import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Squash as Hamburger } from "hamburger-react";
import logo from "../assets/logo.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState("");

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
      // Update active link based on scroll position
      const sections = document.querySelectorAll("section");
      sections.forEach((section) => {
        const top = window.scrollY;
        const offset = section.offsetTop - 100;
        const height = section.offsetHeight;
        const id = section.getAttribute("id");
        if (top >= offset && top < offset + height) {
          setActiveLink(`#${id}`);
        }
      });
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (!(e.target as Element).closest(".navbar") && isOpen) {
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
      className={`navbar fixed w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 shadow-sm backdrop-blur-md"
          : "bg-white/90 backdrop-blur-md"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="container mx-auto px-6 py-3 flex justify-between items-center">
        {/* Logo with modern hover effect */}
        <motion.a
          href="/"
          className="flex items-center gap-2"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          <img src={logo} className="w-10 h-10" alt="Hotel Logo" />
        </motion.a>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-1">
          {links.map((link) => (
            <motion.a
              key={link.path}
              href={link.path}
              className={`relative px-4 py-2 text-md font-medium ${
                activeLink === link.path
                  ? "text-amber-600"
                  : "text-gray-700 hover:text-amber-500"
              } transition-colors`}
              whileHover={{ y: -2 }}
              onClick={() => setActiveLink(link.path)}
            >
              {link.name}
              {activeLink === link.path && (
                <motion.span
                  className="absolute left-1/2 bottom-0 h-0.5 bg-amber-400 w-4"
                  initial={{ width: 0, x: "-50%" }}
                  animate={{ width: "80%", x: "-50%" }}
                  transition={{ duration: 0.3 }}
                />
              )}
            </motion.a>
          ))}
        </div>

        {/* CTA Buttons */}
        <div className="hidden lg:flex items-center gap-3 ml-6">
          <motion.a
            href="/auth/signup"
            className="px-4 py-2 text-md font-medium text-gray-700 hover:text-amber-600 transition-colors"
            whileHover={{ y: -1 }}
          >
            Sign In
          </motion.a>
          <motion.a
            href="/booking"
            className="relative px-5 py-3 rounded-full bg-amber-600 text-white text-md font-medium group overflow-hidden"
            whileHover={{ y: -1 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="relative z-10 flex items-center gap-1">
              Book Now
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-4 h-4"
              >
                <path
                  fillRule="evenodd"
                  d="M5 10a.75.75 0 01.75-.75h6.638L10.23 7.29a.75.75 0 111.04-1.08l3.5 3.25a.75.75 0 010 1.08l-3.5 3.25a.75.75 0 11-1.04-1.08l2.158-1.96H5.75A.75.75 0 015 10z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
            <span className="absolute inset-0 bg-gradient-to-r from-amber-600 to-amber-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </motion.a>
        </div>

        {/* Mobile Hamburger */}
        <div className="lg:hidden z-50">
          <Hamburger
            toggled={isOpen}
            toggle={toggleMenu}
            color={isScrolled ? "#000" : "#000"}
            rounded
            size={24}
            label="Show menu"
          />
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <>
              {/* Overlay */}
              <motion.div
                className="fixed inset-0 bg-black/65 h-screen backdrop-blur-lg  z-40 lg:hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={closeMenu}
              />

              {/* Mobile Side Menu */}
              <motion.div
                className="lg:hidden fixed top-0 right-0 w-80 h-screen bg-white z-50 shadow-2xl"
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              >
                <div className="h-full flex flex-col">
                  {/* Header */}
                  <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
                    <a href="/" className="flex items-center gap-2">
                      <img src={logo} className="w-8 h-8" alt="Logo" />
                    </a>
                    <button
                      onClick={closeMenu}
                      className="p-1 rounded-full hover:bg-gray-100 transition-colors"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        className="w-6 h-6"
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
                  <div className="flex-1 overflow-y-auto py-6 px-6 space-y-2">
                    {links.map((link, index) => (
                      <motion.a
                        key={link.path}
                        href={link.path}
                        className={`block py-3 px-4 rounded-lg text-gray-800 hover:bg-amber-50 hover:text-amber-600 transition-colors ${
                          activeLink === link.path
                            ? "bg-amber-50 text-amber-600"
                            : ""
                        }`}
                        initial={{ x: 20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: index * 0.05 }}
                        onClick={() => {
                          setActiveLink(link.path);
                          closeMenu();
                        }}
                      >
                        {link.name}
                      </motion.a>
                    ))}
                  </div>

                  {/* Footer CTA */}
                  <div className="p-6 border-t border-gray-100 space-y-3">
                    <motion.a
                      href="/auth/signup"
                      className="block py-3 px-4 text-center rounded-lg border border-gray-200 text-gray-800 hover:bg-gray-50 transition-colors"
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: links.length * 0.05 }}
                      onClick={closeMenu}
                    >
                      Sign In
                    </motion.a>
                    <motion.a
                      href="/booking"
                      className="block py-3 px-4 text-center rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 text-white hover:from-amber-600 hover:to-amber-700 transition-all"
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: links.length * 0.05 + 0.1 }}
                      onClick={closeMenu}
                    >
                      Book Now
                    </motion.a>
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
