// frontend/src/components/AIMessage/AIMessage.jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const AIMessage = ({ message }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageClick = (imageUrl) => {
    // В будущем здесь будет логика для 3D
    console.log("User selected image:", imageUrl);
    setSelectedImage(imageUrl);
  };

  return (
    <div className="flex items-start gap-3">
      <div className="w-10 h-10 bg-secondary rounded-full flex-shrink-0 flex items-center justify-center font-bold">AI</div>
      <div className="p-4 rounded-r-xl rounded-bl-xl bg-secondary text-foreground max-w-[85%] w-full">
        <p className="mb-4">{message.text}</p>
        
        {/* Сетка с вариантами */}
        {message.imageUrls && (
          <div className="grid grid-cols-2 gap-2">
            {message.imageUrls.map((url, index) => (
              <motion.div
                key={index}
                className="aspect-square rounded-md overflow-hidden cursor-pointer"
                whileHover={{ scale: 1.05 }}
                onClick={() => handleImageClick(url)}
              >
                <img src={url} alt={`Concept ${index + 1}`} className="w-full h-full object-cover" />
              </motion.div>
            ))}
          </div>
        )}
        
        {/* Анимация выбранного изображения */}
        {selectedImage && (
            <div className="mt-4 p-2 border-t border-primary/20">
                <p className="text-sm text-center mb-2">You selected:</p>
                <img src={selectedImage} alt="Selected concept" className="w-full rounded-lg" />
            </div>
        )}
      </div>
    </div>
  );
};

export default AIMessage;