// src/App.jsx
import React from 'react';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import FeaturesSection from './components/FeaturesSection';
import ChatStudio from './components/ChatStudio';

function App() {
  return (
    <div className="bg-background text-text font-sans antialiased">
      <Header />
      <main>
        <HeroSection />
        <FeaturesSection />
        <ChatStudio />
      </main>
      <footer className="text-center py-10 border-t border-border">
        <p className="text-sm text-text/60">
          © {new Date().getFullYear()} AI Furniture.
        </p>
      </footer>
    </div>
  );
}

export default App;