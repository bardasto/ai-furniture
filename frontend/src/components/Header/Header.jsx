
import React, { useState, useEffect } from 'react'; 
import { motion } from 'framer-motion';
import { navLinks } from '../../constants';

function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []); 

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-background/95 shadow-md backdrop-blur-sm' : 'bg-transparent'
      }`}
    >



      <div className="container mx-auto flex justify-between items-center p-4">
            <div className="text-2xl font-serif font-bold">
                 <span className={`transition-colors duration-300 ${isScrolled ? 'text-text' : 'text-white'}`}>
                     YGV
                 </span>
                 <span className={`transition-colors duration-300 ${isScrolled ? 'text-primary' : 'text-white'}`}>
                     AI
                 </span>
            </div>



        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <a key={link.label} href={link.href} className={`transition-colors hover:text-primary ${isScrolled ? 'text-text/80' : 'text-white/80'}`}>
              {link.label}
            </a>
          ))}
        </nav>



        <button className={`hidden md:block border font-bold py-2 px-5 rounded-full transition-all duration-300 text-sm ${
          isScrolled 
            ? 'border-primary text-primary hover:bg-primary hover:text-white' 
            : 'border-white text-white hover:bg-white hover:text-text'
        }`}>
          Start Designing
        </button>


        <div className="md:hidden">
          {/* Mobile menu icon */}
          <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 transition-colors ${isScrolled ? 'text-text' : 'text-white'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" /></svg>
        </div>
      </div>
    </motion.header>
  );
}

export default Header;