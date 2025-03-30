import { useState } from "react";
import { motion } from "framer-motion";
import {
  FaGoogle,
  FaUser,
  FaLock,
  FaEnvelope,
  FaPhone,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";
import { MdOutlineLocationCity } from "react-icons/md";
// import { IoIosArrowForward } from "react-icons/io";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen bg-gray-900 flex items-center justify-center p-4"
    >
      
      <div className="w-full max-w-2xl">
        <motion.div 
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          className="flex justify-center mb-8"
        >
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white mb-2">
              Welcome to <span className="text-amber-400">Gabby's Hotel</span>
            </h1>
            <p className="text-gray-300">
              Create your account to start your journey
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gray-800 rounded-2xl overflow-hidden shadow-2xl border border-amber-400/10"
        >
          <div className="p-8">
            {/* Google Signup Button */}
            <motion.button
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="w-full flex items-center justify-center gap-3 bg-gray-700 hover:bg-amber-500/10 border border-amber-400/30 rounded-xl py-3 px-6 mb-6 text-amber-400 font-medium transition-all duration-300"
            >
              <FaGoogle className="text-xl" />
              <span>Continue with Google</span>
            </motion.button>

            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-amber-400/20"></div>
              </div>
              <div className="relative flex justify-center">
                <span className="px-3 bg-gray-800 text-sm text-amber-300">
                  OR
                </span>
              </div>
            </div>

            {/* Signup Form */}
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="firstName"
                    className="block text-sm font-medium text-amber-100 mb-2"
                  >
                    First Name
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaUser className="text-amber-400/70" />
                    </div>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      placeholder="John"
                      className="pl-10 w-full px-4 py-3 bg-gray-700 border border-amber-400/20 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none text-white placeholder-amber-400/50 transition"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <label
                    htmlFor="lastName"
                    className="block text-sm font-medium text-amber-100 mb-2"
                  >
                    Last Name
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaUser className="text-amber-400/70" />
                    </div>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      placeholder="Doe"
                      className="pl-10 w-full px-4 py-3 bg-gray-700 border border-amber-400/20 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none text-white placeholder-amber-400/50 transition"
                      required
                    />
                  </div>
                </div>
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-amber-100 mb-2"
                >
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaEnvelope className="text-amber-400/70" />
                  </div>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="john@example.com"
                    className="pl-10 w-full px-4 py-3 bg-gray-700 border border-amber-400/20 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none text-white placeholder-amber-400/50 transition"
                    required
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-amber-100 mb-2"
                >
                  Phone Number
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaPhone className="text-amber-400/70" />
                  </div>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    placeholder="+234 812 345 6789"
                    className="pl-10 w-full px-4 py-3 bg-gray-700 border border-amber-400/20 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none text-white placeholder-amber-400/50 transition"
                    required
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="location"
                  className="block text-sm font-medium text-amber-100 mb-2"
                >
                  Location (State)
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <MdOutlineLocationCity className="text-amber-400/70" />
                  </div>
                  <select
                    id="location"
                    name="location"
                    className="pl-10 w-full px-4 py-3 bg-gray-700 border border-amber-400/20 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none text-white appearance-none"
                  >
                    <option value="">Select your state</option>
                    <option value="Lagos">Lagos</option>
                    <option value="Abuja">Abuja</option>
                    <option value="Rivers">Rivers</option>
                    <option value="Kano">Kano</option>
                    <option value="Oyo">Oyo</option>
                    <option value="Edo">Edo</option>
                    <option value="Delta">Delta</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-amber-100 mb-2"
                  >
                    Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaLock className="text-amber-400/70" />
                    </div>
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      name="password"
                      placeholder="••••••••"
                      className="pl-10 pr-10 w-full px-4 py-3 bg-gray-700 border border-amber-400/20 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none text-white placeholder-amber-400/50 transition"
                      required
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <FaEyeSlash className="text-amber-400/70 hover:text-amber-400" />
                      ) : (
                        <FaEye className="text-amber-400/70 hover:text-amber-400" />
                      )}
                    </button>
                  </div>
                </div>
                
                <div>
                  <label
                    htmlFor="confirmPassword"
                    className="block text-sm font-medium text-amber-100 mb-2"
                  >
                    Confirm Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaLock className="text-amber-400/70" />
                    </div>
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      id="confirmPassword"
                      name="confirmPassword"
                      placeholder="••••••••"
                      className="pl-10 pr-10 w-full px-4 py-3 bg-gray-700 border border-amber-400/20 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none text-white placeholder-amber-400/50 transition"
                      required
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? (
                        <FaEyeSlash className="text-amber-400/70 hover:text-amber-400" />
                      ) : (
                        <FaEye className="text-amber-400/70 hover:text-amber-400" />
                      )}
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="terms"
                    name="terms"
                    type="checkbox"
                    className="h-4 w-4 text-amber-500 focus:ring-amber-500 border-gray-600 rounded bg-gray-700"
                    required
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="terms" className="font-medium text-amber-100">
                    I agree to the{" "}
                    <a href="#" className="text-amber-400 hover:text-amber-300 underline">
                      Terms of Service
                    </a>{" "}
                    and{" "}
                    <a href="#" className="text-amber-400 hover:text-amber-300 underline">
                      Privacy Policy
                    </a>
                  </label>
                </div>
              </div>

              <motion.button
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-bold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <span>Create Account</span>
                {/* <IoIosArrowForward className="text-lg" /> */}
              </motion.button>
            </form>

            <div className="mt-8 text-center">
              <p className="text-sm text-amber-200/80">
                Already have an account?{" "}
                <a href="/auth/login" className="font-medium text-amber-400 hover:text-amber-300 underline">
                  Sign in here
                </a>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Signup;