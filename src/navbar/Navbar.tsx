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
    { name: "Contact", path: "/contact" },
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
      className={`navbar fixed w-full  z-50 transition-all duration-300 ${
        isScrolled ? "bg-white/95 backdrop-blur-sm shadow-sm" : "bg-transparent"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto py-4  flex justify-between items-center">
        {/* Logo */}
        <motion.a
          href="/"
          className="text-xl font-semibold text-black tracking-wide"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <img src={logo} className=" w-12 " alt="" />
        </motion.a>

        {/* Desktop Navigation */}
        <div className="hidden text-sm tracking-wider md:flex items-center gap-10">
          {links.map((link) => (
            <motion.a
              key={link.path}
              href={link.path}
              className="relative text-black transition-colors"
              whileHover={{ scale: 1.02 }}
            >
              {link.name}
            </motion.a>
          ))}

          <motion.button
            className="ml-6 px-5 py-3 flex gap-1 items-center bg-amber-600 hover:bg-amber-700 text-white text-xs transition-colors font-medium tracking-wide"
            whileHover={{ y: -1 }}
            whileTap={{ scale: 0.98 }}
          >
            Book Now{" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="size-4 text-gray-50"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"
              />
            </svg>
          </motion.button>
        </div>

        {/* Mobile Hamburger */}
        <div className="md:hidden w-10 z-50">
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
              className="md:hidden fixed top-0 left-0 w-full h-screen bg-white/98 backdrop-blur-lg"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.25 }}
            >
              <div className="container mx-auto px-4 pt-28 pb-8 flex flex-col items-center gap-7">
                {links.map((link, index) => (
                  <motion.a
                    key={link.path}
                    href={link.path}
                    className="text-xl text-black hover:text-amber-800 font-medium"
                    initial={{ y: 15, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 15, opacity: 0 }}
                    transition={{ delay: index * 0.08 }}
                    onClick={closeMenu}
                  >
                    {link.name}
                  </motion.a>
                ))}
                <motion.button
                  className="mt-6 px-10 py-3 bg-amber-600 hover:bg-amber-700 text-white rounded-sm text-lg font-medium tracking-wide"
                  whileHover={{ y: -1 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Book Now
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navbar;
