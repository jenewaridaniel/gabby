const Footer = () => {
  return (
    <footer className="bg-gray-950 text-white py-8 ">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Contact Information */}
          <div className="space-y-2">
            <h3 className="text-xl font-bold mb-4">Contact Us</h3>
            <p className=" max-w-3/5">
              s Plot 11 Paradise Avenue off G.U Ake Road/Eliozu Road, Eliogbolo,
              Port Harcourt, Rivers State, Nigeria
            </p>
            <p>Port Harcourt, Nigeria</p>
            <p>Phone: +234 812 345 6789</p>
            <p>Email: gabbyboutiquehotel@gmail.com</p>
          </div>

          {/* Quick Links */}
          <div className="space-y-2">
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="/rooms" className="hover:underline">
                  Rooms & Suites
                </a>
              </li>
              <li>
                <a href="/dining" className="hover:underline">
                  Dining
                </a>
              </li>
              <li>
                <a href="/experiences" className="hover:underline">
                  Experiences
                </a>
              </li>
              <li>
                <a href="/contact-us" className="hover:underline">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div className="space-y-2">
            <h3 className="text-xl font-bold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              {/* Facebook */}
              <a
                href="https://www.facebook.com/share/16QyD3L87N/?mibextid=wwXIfr"
                className="hover:text-amber-300 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                </svg>
              </a>

              {/* Twitter/X */}
              <a
                href="https://x.com/gabbyshotel?s=21"
                className="hover:text-amber-300 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
                </svg>
              </a>

              {/* Instagram */}
              <a
                href="https://www.instagram.com/gabbysboutiquehotel?igsh=MWdtMGprNmcyenM3Yg=="
                className="hover:text-amber-300 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
                </svg>
              </a>
            </div>
            <p className="mt-4">Subscribe to our newsletter</p>
            <div className="flex mt-2">
              <input
                type="email"
                placeholder="Your email"
                className="px-4 py-2 text-gray-50 rounded-l focus:outline-none"
              />
              <button className="bg-amber-700 hover:bg-amber-900 px-4 py-2 rounded-r transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Copyright + TechTrek Credit */}
        <div className="border-t border-gray-50/5 mt-8 pt-6 text-center">
          <p>
            &copy; {new Date().getFullYear()} Hotel Name. All rights reserved.
          </p>
          <p className="mt-1 text-amber-100 text-sm">
            Website by{" "}
            <a
              href="https://techtrek.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline hover:text-amber-50"
            >
              TechTrek
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
