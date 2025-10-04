import React from "react";
import { Carousel } from "@/components/ui/apple-cards-carousel"; // adjust path if needed
import { data } from "../../data/LandingPageData";
import { motion } from "framer-motion"; // 👈 import motion

export const DummyContent = () => {
  return (
    <>
      {[...new Array(3)].map((_, index) => (
        <motion.div
          key={"dummy-content" + index}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: index * 0.2 }}
          viewport={{ once: true, amount: 0.3 }} // 👈 triggers when 30% visible
          className="bg-black dark:bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4"
        >
          <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl font-sans max-w-3xl mx-auto">
            <span className="font-bold text-neutral-700 dark:text-neutral-200">
              The first rule of Apple club is that you boast about Apple club.
            </span>{" "}
            Keep a journal, quickly jot down a grocery list, and take amazing
            class notes. Want to convert those notes to text? No problem.
          </p>
          <motion.img
            src="https://assets.aceternity.com/macbook.png"
            alt="Macbook mockup from Aceternity UI"
            height="500"
            width="500"
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
            className="md:w-1/2 md:h-1/2 h-full w-full mx-auto object-contain"
          />
        </motion.div>
      ))}
    </>
  );
};
function FeatureProduct() {
  return (
    <div className="w-full bg-black"> {/* removed h-screen */}
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true, amount: 0.4 }}
        className="w-full py-20 bg-black dark:bg-black" // removed h-full
      >
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-7xl pl-4 mx-auto text-2xl md:text-5xl font-light text-white font-sans"
        >
          Featured Products
        </motion.h2>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          viewport={{ once: true }}
          className="mt-10"
        >
          <Carousel items={data} />
        </motion.div>
      </motion.div>
    </div>
  );
}

export default FeatureProduct;
