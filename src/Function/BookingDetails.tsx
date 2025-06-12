import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../config/firebase"; 

const BookingDetails = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    paymentMethod: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  // Save booking to Firestore
  const saveBooking = async () => {
    if (!formData.name || !formData.email || !formData.paymentMethod) {
      setSubmitError("Please complete all required fields");
      return;
    }

    setIsSubmitting(true);
    setSubmitError("");

    try {
      // Add a new document to the "bookings" collection
      await addDoc(collection(db, "bookings"), {
        name: formData.name,
        email: formData.email,
        paymentMethod: formData.paymentMethod,
        phone: formData.phone || "Not provided", // Optional field
        createdAt: serverTimestamp(),
        status: "pending",
      });
      
      nextStep(); // Move to confirmation step
    } catch (error) {
      console.error("Error saving booking: ", error);
      setSubmitError("Failed to save booking. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
    exit: { opacity: 0, y: -20 },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  };

  const buttonVariants = {
    hover: { scale: 1.05, boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.1)" },
    tap: { scale: 0.98 },
  };

  const progressVariants = {
    initial: { width: "0%" },
    animate: (step: number) => ({
      width:
        step >= 3 ? "100%" : step === 2 ? "66%" : step === 1 ? "33%" : "0%",
      transition: { duration: 0.5, ease: "easeInOut" },
    }),
  };

  const handlePaymentMethodSelect = (method: string) => {
    setFormData((prev) => ({
      ...prev,
      paymentMethod: method,
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl"
      >
        <div className="p-8">
          <motion.h1
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-3xl font-bold text-center text-gray-800 mb-8"
          >
            Booking Summary
          </motion.h1>

          {/* Progress Steps with connecting lines */}
          <div className="relative mb-10">
            <div className="flex justify-between">
              {[1, 2, 3, 4].map((i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex flex-col items-center z-10"
                >
                  <motion.div
                    className={`w-10 h-10 rounded-full flex items-center justify-center 
                    ${
                      step >= i
                        ? "bg-gray-950 text-gray-50"
                        : "bg-gray-200 text-gray-600"
                    } 
                    font-semibold`}
                    whileHover={{ scale: 1.1 }}
                  >
                    {i}
                  </motion.div>
                  <motion.span
                    className={`text-xs mt-2 ${
                      step >= i
                        ? "text-gray-400 tracking-widest font-medium"
                        : "text-gray-500"
                    }`}
                  >
                    {i === 1
                      ? "Details"
                      : i === 2
                      ? "Review"
                      : i === 3
                      ? "Payment"
                      : "Confirm"}
                  </motion.span>
                </motion.div>
              ))}
            </div>
            {/* Progress line */}
            <div className="absolute top-5 left-0 right-0 flex items-center justify-between px-10">
              <div className="flex-1 h-1 mx-2 bg-gray-200 rounded-full overflow-hidden">
                <motion.div
                  className={`h-1 rounded-full ${
                    step >= 2 ? "bg-gray-950" : "bg-gray-200"
                  }`}
                  custom={step}
                  variants={progressVariants}
                  initial="initial"
                  animate="animate"
                />
              </div>
              <div className="flex-1 h-1 mx-2 bg-gray-200 rounded-full overflow-hidden">
                <motion.div
                  className={`h-1 rounded-full ${
                    step >= 3 ? "bg-gray-950" : "bg-gray-200"
                  }`}
                  custom={step}
                  variants={progressVariants}
                  initial="initial"
                  animate="animate"
                />
              </div>
              <div className="flex-1 h-1 mx-2 bg-gray-200 rounded-full overflow-hidden">
                <motion.div
                  className={`h-1 rounded-full ${
                    step >= 4 ? "bg-gray-950" : "bg-gray-200"
                  }`}
                  custom={step}
                  variants={progressVariants}
                  initial="initial"
                  animate="animate"
                />
              </div>
            </div>
          </div>

          <AnimatePresence mode="wait">
            {/* Step 1: Personal Information */}
            {step === 1 && (
              <motion.div
                key="step1"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="space-y-6"
              >
                <motion.h2
                  variants={itemVariants}
                  className="text-xl font-semibold text-gray-700"
                >
                  Personal Information
                </motion.h2>

                <motion.div variants={itemVariants}>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Full Name *
                  </label>
                  <motion.input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 outline-none border border-gray-300 rounded-lg transition"
                    placeholder="John Doe"
                    required
                    whileFocus={{ scale: 1.01 }}
                  />
                </motion.div>

                <motion.div variants={itemVariants}>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Email Address *
                  </label>
                  <motion.input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 outline-none border border-gray-300 rounded-lg transition"
                    placeholder="john@example.com"
                    required
                    whileFocus={{ scale: 1.01 }}
                  />
                </motion.div>

                <motion.div variants={itemVariants}>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Phone Number
                  </label>
                  <motion.input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 outline-none border border-gray-300 rounded-lg transition"
                    placeholder="+1 (555) 123-4567"
                    whileFocus={{ scale: 1.01 }}
                  />
                </motion.div>

                <motion.div
                  variants={itemVariants}
                  className="flex justify-end pt-4"
                >
                  <motion.button
                    onClick={nextStep}
                    disabled={!formData.name || !formData.email}
                    className={`px-6 py-2 text-white font-medium rounded-lg shadow-md ${
                      !formData.name || !formData.email
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-blue-600"
                    }`}
                    variants={buttonVariants}
                    whileHover={
                      formData.name && formData.email ? "hover" : {}
                    }
                    whileTap={formData.name && formData.email ? "tap" : {}}
                  >
                    Next
                  </motion.button>
                </motion.div>
              </motion.div>
            )}

            {/* Step 2: Review Information */}
            {step === 2 && (
              <motion.div
                key="step2"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="space-y-6"
              >
                <motion.h2
                  variants={itemVariants}
                  className="text-xl font-semibold text-gray-700"
                >
                  Review Your Information
                </motion.h2>

                <motion.div
                  variants={itemVariants}
                  className="bg-gray-50 p-6 rounded-lg"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <div className="mb-4">
                    <p className="text-sm text-gray-500">Full Name</p>
                    <p className="font-medium">{formData.name}</p>
                  </div>

                  <div className="mb-4">
                    <p className="text-sm text-gray-500">Email Address</p>
                    <p className="font-medium">{formData.email}</p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">Phone Number</p>
                    <p className="font-medium">
                      {formData.phone || "Not provided"}
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  variants={itemVariants}
                  className="flex justify-between pt-4"
                >
                  <motion.button
                    onClick={prevStep}
                    className="px-6 py-2 border border-gray-300 font-medium rounded-lg"
                    variants={buttonVariants}
                    whileHover="hover"
                    whileTap="tap"
                  >
                    Back
                  </motion.button>
                  <motion.button
                    onClick={nextStep}
                    className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg shadow-md"
                    variants={buttonVariants}
                    whileHover="hover"
                    whileTap="tap"
                  >
                    Continue
                  </motion.button>
                </motion.div>
              </motion.div>
            )}

            {/* Step 3: Payment Options */}
            {step === 3 && (
              <motion.div
                key="step3"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="space-y-6"
              >
                <motion.h2
                  variants={itemVariants}
                  className="text-xl font-semibold text-gray-700"
                >
                  Payment Method *
                </motion.h2>

                <motion.div variants={itemVariants} className="space-y-4">
                  <motion.div
                    className={`p-4 border rounded-lg cursor-not-allowed bg-gray-50 transition-colors`}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    initial={{ opacity: 0.8 }}
                    animate={{ opacity: 0.6 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="flex items-center">
                      <div
                        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center mr-3 border-gray-300 bg-white`}
                      >
                        <div className="w-3 h-3 rounded-full bg-gray-300" />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-600">
                          Pay Online with Paystack
                        </h3>
                        <p className="text-xs text-gray-400 mt-1 flex items-center">
                          <svg
                            className="w-3 h-3 mr-1"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                              clipRule="evenodd"
                            />
                          </svg>
                          Coming Soon
                        </p>
                      </div>
                    </div>
                  </motion.div>
                  <motion.div
                    className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                      formData.paymentMethod === "hotel"
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-300 hover:border-gray-400"
                    }`}
                    onClick={() => handlePaymentMethodSelect("hotel")}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                  >
                    <div className="flex items-center">
                      <div
                        className={`w-5 h-5 rounded-full border flex items-center justify-center mr-3 ${
                          formData.paymentMethod === "hotel"
                            ? "border-blue-500 bg-blue-500"
                            : "border-gray-400"
                        }`}
                      >
                        {formData.paymentMethod === "hotel" && (
                          <svg
                            className="w-3 h-3 text-white"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        )}
                      </div>
                      <div>
                        <h3 className="font-medium">Pay at Hotel</h3>
                        <p className="text-sm text-gray-500">
                          Pay when you arrive at the hotel
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>

                {submitError && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-500 text-sm text-center"
                  >
                    {submitError}
                  </motion.div>
                )}

                <motion.div
                  variants={itemVariants}
                  className="flex justify-between pt-4"
                >
                  <motion.button
                    onClick={prevStep}
                    className="px-6 py-2 border border-gray-300 font-medium rounded-lg"
                    variants={buttonVariants}
                    whileHover="hover"
                    whileTap="tap"
                  >
                    Back
                  </motion.button>
                  <motion.button
                    onClick={saveBooking}
                    disabled={!formData.paymentMethod || isSubmitting}
                    className={`px-6 py-2 text-white font-medium rounded-lg shadow-md ${
                      !formData.paymentMethod || isSubmitting
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-blue-600"
                    }`}
                    variants={buttonVariants}
                    whileHover={formData.paymentMethod && !isSubmitting ? "hover" : {}}
                    whileTap={formData.paymentMethod && !isSubmitting ? "tap" : {}}
                  >
                    {isSubmitting ? "Processing..." : "Complete Booking"}
                  </motion.button>
                </motion.div>
              </motion.div>
            )}

            {/* Step 4: Confirmation */}
            {step === 4 && (
              <motion.div
                key="step4"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="text-center space-y-6"
              >
                <motion.div
                  className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-8 text-blue-50"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </motion.div>

                <motion.h2
                  className="text-xl font-bold text-gray-800"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  Booking Confirmed!
                </motion.h2>
                <motion.p
                  className="text-gray-600 text-md"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  Thank you for your booking. We've sent the details to{" "}
                  {formData.email}.
                </motion.p>

                <motion.div
                  className="bg-blue-50 p-6 rounded-lg text-left"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <h3 className="font-medium text-blue-800 mb-3">
                    Booking Summary
                  </h3>
                  <div className="space-y-2">
                    <p className="text-sm">
                      <span className="text-gray-500">Name:</span>{" "}
                      {formData.name}
                    </p>
                    <p className="text-sm">
                      <span className="text-gray-500">Email:</span>{" "}
                      {formData.email}
                    </p>
                    <p className="text-sm">
                      <span className="text-gray-500">Phone:</span>{" "}
                      {formData.phone || "Not provided"}
                    </p>
                    <p className="text-sm">
                      <span className="text-gray-500">Payment Method:</span>{" "}
                      {formData.paymentMethod === "hotel"
                        ? "Pay at Hotel"
                        : "Not selected"}
                    </p>
                  </div>
                </motion.div>

                <motion.button
                  onClick={() => {
                    setStep(1);
                    setFormData({
                      name: "",
                      email: "",
                      phone: "",
                      paymentMethod: "",
                    });
                  }}
                  className="px-6 py-3 bg-gray-950 text-gray-50 font-medium rounded-lg shadow-md"
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  New Booking
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};

export default BookingDetails;