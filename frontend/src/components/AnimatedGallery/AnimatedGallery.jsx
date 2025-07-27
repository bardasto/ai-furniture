// src/components/AnimatedGallery/AnimatedGallery.jsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useAnimationControls } from 'framer-motion';

const AnimatedGallery = ({ items }) => {
  const [selectedId, setSelectedId] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const controls = useAnimationControls();

  const selectedItem = selectedId ? items.find(item => item.id === selectedId) : null;

  useEffect(() => {
    const runSequence = async () => {
      const itemToSelect = items[currentIndex];
      const itemIndexInArray = items.findIndex(item => item.id === itemToSelect.id);
      
      const targetRow = Math.floor(itemIndexInArray / 2);
      const totalRows = Math.ceil(items.length / 2);
      const scrollPercent = (targetRow / totalRows) * 100;

      await controls.start({
        y: `-${scrollPercent}%`,
        transition: { duration: 2, ease: "easeInOut" }
      });

      await new Promise(res => setTimeout(res, 500));
      setSelectedId(itemToSelect.id);
      await new Promise(res => setTimeout(res, 4000));
      setSelectedId(null);
      
      setCurrentIndex(prevIndex => (prevIndex + 1) % items.length);
      await new Promise(res => setTimeout(res, 1000));
    };

    runSequence();
    const intervalId = setInterval(runSequence, 8500);
    return () => clearInterval(intervalId);
  }, [currentIndex, controls, items]);

  return (
    <div className="w-full h-full relative">
      <div className="w-full h-full overflow-hidden">
        <motion.div className="w-full" animate={controls}>
          <div className="grid grid-cols-2 gap-4 p-4">
            {items.map((item) => (
              // ▼▼▼ КОНТЕЙНЕР БОЛЬШЕ НЕ ИМЕЕТ layoutId ▼▼▼
              <motion.div
                key={item.id}
                className="aspect-square bg-background rounded-md overflow-hidden"
              >
                {/* ▼▼▼ layoutId ТЕПЕРЬ НА САМОМ ИЗОБРАЖЕНИИ ▼▼▼ */}
                <motion.img
                  layoutId={`card-image-${item.id}`}
                  src={item.imageSrc}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      <AnimatePresence>
        {selectedItem && (
          <motion.div
            className="absolute inset-0 z-10 p-8 md:p-12 flex items-center justify-center"
            initial={{ backgroundColor: 'rgba(0,0,0,0)' }}
            animate={{ backgroundColor: 'rgba(0,0,0,0.6)' }}
            exit={{ backgroundColor: 'rgba(0,0,0,0)' }}
          >
            {/* ▼▼▼ ЭТОТ КОНТЕЙНЕР БОЛЬШЕ НЕ ДЕЛАЕТ layout-АНИМАЦИЮ, А ПРОСТО ПОЯВЛЯЕТСЯ ▼▼▼ */}
            <motion.div
              className="w-full max-w-md max-h-[80%] bg-surface rounded-xl overflow-hidden shadow-2xl flex flex-col"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
            >
              <div className="w-full overflow-hidden">
                {/* ▼▼▼ АНИМИРУЕТСЯ ИМЕННО ЭТОТ ЭЛЕМЕНТ ▼▼▼ */}
                  <motion.img 
                    layoutId={`card-image-${selectedItem.id}`} 
                    src={selectedItem.imageSrc} 
                    alt={selectedItem.name} 
                    className="w-full h-auto object-contain" // object-contain для правильных пропорций
                  />
              </div>
              <motion.div 
                className="p-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <h3 className="text-2xl font-serif font-bold">{selectedItem.name}</h3>
                <p className="text-text/70 mt-1">Material: {selectedItem.material}</p>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AnimatedGallery;