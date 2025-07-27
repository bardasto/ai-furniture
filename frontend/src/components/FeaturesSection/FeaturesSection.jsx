// src/components/FeaturesSection/FeaturesSection.jsx

import React from 'react';
import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import AnimatedGallery from '../AnimatedGallery/AnimatedGallery';
import { features } from '../../constants';

function FeaturesSection() {
  return (
    <section id="process" className="py-24 bg-background">
      <div className="container mx-auto px-4 space-y-20">
        {features.map((feature, index) => (
          <motion.div
            key={feature.title}
            className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16 items-center"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {/* =================================================================== */}
            {/* ВИЗУАЛЬНАЯ ЧАСТЬ (ТЕПЕРЬ ВСЕГДА КВАДРАТНАЯ)                       */}
            {/* =================================================================== */}
            <div className={`w-full aspect-square ${index % 2 === 0 ? 'md:order-last' : ''} md:col-span-5`}>
              
              {/* --- Случай 1: Анимация набора текста --- */}
              {feature.prompt && (
                <div className="w-full h-full p-[1.5px] bg-gradient-to-br from-primary via-text/50 to-primary rounded-xl shadow-lg">
                  <div className="w-full h-full bg-surface rounded-[10px] flex items-center justify-center p-8">
                    <div className="text-text font-mono text-lg">
                      <TypeAnimation
                        sequence={feature.prompt}
                        wrapper="span"
                        speed={50}
                        cursor={true}
                        repeat={Infinity}
                        style={{ display: 'inline-block' }}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* --- Случай 2: Анимированная галерея --- */}
              {feature.galleryImages && (
                <div className="w-full h-full p-[1.5px] bg-gradient-to-br from-primary via-text/50 to-primary rounded-xl shadow-lg">
                  <div className="w-full h-full bg-surface rounded-[10px] overflow-hidden">
                    <AnimatedGallery items={feature.galleryImages} />
                  </div>
                </div>
              )}

              {/* --- Случай 3: Статичная картинка --- */}
              {feature.image && (
                <div className="overflow-hidden w-full h-full rounded-xl shadow-xl">
                  <img src={feature.image} alt={feature.title} className="w-full h-full object-cover" />
                </div>
              )}
            </div>

            {/* =================================================================== */}
            {/* ТЕКСТОВАЯ ЧАСТЬ (ЛЕВАЯ КОЛОНКА)                                   */}
            {/* =================================================================== */}
            <div className="text-center md:text-left md:col-span-7">
              <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4">{feature.title}</h2>
              <p className="text-lg text-text/80 mb-6">{feature.description}</p>
              <a href="#" className="font-bold text-primary hover:underline">
                {feature.linkText} →
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export default FeaturesSection;