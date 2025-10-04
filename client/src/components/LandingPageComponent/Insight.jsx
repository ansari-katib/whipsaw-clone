import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Insight = () => {
  return (
    <div className='w-full h-screen bg-black text-white flex items-center justify-center flex-col'>
      <div className='mx-2 max-w-5xl text-center'>
        {/* Heading */}
        <motion.p
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          viewport={{ once: true, amount: 0.5 }}
          className='text-4xl md:text-8xl lg:text-8xl lg:font-bold'
        >
          We turn insight into impact across physical, digital and brand experiences
        </motion.p>

        {/* Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: 'easeOut' }}
          viewport={{ once: true }}
          className='mt-10 flex justify-center'
        >
          <Link to="/work">
            <span className='p-3 px-5 md:p-5 md:px-13 bg-white text-black rounded-full hover:bg-gray-200 cursor-pointer'>
              See our work
            </span>
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default Insight;
