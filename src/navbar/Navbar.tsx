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
          ? " backdrop-blur-md bg-white/90"
          : "backdrop-blur-md bg-white/80"
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
              className="relative text-black text-sm font-medium tracking-wide group transition-colors hover:text-amber-600"
              whileHover={{ scale: 1.02 }}
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-amber-600 transition-all group-hover:w-full"></span>
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
              className="px-5 py-3 flex gap-1 items-center rounded-full bg-amber-600 hover:bg-amber-700 text-white text-xs font-medium tracking-wide transition-colors shadow-lg hover:shadow-amber-600/20"
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
            size={24}
          />
        </div>

        {/* Mobile Side Menu */}
        <AnimatePresence>
          {isOpen && (
            <>
              {/* Overlay */}
              <motion.div
                className="fixed inset-0 bg-black/60 h-screen z-40 md:hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={closeMenu}
              />

              {/* Side Menu */}
              <motion.div
                className="md:hidden fixed top-0 right-0 w-4/5 max-w-sm h-screen bg-white z-50 shadow-xl"
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "tween", ease: "easeInOut" }}
              >
                <div className="container mx-auto px-6 pt-24 pb-8 h-full flex flex-col">
                  {/* Close button */}
                  <button
                    onClick={closeMenu}
                    className="absolute top-6 right-6 p-1 rounded-full hover:bg-gray-100 transition-colors"
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

                  {/* Logo in menu */}
                  {/* <div className="absolute top-6 left-6">
                    <img src={logo} className="w-10" alt="Logo" />
                  </div> */}

                  <div className="flex-1 flex flex-col gap-8 pt-8">
                    {links.map((link, index) => (
                      <motion.a
                        key={link.path}
                        href={link.path}
                        className="text-xl text-black font-medium hover:text-amber-600 transition-colors py-2 border-b border-gray-100"
                        initial={{ x: 20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: 20, opacity: 0 }}
                        transition={{ delay: index * 0.05 + 0.1 }}
                        onClick={closeMenu}
                      >
                        {link.name}
                      </motion.a>
                    ))}
                  </div>

                  <div className="flex flex-col gap-4 items-center pt-8">
                    <motion.a
                      href="/auth/signup"
                      className="w-full py-3 text-center text-black font-medium border border-black rounded-sm hover:bg-black hover:text-white transition-colors"
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: links.length * 0.05 + 0.1 }}
                      onClick={closeMenu}
                    >
                      Sign Up
                    </motion.a>
                    <motion.button
                      className="w-full py-3 bg-amber-600 hover:bg-amber-700 text-white rounded-sm text-lg font-medium tracking-wide shadow-md hover:shadow-amber-600/30 transition-all"
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: links.length * 0.05 + 0.15 }}
                      whileHover={{ y: -1 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Book Now
                    </motion.button>
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
