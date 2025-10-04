import Insight from '@/components/LandingPageComponent/Insight';
import { BackgroundRippleEffect } from '../components/ui/background-ripple-effect'; // relative path if @ alias not working
import React from 'react';
import FeatureProduct from '@/components/LandingPageComponent/FeatureProduct';
import Scroll from '@/components/LandingPageComponent/Scroll';
import { motion } from 'framer-motion';
import Latest from '@/components/LandingPageComponent/Latest';
import Video from '@/components/LandingPageComponent/Video';

const LandingPage = () => {
  return (
    <>
      <div className="relative flex min-h-[70vh] sm:min-h-[90vh] md:min-h-[90vh] w-full flex-col items-start justify-start overflow-hidden">

        {/* Dark Background behind ripple */}
        <motion.div
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2 }}
          className="absolute inset-0 bg-black z-0"
        />

        {/* Ripple effect stays above black bg but below content */}
        <motion.div
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          viewport={{ once: true }}
          className="absolute inset-0 z-0"
        >
          <BackgroundRippleEffect />
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.3 }}
          className="relative z-10 mt-40 md:mt-60 w-full mx-5 sm:text-center"
        >
          <motion.h2
            initial={{ opacity: 0, y: 20 }}   // only slide up
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            viewport={{ once: true }}
            className="sm:mx-10 lg:mx-auto max-w-7xl text-5xl font-bold text-white md:text-7xl lg:text-8xl xl:text-9xl"
          >
            Design <span className=''>& build what others only imagine</span>
          </motion.h2>
        </motion.div>

      </div>

      <Video />
      <Insight />
      <FeatureProduct />
      <Scroll />
      <Latest />
    </>

  );
};

export default LandingPage;
