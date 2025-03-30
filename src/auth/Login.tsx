import { useState } from "react";
import { motion } from "framer-motion";
import { FaGoogle, FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
// import BackButton from "../Backbutton/BackButton";
// import { IoIosArrowForward } from "react-icons/io";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle login logic here
    console.log({ email, password });
  };

  const handleGoogleLogin = () => {
    // Handle Google login logic here
    console.log("Logging in with Google");
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen bg-gray-900 flex items-center justify-center p-4"
    >
        {/* <BackButton/> */}
      <div className="w-full max-w-md">
        <motion.div 
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          className="flex justify-center mb-8"
        >
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white mb-2">
              Welcome back to <span className="text-amber-400">Gabby's Hotel</span>
            </h1>
            <p className="text-gray-300">
              Sign in to continue your journey
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
            {/* Google Login Button */}
            <motion.button
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleGoogleLogin}
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

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
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
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="john@example.com"
                    className="pl-10 w-full px-4 py-3 bg-gray-700 border border-amber-400/20 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none text-white placeholder-amber-400/50 transition"
                    required
                  />
                </div>
              </div>

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
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
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

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-amber-500 focus:ring-amber-500 border-gray-600 rounded bg-gray-700"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-amber-100">
                    Remember me
                  </label>
                </div>

                {/* <div className="text-sm">
                  <a href="#" className="font-medium text-amber-400 hover:text-amber-300">
                    Forgot password?
                  </a>
                </div> */}
              </div>

              <motion.button
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-bold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <span>Sign In</span>
                {/* <IoIosArrowForward className="text-lg" /> */}
              </motion.button>
            </form>

            <div className="mt-8 text-center">
              <p className="text-sm text-amber-200/80">
                Don't have an account?{" "}
                <a href="/auth/signup" className="font-medium text-amber-400 hover:text-amber-300 underline">
                  Sign up
                </a>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Login;