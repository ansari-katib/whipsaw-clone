import React from "react";
import { Link } from "react-router-dom"; // make sure it's react-router-dom
import { cardData } from "../../data/cardData";
import { motion } from "framer-motion";

const Latest = () => {
  return (
    <div className="w-full min-h-screen py-20 bg-white">
      <div className="max-w-7xl mx-5 lg:mx-auto flex flex-col gap-10">

        {/* Top Section */}
        <div className="flex flex-col gap-6 lg:flex-row lg:justify-between lg:items-center">
          <p className="text-4xl lg:text-5xl font-bold lg:w-1/2">
            See our latest ideas, breakthroughs and news
          </p>
          <Link to={"/latest"}>
            <span className="text-2xl rounded-full border p-4 border-black hover:bg-black hover:text-white transition-all cursor-pointer">
              View all
            </span>
          </Link>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {cardData.map((item, index) => (
            <motion.div
              key={index}
              className="flex flex-col bg-gray-100 dark:bg-neutral-900 rounded-2xl overflow-hidden shadow-lg cursor-pointer hover:scale-105 transition-transform duration-300"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              {/* Image */}
              <div className="w-full h-64 relative overflow-hidden">
                <img
                  src={item.image}
                  alt={item.heading}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Content */}
              <div className="p-5 flex flex-col gap-3">
                <div className="flex justify-between items-center text-gray-700 dark:text-gray-300 font-medium">
                  <span className="font-semibold">{item.heading}</span>
                  <span>{item.readingTime}</span>
                </div>
                <p className="text-gray-600 dark:text-gray-400 text-xl">
                  {item.desc}
                </p>

                {/* Filters / Tags */}
                <div className="flex flex-wrap gap-2 mt-3">
                  {item.filterBtn.map((btn, i) => (
                    <Link
                      key={i}
                      className="text-sm px-4 py-2 border border-gray-700 rounded-full hover:bg-neutral-300 hover:text-black transition-all"
                      to="#"
                    >
                      {btn}
                    </Link>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Latest;
