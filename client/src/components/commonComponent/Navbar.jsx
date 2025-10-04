import { Menu, X } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const navItems = [
  { itemName: "Work", link: '/work' },
  { itemName: "Expertise", link: '/expertise' },
  { itemName: "About", link: '/about' },
  { itemName: "Latest", link: '/latest' },
  { itemName: "Careers", link: '/careers' },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [show, setShow] = useState(true); // navbar visibility
  const [lastScrollY, setLastScrollY] = useState(0);

  const controlNavbar = () => {
    if (window.scrollY > lastScrollY) {
      setShow(false); // scrolling down → hide
    } else {
      setShow(true); // scrolling up → show
    }
    setLastScrollY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", controlNavbar);
    return () => window.removeEventListener("scroll", controlNavbar);
  }, [lastScrollY]);

  return (
    <motion.div
      className='fixed w-full top-0 left-0 z-50 bg-black text-white'
      animate={{ y: show ? 0 : -120 }} // hide/show with slide
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <div className='w-full flex items-center justify-between px-5 lg:px-20 md:px-20 py-6 lg:py-8 relative'>
        <h1 className='text-3xl md:text-4xl lg:text-5xl tracking-widest'><Link to={'/'}>WHIPSAW</Link></h1>

        {/* Desktop Menu */}
        <motion.ul
          initial="hidden"
          animate="visible"
          variants={{
            visible: {
              transition: { staggerChildren: 0.15 },
            },
          }}
          className='hidden lg:flex items-center lg:gap-10 xl:gap-20'
        >
          {navItems.map((item, index) => (
            <motion.li
              key={index}
              variants={{ hidden: { opacity: 0, y: -20 }, visible: { opacity: 1, y: 0 } }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <Link to={item.link} className="text-2xl font-light">{item.itemName}</Link>
            </motion.li>
          ))}
          <motion.li
            variants={{ hidden: { opacity: 0, y: -20 }, visible: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.5, ease: "easeOut", delay: navItems.length * 0.1 }}
          >
            <Link to="/contact" className='text-2xl bg-white text-black py-3 px-5 rounded-full'>
              Get in touch
            </Link>
          </motion.li>
        </motion.ul>

        {/* Mobile Menu Icon */}
        <div className='lg:hidden cursor-pointer' onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.ul
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={{
                visible: { transition: { staggerChildren: 0.2 } },
              }}
              className='absolute top-full right-0 w-full bg-black/90 flex flex-col items-end gap-4 py-6 lg:hidden px-4 rounded-bl-lg'
            >
              {navItems.map((item, index) => (
                <motion.li
                  key={index}
                  variants={{ hidden: { opacity: 0, x: 20 }, visible: { opacity: 1, x: 0 } }}
                  transition={{ duration: 0.3 }}
                >
                  <Link to={item.link} onClick={() => setIsOpen(false)} className="text-2xl font-light text-white">
                    {item.itemName}
                  </Link>
                </motion.li>
              ))}
              <motion.li
                variants={{ hidden: { opacity: 0, x: 20 }, visible: { opacity: 1, x: 0 } }}
                transition={{ duration: 0.3 }}
              >
                <Link to="/contact" className='text-2xl font-medium text-white' onClick={() => setIsOpen(false)}>
                  Get in touch
                </Link>
              </motion.li>
            </motion.ul>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default Navbar;
