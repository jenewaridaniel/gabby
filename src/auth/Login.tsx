import { motion } from "framer-motion";
import signupLogo from "../assets/swim.jpeg";
import Logo from "../assets/logo.png";
import google from "../assets/google.png";
import { useState } from "react";
import { auth, provider } from "../config/firebase";
import { signInWithPopup, signInWithEmailAndPassword } from "firebase/auth";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../config/firebase";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Check if user exists in profiles collection
  const checkUserExists = async (uid) => {
    const userRef = doc(db, "profiles", uid);
    const userSnap = await getDoc(userRef);
    return userSnap.exists();
  };

  // Save or update user login data
  const saveLoginData = async (user) => {
    const userRef = doc(db, "profiles", user.uid);
    await setDoc(
      userRef,
      {
        lastLoginAt: serverTimestamp(),
        loginCount: (await getDoc(userRef)).data()?.loginCount + 1 || 1,
      },
      { merge: true }
    );
  };

  // Google sign in
  const HandleGoogleSignup = async () => {
    setIsLoading(true);
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      
      // Check if user exists in profiles
      const userExists = await checkUserExists(user.uid);
      if (!userExists) {
        toast.error("Please sign up first");
        await auth.signOut();
        setIsLoading(false);
        return;
      }

      // Save login data
      await saveLoginData(user);
      navigate("/dashboard");
    } catch (error) {
      toast.error(error.messag);
      setIsLoading(false);
    }
  };

  // Email/password sign in
  const handleEmailLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!email || !password) {
      toast.error("Please fill in all fields");
      setIsLoading(false);
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Check if user exists in profiles
      const userExists = await checkUserExists(user.uid);
      if (!userExists) {
        toast.error("Please sign up first");
        await auth.signOut();
        setIsLoading(false);
        return;
      }

      // Save login data
      await saveLoginData(user);
      navigate("/dashboard");
    } catch (error) {
      console.error("Login error:", error);
      toast.error(error.message);
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="h-screen flex bg-gray-50 overflow-hidden relative">
      {/* Loading Modal */}
      {isLoading && (
        <div className="absolute inset-0 bg-black/75 bg-opacity-50 z-50 flex items-center justify-center">
          <motion.div 
            className="bg-white p-8 rounded-xl max-w-sm w-full mx-4 text-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex justify-center mb-4">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-600"></div>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Signing you in</h3>
            <p className="text-gray-600">Please wait while we authenticate your account...</p>
          </motion.div>
        </div>
      )}

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
      />
      
      {/* Image Section - Left with dark overlay */}
      <div className="hidden md:block md:w-1/2 relative">
        <div className="absolute inset-0 bg-black/50 z-10"></div>
        <motion.img
          src={signupLogo}
          alt="Login visual"
          className="w-full h-full object-cover"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        />

        {/* Logo positioned top left */}
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200 }}
          className="absolute top-6 left-6 z-20"
        >
          <img src={Logo} className="w-10 h-10" alt="Logo" />
        </motion.div>

        <motion.div
          className="absolute bottom-10 left-10 text-white z-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <h2 className="text-3xl font-bold mb-2">Welcome Back</h2>
          <p className="text-lg max-w-md">
            Continue your journey with exclusive benefits and discounts
            worldwide.
          </p>
        </motion.div>
      </div>

      {/* Login Form Section - Right */}
      <div className="w-full md:w-1/2 p-6 sm:p-8 overflow-y-auto">
        <motion.div
          className="w-full max-w-lg py-4 mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="header px-6 pt-9 text-2xl md:text-4xl text-center md:text-left font-medium tracking-widest"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <h1>Welcome Back</h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <p className="text-sm px-6 tracking-wider py-3 text-gray-600 text-center md:text-left">
              Sign in to continue your journey with exclusive benefits
            </p>
          </motion.div>

          {/* Google button with animation */}
          <motion.div
            className="flex justify-center py-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <motion.button
              className="flex gap-2 border border-gray-200 rounded-xl p-3 w-11/12 justify-center items-center hover:bg-gray-50 transition-colors duration-200 disabled:opacity-70"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={HandleGoogleSignup}
              disabled={isLoading}
            >
              <img src={google} className="w-5 h-5" alt="Google logo" />
              <span className="font-semibold text-gray-700">
                Sign in with Google
              </span>
            </motion.button>
          </motion.div>

          {/* Divider with animation */}
          <motion.div
            className="relative py-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="px-4 bg-gray-50 text-sm text-gray-600">OR</span>
            </div>
          </motion.div>

          {/* Form */}
          <form onSubmit={handleEmailLogin} className="space-y-4 px-6">
            {/* Email */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <label className="text-sm font-semibold p-2">Email*</label>
              <input
                type="email"
                placeholder="john@example.com"
                className="my-1 w-full p-3 border border-gray-300 rounded-xl outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
                required
              />
            </motion.div>

            {/* Password */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.65 }}
            >
              <label className="text-sm font-semibold p-2">Password*</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="my-1 w-full p-3 border border-gray-300 rounded-xl outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLoading}
                  required
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  onClick={togglePasswordVisibility}
                  disabled={isLoading}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </motion.div>

            {/* Remember me & Forgot password */}
            <motion.div
              className="flex justify-between items-center pt-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="remember"
                  className="w-4 h-4 text-blue-600 outline-none rounded focus:ring-blue-500"
                  disabled={isLoading}
                />
                <label
                  htmlFor="remember"
                  className="ml-2 text-sm text-gray-600"
                >
                  Remember me
                </label>
              </div>
              <a href="#" className="text-sm text-blue-600 hover:underline">
                Forgot password?
              </a>
            </motion.div>

            {/* Submit Button */}
            <motion.div
              className="pt-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              <motion.button
                className="w-full bg-amber-600 hover:bg-amber-500 text-white font-semibold p-3 rounded-xl transition-colors duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
                whileHover={{ scale: isLoading ? 1 : 1.01 }}
                whileTap={{ scale: isLoading ? 1 : 0.99 }}
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? "Signing In..." : "Sign In"}
              </motion.button>
            </motion.div>

            {/* Sign up Link */}
            <motion.div
              className="text-center pt-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
            >
              <p className="text-sm text-gray-600">
                Don't have an account?{" "}
                <a
                  href="/auth/signup"
                  className="text-blue-600 font-semibold hover:underline"
                >
                  Sign up
                </a>
              </p>
            </motion.div>
          </form>
        </motion.div>
      </div>
    </div>
  );
}

export default Login;