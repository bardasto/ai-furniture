// src/components/ChatStudio/ChatStudio.jsx
import React from 'react';
import ChatWindow from '../ChatWindow'; // Убедитесь, что импорт правильный

function ChatStudio() {
    return (
        <section id="studio" className="py-24 bg-background border-t border-border">
            <div className="container mx-auto px-4 text-center">
                <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4">The Design Studio</h2>
                <p className="text-lg text-text/70 mb-12 max-w-2xl mx-auto">This is where your ideas take shape. Describe what you envision, and watch the magic happen.</p>
                <ChatWindow />
            </div>
        </section>
    );
}

export default ChatStudio;