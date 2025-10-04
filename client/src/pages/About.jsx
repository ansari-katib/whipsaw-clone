import React from 'react'
import { motion } from 'framer-motion';
import { cardData } from '@/data/cardData';
import { Link } from 'react-router';

const About = () => {

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
    <div className=' h-auto w-full mt-50 mb-20 '>
      <div className='max-w-7xl mx-auto '>

        <motion.div
          className=""
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <h1 className="text-4xl md:text-8xl lg:text-9xl flex flex-col my-20 mx-5">
            {["Strategists,", "designers, and", "engineers on a", "mission to solve", "critical challenges"].map(
              (line, index) => (
                <motion.p key={index} variants={lineVariants}>
                  {line}
                </motion.p>
              )
            )}
          </h1>
        </motion.div>


        <div className="mx-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
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
  )
}

export default About
