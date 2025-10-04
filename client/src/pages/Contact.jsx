import React, { useState } from 'react';
import { Link } from 'react-router';
import { motion } from 'framer-motion';
import image_1 from "../assets/landingPageAssets/whipsaw_asset_home_1.jpg"

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    message: ""
  });

  const handleOnChange = (e) => {
    e.preventDefault();
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    // handle form submission logic here
  }

  return (
    <div className='w-full h-auto mb-10'>
      <div className='max-w-7xl mx-auto mt-50'>
        <div className='flex items-start mx-5 justify-between gap-10 flex-col lg:flex-row'>

          {/* Left Text */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            <div
              className='text-5xl lg:text-9xl flex flex-col md:gap-5'
            >
              <p>Create the future.</p>
              <p>Contact us.</p>
            </div>
            <p className='text-lg md:text-2xl w-4/5 mt-3'>Get in touch to share your product challenge and we’ll reach out to schedule an intro call.</p>
          </motion.div>

          {/* Form */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            viewport={{ once: true }}
            className='flex flex-col gap-6 w-[90%] lg:w-[70%]'
          >
            <motion.input
              type='text'
              name="name"
              value={formData.name}
              onChange={handleOnChange}
              placeholder='Name*'
              className='text-2xl border-b border-neutral-700 py-2 focus:outline-none'
              required
              whileFocus={{ scale: 1.02 }}
            />
            <motion.input
              type='text'
              name="company"
              value={formData.company}
              onChange={handleOnChange}
              placeholder='Company'
              className='text-2xl border-b border-neutral-700 py-2 focus:outline-none'
              whileFocus={{ scale: 1.02 }}
            />
            <motion.input
              type='email'
              name="email"
              value={formData.email}
              onChange={handleOnChange}
              placeholder='Email Address*'
              className='text-2xl border-b border-neutral-700 py-2 focus:outline-none'
              whileFocus={{ scale: 1.02 }}
            />
            <motion.textarea
              name="message"
              value={formData.message}
              onChange={handleOnChange}
              placeholder='Message'
              className='text-2xl border-b border-neutral-700 py-2 focus:outline-none resize-none h-40'
              whileFocus={{ scale: 1.02 }}
            />
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              viewport={{ once: true }}
              className='text-neutral-500 font-medium text-xl'
            >
              By submitting, you agree to Whipsaw&apos;s <Link className='underline'>Privacy Policy.</Link>
            </motion.p>
            <motion.button
              type='submit'
              className='text-2xl border-2 bg-black text-white px-10 py-5 cursor-pointer rounded-full mt-5'
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Submit
            </motion.button>
            <motion.div
              className='mt-10 bg-pink-200 p-5 rounded-2xl'
            >
              <h1 className='text-2xl font-bold mb-2'> Important Notice</h1>
              <p className='text-xl font-mono'>We're aware of a scam offering fake Whipsaw positions. These offers are not legitimate. Please block the sender if contacted. Genuine roles are only posted on our website or official LinkedIn account.</p>
            </motion.div>
          </motion.form>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="w-full h-auto min-h-[90vh] flex flex-col lg:flex-row items-start lg:items-center justify-center gap-12 px-6 lg:px-16"
        >
          {/* Image */}
          <motion.img
            src={image_1}
            alt="Director portrait"
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="h-40 w-40 lg:h-60 lg:w-60 rounded-full object-cover shadow-lg"
          />

          {/* Text */}
          <div className="w-full lg:w-3/4 flex flex-col gap-6 r lg:text-left">
            <p className="text-2xl lg:text-4xl font-medium leading-relaxed">
              “Our team isn't just about designing products; we're about creating
              experiences. We believe that every object, every interaction,
              should tell a story.”
            </p>
            <p className="text-lg lg:text-xl text-neutral-600 font-light">
              — Cole Derby, Director of Industrial Design
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Contact;
