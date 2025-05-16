const Footer = () => {
    return (
      <footer className="bg-gray-950 text-white py-8 mt-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Contact Information */}
            <div className="space-y-2">
              <h3 className="text-xl font-bold mb-4">Contact Us</h3>
              <p className=" max-w-3/5">Plot 11 Primegate Avenue off G.U Ake Road, Eliogbolo, Port Harcourt, Rivers State, Nigeria</p>
              <p>Port Harcourt, Nigeria</p>
              <p>Phone: +234 812 345 6789</p>
              <p>Email: gabbyshotel@gmail.com</p>
            </div>
  
            {/* Quick Links */}
            <div className="space-y-2">
              <h3 className="text-xl font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><a href="/rooms" className="hover:underline">Rooms & Suites</a></li>
                <li><a href="/dining" className="hover:underline">Dining</a></li>
                <li><a href="/expierences" className="hover:underline">Expierences</a></li>
                <li><a href="/contact-us" className="hover:underline">Contact Us</a></li>
              </ul>
            </div>
  
            {/* Social Media */}
            <div className="space-y-2">
              <h3 className="text-xl font-bold mb-4">Follow Us</h3>
              <div className="flex space-x-4">
                <a href="#" className="hover:text-amber-300 transition-colors">
                  <span className="sr-only">Facebook</span>
                  <i className="fab fa-facebook text-2xl"></i>
                </a>
                <a href="#" className="hover:text-amber-300 transition-colors">
                  <span className="sr-only">Twitter</span>
                  <i className="fab fa-twitter text-2xl"></i>
                </a>
                <a href="#" className="hover:text-amber-300 transition-colors">
                  <span className="sr-only">Instagram</span>
                  <i className="fab fa-instagram text-2xl"></i>
                </a>
              </div>
              <p className="mt-4">Subscribe to our newsletter</p>
              <div className="flex mt-2">
                <input 
                  type="email" 
                  placeholder="Your email" 
                  className="px-4 py-2 text-gray-50 rounded-l focus:outline-none"
                />
                <button className="bg-amber-800 hover:bg-amber-900 px-4 py-2 rounded-r transition-colors">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
  
          {/* Copyright + TechTrek Credit */}
          <div className="border-t border-gray-50/5 mt-8 pt-6 text-center">
            <p>&copy; {new Date().getFullYear()} Hotel Name. All rights reserved.</p>
            <p className="mt-1 text-amber-100 text-sm">
              Website by <a 
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