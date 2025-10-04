import React, { useState } from "react";
import { AtSign } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { _routes, axiosInstance } from "@/axios/axios";

const BottomBall = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleKeyPress = async (e) => {
    if (e.key === "Enter") {
      if (email.trim() === "") {
        toast.error("Please enter your email!");
        return;
      }

      try {
        const response = await axiosInstance.post(_routes.user.login, { email });

        if (response.status === 200) {
          // Backend returns 200 only if user exists
          toast.success(response.data.message || "Login successful! , welcome to admin page");
          navigate("/admin");
        }
      } catch (err) {
        // Handle 404 (user not found) or other errors
        if (err.response && err.response.status === 404) {
          toast.error(err.response.data.message || "User not found!");
        } else if (err.response && err.response.status === 400) {
          toast.error(err.response.data.message || "Email is required!");
        } else {
          console.error(err);
          toast.error("Something went wrong. Try again.");
        }
      }

    }
  };

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <motion.div
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        className="fixed bottom-10 right-10 z-50 flex items-center justify-center"
      >
        <motion.div
          initial={{ width: 80 }}
          animate={{ width: isHovered ? 300 : 80 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="h-15 lg:h-20 bg-black rounded-full flex items-center px-5 lg:px-4 shadow-lg cursor-pointer"
        >
          {/* Icon */}
          <motion.div
            animate={{ rotate: isHovered ? 90 : 0 }}
            transition={{ duration: 0.3 }}
            className="flex items-center justify-center w-10 h-10 text-white"
          >
            {isHovered ? (
              <span className="text-white text-2xl font-bold">→</span>
            ) : (
              <AtSign className="size-7 md:size-8 text-white" />
            )}
          </motion.div>

          {/* Input field */}
          <AnimatePresence>
            {isHovered && (
              <motion.input
                key="email-input"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
                type="email"
                placeholder="Enter your email"
                className="ml-4 flex-1 bg-transparent outline-none border-b border-white text-white placeholder-white"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={handleKeyPress}
              />
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </>
  );
};

export default BottomBall;
