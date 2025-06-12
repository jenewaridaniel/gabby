import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const BookingDetails = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

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
      width: step >= 2 ? "100%" : step === 1 ? "50%" : "0%",
      transition: { duration: 0.5, ease: "easeInOut" },
    }),
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
              {[1, 2, 3].map((i) => (
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
                      step >= i ? "text-gray-400 tracking-widest font-medium" : "text-gray-500"
                    }`}
                  >
                    {i === 1 ? "Details" : i === 2 ? "Review" : "Confirm"}
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
                <motion.h2 variants={itemVariants} className="text-xl font-semibold text-gray-700">
                  Personal Information
                </motion.h2>
                
                <motion.div variants={itemVariants}>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Full Name
                  </label>
                  <motion.input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 outline-none border border-gray-300 rounded-lg  transition"
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
                    Email Address
                  </label>
                  <motion.input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 outline-none border border-gray-300 rounded-lg  transition"
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
                   className="w-full px-4 py-3 outline-none border border-gray-300 rounded-lg  transition"
                    placeholder="+1 (555) 123-4567"
                    required
                    whileFocus={{ scale: 1.01 }}
                  />
                </motion.div>

                <motion.div variants={itemVariants} className="flex justify-end pt-4">
                  <motion.button
                    onClick={nextStep}
                    className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg shadow-md"
                    variants={buttonVariants}
                    whileHover="hover"
                    whileTap="tap"
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
                <motion.h2 variants={itemVariants} className="text-xl font-semibold text-gray-700">
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
                    <p className="font-medium">{formData.phone}</p>
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
                    Confirm
                  </motion.button>
                </motion.div>
              </motion.div>
            )}

            {/* Step 3: Confirmation */}
            {step === 3 && (
              <motion.div
                key="step3"
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
                      <span className="text-gray-500">Name:</span> {formData.name}
                    </p>
                    <p className="text-sm">
                      <span className="text-gray-500">Email:</span>{" "}
                      {formData.email}
                    </p>
                    <p className="text-sm">
                      <span className="text-gray-500">Phone:</span>{" "}
                      {formData.phone}
                    </p>
                  </div>
                </motion.div>

                <motion.button
                  onClick={() => setStep(1)}
                  className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg shadow-md"
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