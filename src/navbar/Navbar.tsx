import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Squash as Hamburger } from "hamburger-react";
import logo from "../assets/logo.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

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
      setIsScrolled(window.scrollY > 50);
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (!(e.target as Element).closest(".navbar") && isOpen) {
        closeMenu();
      }
    };

    window.addEventListener("scroll", handleScroll);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, closeMenu]);

  return (
    <motion.nav
      className={`navbar fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? "shadow-sm backdrop-blur-md bg-white/90" : "backdrop-blur-md bg-white/80"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto py-4 px-6 flex justify-between items-center">
        {/* Logo */}
        <motion.a
          href="/"
          className="text-xl font-semibold text-black tracking-wide"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <img src={logo} className="w-12" alt="Logo" />
        </motion.a>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <motion.a
              key={link.path}
              href={link.path}
              className="relative text-black text-sm font-medium tracking-wide transition-colors hover:text-amber-600"
              whileHover={{ scale: 1.02 }}
            >
              {link.name}
            </motion.a>
          ))}

          <div className="flex items-center gap-4 ml-6">
            <motion.a
              href="/auth/signup"
              className="px-4 py-2 text-sm font-medium text-black hover:text-amber-600 transition-colors"
              whileHover={{ y: -1 }}
            >
              Sign Up
            </motion.a>
            <motion.button
              className="px-5 py-3 flex gap-1 items-center rounded-full bg-amber-600 hover:bg-amber-700 text-white text-xs font-medium tracking-wide transition-colors"
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.98 }}
            >
              Book Now
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-4 h-4 text-gray-50"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"
                />
              </svg>
            </motion.button>
          </div>
        </div>

        {/* Mobile Hamburger */}
        <div className="md:hidden z-50">
          <Hamburger
            toggled={isOpen}
            toggle={toggleMenu}
            color={isScrolled ? "#000" : "#000"}
            rounded
          />
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="md:hidden fixed inset-0 w-full h-screen bg-white/95 backdrop-blur-lg z-40"
              initial={{ opacity: 0, x: "100%" }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: "100%" }}
              transition={{ type: "tween", ease: "easeInOut" }}
            >
              <div className="container mx-auto px-6 pt-24 pb-8 h-full flex flex-col">
                <div className="flex-1 flex flex-col items-center justify-center gap-8">
                  {links.map((link, index) => (
                    <motion.a
                      key={link.path}
                      href={link.path}
                      className="text-2xl text-black font-medium hover:text-amber-600 transition-colors"
                      initial={{ x: 20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      exit={{ x: 20, opacity: 0 }}
                      transition={{ delay: index * 0.08 + 0.1 }}
                      onClick={closeMenu}
                    >
                      {link.name}
                    </motion.a>
                  ))}
                </div>

                <div className="flex flex-col gap-4 items-center pb-8">
                  <motion.a
                    href="/auth/signup"
                    className="w-full max-w-xs py-4 text-center text-black font-medium border border-black rounded-sm hover:bg-black hover:text-white transition-colors"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: links.length * 0.08 + 0.1 }}
                    onClick={closeMenu}
                  >
                    Sign Up
                  </motion.a>
                  <motion.button
                    className="w-full max-w-xs py-3 bg-amber-600 hover:bg-amber-700 text-white rounded-sm text-lg font-medium tracking-wide"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: links.length * 0.08 + 0.15 }}
                    whileHover={{ y: -1 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Book Now
                  </motion.button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navbar;