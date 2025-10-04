import React from "react";
import { StickyScroll } from "../ui/sticky-scroll-reveal";
import { motion } from "framer-motion";

import image_1 from "../../assets/landingPageAssets/whipsaw_asset_home_1.jpg"
import image_2 from "../../assets/landingPageAssets/whipsaw_asset_home_10.jpg"

const Scroll = () => {
  const scrollContent = [
    {
      title: "Design",
      description:
        "Beautiful layouts inspired by the Whipsaw website, blending minimalism with a modern aesthetic. The interface uses clean typography, balanced spacing, and subtle gradients to create a polished feel. Every element is placed with intention, ensuring that the design feels both functional and visually engaging. make your own great design",
      content: <img src={image_1} alt="Design" />,
    },
    {
      title: "Technology",
      description:
        "Built with React for seamless UI rendering, styled using Tailwind CSS for a responsive and efficient workflow, and enhanced with Framer Motion for smooth, eye-catching animations. Together, these technologies provide a fast, scalable, and interactive experience across devices while keeping the codebase clean and maintainable.",
      content: <img src={image_2} alt="Tech" />,
    },

  ];

  return (
    <div className="w-full h-screen bg-black">

      <motion.div
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.3 }}
        className="w-full h-screen bg-black text-white"
      >
        <StickyScroll content={scrollContent} />
      </motion.div>
    </div>
  );
};

export default Scroll;
