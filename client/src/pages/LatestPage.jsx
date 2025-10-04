import React from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";
import image_1 from "../assets/landingPageAssets/whipsaw_asset_home_1.jpg";
import { cardData } from "@/data/cardData";


const LatestPage = () => {
  const fadeUp = {
    hidden: { opacity: 0, y: 50 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  return (
    <div className="w-full min-h-[90vh] mt-50 lg:mt-90 mb-20">
      <div className="max-w-7xl mx-auto px-5 lg:px-0">
        {/* Heading */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={fadeUp}
          className="text-5xl lg:text-8xl flex flex-col gap-4"
        >
          <p>Ideas, News &</p>
          <p>Breakthroughs</p>
          <p className="border-b mt-10 w-full border-neutral-400" />
        </motion.div>

        {/* Subheading + Button */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={fadeUp}
          transition={{ delay: 0.3 }}
          className="mt-20 flex justify-between items-center"
        >
          <p className="text-5xl font-semibold">Insights</p>
          <Link to={"#"}>
            <span className="text-2xl border border-black px-6 py-5 rounded-full transition-transform duration-300 hover:bg-black hover:text-white transform hover:scale-105">
              View All
            </span>
          </Link>
        </motion.div>

        {/* Image */}
        <motion.div
          className="mt-10 overflow-hidden"
        >
          <img src={image_1} alt="Latest Insights" className="w-full h-screen object-cover" />
          <div>
            <div className="mt-5 flex gap-10">
              <h1 className="text-2xl font-bold">Spolight</h1>
              <span className="text-xl text-neutral-600">3 min read</span>
            </div>
            <p className="text-3xl mt-4">What Makes Design "Good"?</p>
          </div>
        </motion.div>


        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-30">
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

export default LatestPage;
