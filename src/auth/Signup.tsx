import { motion } from "framer-motion";
import signupLogo from "../assets/bar.jpeg";
import Logo from "../assets/logo.png";
import google from "../assets/google.png";
import { auth, provider } from "../config/firebase";
import { signInWithPopup, createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../config/firebase";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Signup() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassowrd] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Save user data to Firestore
  const saveUserToFirestore = async (userData) => {
    try {
      await addDoc(collection(db, "profiles"), {
        ...userData,
        createdAt: new Date(),
      });
      // Add a small delay to ensure the loading message is visible
      await new Promise((resolve) => setTimeout(resolve, 1000));
      navigate("/dashboard");
    } catch (error) {
      console.error("Error saving user data:", error);
      toast.error("Failed to save user data. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Handle form submission (email/password signup)
  const HandleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!termsAccepted) {
      toast.error("Please accept the terms and conditions");
      setIsLoading(false);
      return;
    }

    if (!name || !email || !password) {
      toast.error("Please fill in all required fields");
      setIsLoading(false);
      return;
    }

    if (password !== confirmpassword) {
      toast.error("Passwords do not match");
      setIsLoading(false);
      return;
    }

    try {
      // Create user with email and password
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Save user data to Firestore
      await saveUserToFirestore({
        uid: user.uid,
        name,
        email,
        phone,
        provider: "email",
        emailVerified: user.emailVerified,
      });
    } catch (error) {
      setIsLoading(false);
      toast.error("Failed to sign up. " + error.message);
    }
  };

  // Google sign up auth
  const HandleGoogleSignup = async () => {
    setIsLoading(true);
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Save user data to Firestore
      await saveUserToFirestore({
        uid: user.uid,
        name: user.displayName || name || "Google User",
        email: user.email,
        phone: user.phoneNumber || phone || "",
        provider: "google",
        emailVerified: user.emailVerified,
      });
    } catch (error) {
      setIsLoading(false);
      toast.error("Failed to sign up with Google. " + error.message);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
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
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Creating your account
            </h3>
            <p className="text-gray-600">
              Please wait while we set up your account...
            </p>
          </motion.div>
        </div>
      )}

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
      />
      {/* Signup Form Section - Left */}
      <div className="w-full md:w-1/2 p-6 sm:p-8 overflow-y-auto">
        <motion.div
          className="w-full max-w-lg py-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Logo with animation */}
          <a href="/">
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              <img src={Logo} className="w-10 h-10 md:hidden" alt="Logo" />
            </motion.div>
          </a>

          <motion.div
            className="header px-6 pt-9 text-2xl md:text-4xl text-center md:text-left font-medium tracking-widest"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <h1>Treat Yourself to Better Stays</h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <p className="text-sm px-6 tracking-wider py-3 text-gray-600 text-center md:text-left">
              Unlock exclusive deals, added comfort, and extras for memorable
              stays
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
              className="flex gap-2 border border-gray-200 rounded-xl p-3 w-11/12 justify-center items-center hover:bg-gray-50 transition-colors duration-200"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={HandleGoogleSignup}
              disabled={isLoading}
            >
              <img src={google} className="w-5 h-5" alt="Google logo" />
              <span className="font-semibold text-gray-700">
                Sign up with Google
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
          <form onSubmit={HandleSubmit} className="space-y-4 px-6">
            {/* Full Name */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <label className="text-sm font-semibold p-2">Full Name*</label>
              <input
                type="text"
                placeholder="John Doe"
                className="my-1 w-full p-3 border border-gray-300 rounded-xl outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                disabled={isLoading}
              />
            </motion.div>

            {/* Email */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.65 }}
            >
              <label className="text-sm font-semibold p-2">Email*</label>
              <input
                type="email"
                placeholder="john@example.com"
                className="my-1 w-full p-3 border border-gray-300 rounded-xl outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isLoading}
              />
            </motion.div>

            {/* Phone Number */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              <label className="text-sm font-semibold p-2">Phone Number</label>
              <input
                type="tel"
                placeholder="+234 812 345 6789"
                className="my-1 w-full p-3 border border-gray-300 rounded-xl outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                disabled={isLoading}
              />
            </motion.div>

            {/* Password */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.75 }}
            >
              <label className="text-sm font-semibold p-2">Password*</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="my-1 w-full p-3 border border-gray-300 rounded-xl outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={6}
                  disabled={isLoading}
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

            {/* Confirm Password */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <label className="text-sm font-semibold p-2">
                Confirm Password*
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="my-1 w-full p-3 border border-gray-300 rounded-xl outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  value={confirmpassword}
                  onChange={(e) => setConfirmPassowrd(e.target.value)}
                  required
                  minLength={6}
                  disabled={isLoading}
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  onClick={toggleConfirmPasswordVisibility}
                  disabled={isLoading}
                >
                  {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </motion.div>

            {/* Terms and Conditions */}
            <motion.div
              className="flex items-center pt-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.85 }}
            >
              <input
                type="checkbox"
                id="terms"
                className="my-1 w-4 h-4 text-blue-600 outline-none rounded focus:ring-blue-500"
                checked={termsAccepted}
                onChange={(e) => setTermsAccepted(e.target.checked)}
                disabled={isLoading}
              />
              <label htmlFor="terms" className="ml-2 text-sm text-gray-600">
                I agree to the{" "}
                <a href="/terms" className="text-blue-600 hover:underline">
                  Terms and Conditions
                </a>
              </label>
            </motion.div>

            {/* Submit Button */}
            <motion.div
              className="pt-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
            >
              <motion.button
                type="submit"
                className="w-full bg-amber-600 hover:bg-amber-500 text-white font-semibold p-3 rounded-xl transition-colors duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
                whileHover={{ scale: isLoading ? 1 : 1.01 }}
                whileTap={{ scale: isLoading ? 1 : 0.99 }}
                disabled={isLoading}
              >
                {isLoading ? "Creating Account..." : "Create Account"}
              </motion.button>
            </motion.div>

            {/* Login Link */}
            <motion.div
              className="text-center pt-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.95 }}
            >
              <p className="text-sm text-gray-600">
                Already have an account?{" "}
                <a
                  href="/auth/login"
                  className="text-blue-600 font-semibold hover:underline"
                >
                  Log in
                </a>
              </p>
            </motion.div>
          </form>
        </motion.div>
      </div>

      {/* Image Section - Right with dark overlay */}
      <div className="hidden md:block md:w-1/2 relative">
        <div className="absolute inset-0 bg-black/50 z-10"></div>
        <motion.img
          src={signupLogo}
          alt="Signup visual"
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
          <h2 className="text-3xl font-bold mb-2">Discover Amazing Places</h2>
          <p className="text-lg max-w-md">
            Join thousands of happy travelers enjoying exclusive benefits and
            discounts worldwide.
          </p>
        </motion.div>
      </div>
    </div>
  );
}

export default Signup;
