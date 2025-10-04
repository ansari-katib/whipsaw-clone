import React, { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion"; 
import { cn } from "@/lib/utils";

export const StickyScroll = ({ content, contentClassName }) => {
  const [activeCard, setActiveCard] = useState(0);

  const backgroundColors = [ "#0d1f1a", "#000000"];
  const linearGradients = [
    "linear-gradient(to bottom right, #06b6d4, #10b981)",
    "linear-gradient(to bottom right, #ec4899, #6366f1)",
    "linear-gradient(to bottom right, #f97316, #eab308)",
  ];

  const [backgroundGradient, setBackgroundGradient] = useState(
    linearGradients[0]
  );

  useEffect(() => {
    setBackgroundGradient(linearGradients[activeCard % linearGradients.length]);
  }, [activeCard]);

  return (
    <motion.div
      animate={{
        backgroundColor: backgroundColors[activeCard % backgroundColors.length],
      }}
      className="relative flex h-[80vh] justify-center space-x-10 overflow-y-auto rounded-md p-10"
    >
      <div className="div relative flex items-start px-4">
        <div className="max-w-2xl">
          {content.map((item, index) => {
            const ref = useRef(null);
            const inView = useInView(ref, { amount: 0.5 }); // 👈 trigger when 50% is in viewport

            useEffect(() => {
              if (inView) setActiveCard(index);
            }, [inView, index]);

            return (
              <div key={item.title + index} className="my-20" ref={ref}>
                <motion.h2
                  animate={{ opacity: activeCard === index ? 1 : 0.3 }}
                  className="text-5xl font-bold text-slate-100"
                >
                  {item.title}
                </motion.h2>
                <motion.p
                  animate={{ opacity: activeCard === index ? 1 : 0.3 }}
                  className="text-3xl mt-10 max-w-lg text-slate-300"
                >
                  {item.description}
                </motion.p>
              </div>
            );
          })}
          <div className="h-40" />
        </div>
      </div>

      {/* Right sticky image */}
      <div
        style={{ background: backgroundGradient }}
        className={cn(
          "sticky top-10 hidden h-[50vh] w-[30vw] overflow-hidden rounded-md bg-white lg:block",
          contentClassName
        )}
      >
        {content[activeCard].content ?? null}
      </div>
    </motion.div>
  );
};
