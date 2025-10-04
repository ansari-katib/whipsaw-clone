import { Instagram, Linkedin, Youtube } from "lucide-react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import toast from "react-hot-toast"; 
import { _routes, axiosInstance } from "@/axios/axios";

// Placeholder for your configured Axios instance and routes


const Footer = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate(); // FIX 4: Initialize navigate hook for routing

  const navItems = [
    { itemName: "Work", link: "/work" },
    { itemName: "Expertise", link: "/" },
    { itemName: "About", link: "/about" },
    { itemName: "Latest", link: "/latest" },
    { itemName: "Careers", link: "/" },
    { itemName: "Awards", link: "/" },
    { itemName: "The Workshop", link: "/" },
    { itemName: "Futures Report 2025", link: "/" },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email.trim() === "") {
      toast.error("Please enter your email!");
      return;
    }

    try {
      const response = await axiosInstance.post(_routes.user.login, { email });

      if (response.status === 200) {
        toast.success(response.data.message || "Login successful! , welcome to admin page");
        navigate("/admin");
      }
    } catch (err) {
      if (err.response && err.response.status === 404) {
        toast.error(err.response.data.message || "User not found!");
      } else if (err.response && err.response.status === 400) {
        toast.error(err.response.data.message || "Email is required!");
      } else {
        console.error(err);
        toast.error("Something went wrong. Try again.");
      }
    }
    setEmail("");
  };


  // Animation variants
  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const stagger = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <div className="w-full h-auto bg-black text-white">
      <div className="flex flex-col max-w-7xl lg:mx-auto">
        {/* Header + CTA */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={fadeUp}
          className="flex flex-col lg:flex-row gap-10 mx-5 items-start lg:items-center lg:justify-between my-20"
        >
          <h1 className="text-4xl md:text-5xl">Transforming vision into reality</h1>
          <Link
            to="/contact"
            className="md:text-2xl bg-white text-black py-3 px-5 rounded-full hover:scale-105 transition-transform"
          >
            Get in touch
          </Link>
        </motion.div>

        <p className="border-b-2 border-neutral-500" />

        {/* Main Content */}
        <div className="flex mx-5 lg:mx-0 gap-20 lg:items-center flex-col xl:flex-row lg:justify-between mt-20">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-8xl lg:text-9xl flex items-start"
          >
            W
          </motion.div>

          {/* Nav Items */}
          <motion.ul
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={stagger}
            className="grid grid-cols-2 gap-7 md:gap-10 md:text-2xl"
          >
            {navItems.map((item, index) => (
              <motion.li
                key={index}
                variants={fadeUp}
                className="hover:text-gray-400 transition-colors"
              >
                <Link to={item.link}>{item.itemName}</Link>
              </motion.li>
            ))}
          </motion.ul>

          {/* Newsletter + Socials */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={fadeUp}
            className=""
          >
            {/* The onSubmit handler is on the form */}
            <form onSubmit={handleSubmit} className="flex items-center">
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="lg:text-2xl text-md border-b-2 border-neutral-500 py-2 pr-5 lg:pr-30 focus:outline-none bg-black"
                placeholder="Sign up for our newsletter"
                required
              />
              <button
                type="submit" // Type="submit" makes this button trigger the form's onSubmit
                className="text-md lg:text-2xl border-b-2 py-2 border-neutral-400 text-neutral-300 hover:text-neutral-200 transition-colors ml-3"
              >
                Submit
              </button>
            </form>

            <div className="flex gap-10 items-center justify-center mt-10">
              {[Instagram, Linkedin, Youtube].map((Icon, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ type: "spring", stiffness: 200 }}
                >
                  <Icon className="size-10 text-neutral-400 hover:text-white transition-colors" />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Bottom */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          viewport={{ once: true }}
          className="my-20 mx-10"
        >
          <p className="text-lg lg:text-xl text-neutral-500">
            &copy; 1999-2025 Whipsaw Inc.{" "}
            <Link className="underline hover:text-gray-400">
              Privacy Policy
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Footer;