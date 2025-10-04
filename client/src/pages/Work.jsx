import React, { useEffect, useState } from "react";
import { axiosInstance, _routes } from "@/axios/axios";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

const Work = () => {
  const [blogs, setBlogs] = useState([]);

  const getAllBlogs = async () => {
    try {
      const response = await axiosInstance.get(_routes.blogs.getAllBlogs_get);
      if (response.status === 200) {
        setBlogs(response.data.blogs);
        console.log(response.data);
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch blogs");
    }
  };

  useEffect(() => {
    getAllBlogs();
  }, []);

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1, // delay between each line
      },
    },
  };

  const lineVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  return (
    <div className="mt-30">
      <div className="max-w-7xl mx-auto px-5 py-20">
        <div>
          <motion.div
            className=""
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <h1 className="text-4xl md:text-8xl lg:text-9xl flex flex-col mb-20 mx-5">
              {["Our partnerships", "shape the human", "experience and ", "transform ", "businesses"].map(
                (line, index) => (
                  <motion.p key={index} variants={lineVariants}>
                    {line}
                  </motion.p>
                )
              )}
            </h1>
          </motion.div>
        </div>
        <div>
          {blogs.length === 0 ? (
            <p className="text-center text-2xl text-neutral-600"> No blogs found.</p>
          ) : (
            <div className="flex flex-col gap-20">
              {blogs.map((blog, index) => (
                <motion.div
                  key={blog._id || index}
                  className={`flex flex-col lg:flex-row items-center gap-10 ${index % 2 !== 0 ? "lg:flex-row-reverse" : ""
                    }`}
                  initial={{ opacity: 0, y: 50 }}     // Start position
                  whileInView={{ opacity: 1, y: 0 }} // Animate on scroll
                  transition={{ duration: 0.6, delay: index * 0.2 }} // Stagger effect
                  viewport={{ once: true }}          // Animate once when in view
                >
                  {/* Image */}
                  <motion.div
                    className="w-full lg:w-1/2"
                    initial={{ scale: 0.9, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    viewport={{ once: true }}
                  >
                    <img
                      src={
                        blog.image ? `https://whipsaw-clone.onrender.com${blog.image}` : "blog image"
                      }
                      alt={blog.title}
                      className="w-full h-64 lg:h-96 object-cover rounded-xl shadow-lg"
                    />
                  </motion.div>

                  {/* Content */}
                  <motion.div
                    className="w-full lg:w-1/2 flex flex-col gap-4"
                    initial={{ x: index % 2 === 0 ? -50 : 50, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    viewport={{ once: true }}
                  >
                    <h2 className="text-3xl font-bold">{blog.title}</h2>
                    <p className="text-gray-500">{blog.content}</p>
                    <p className="text-sm text-gray-400">By {blog.author || "Admin"}</p>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Work;
