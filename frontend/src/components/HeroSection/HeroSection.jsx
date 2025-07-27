// src/components/HeroSection/HeroSection.jsx
import React from 'react';
import { motion } from 'framer-motion';

function HeroSection() {
  return (
    <section className="relative w-full h-screen overflow-hidden flex items-center justify-center">
      {/* Ensure you have a high-quality, looping video in public/wood-bg.mp4 */}
      <video src="/wood-bg.mp4" autoPlay loop muted className="absolute top-0 left-0 w-full h-full object-cover z-0" />
      <div className="absolute top-0 left-0 w-full h-full bg-black/50 z-10" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="relative z-20 flex flex-col items-center text-white text-center px-4"
      >
        <h1
          className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold mb-6"
          style={{ textShadow: '0.1px 0.1px 4px rgba(0,0,0,0.5)' }}
        >
          Your Imagination, Our Craft
        </h1>
        <p className="text-lg md:text-xl max-w-2xl font-sans font-light mb-8">
          The only furniture design studio powered by your own creativity.
        </p>
        <button className="bg-primary text-white font-bold py-3 px-8 rounded-full text-lg hover:bg-opacity-90 transition-all transform hover:scale-105">
          Begin Your Design
        </button>
      </motion.div>
    </section>
  );
}

export default HeroSection;