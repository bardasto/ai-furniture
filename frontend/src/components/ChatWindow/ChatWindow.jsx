// frontend/src/components/ChatWindow/ChatWindow.jsx
import React, { useState, useRef, useEffect } from 'react';
import AIMessage from '../AIMessage/AIMessage'; // 👈 Импортируем новый компонент

function ChatWindow() {
  const [messages, setMessages] = useState([
    // Структура сообщения бота теперь другая
    { author: 'bot', text: "Welcome! Describe the furniture you've been dreaming of.", imageUrl: null }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef(null); // Для авто-прокрутки

  // Эффект для прокрутки чата вниз при появлении новых сообщений
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    // 1. Добавляем сообщение пользователя
    const userMessage = { author: 'user', text: inputValue };
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      // 2. Отправляем запрос на наш Python бэкенд
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: inputValue }),
      });

      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText}`);
      }

      const data = await response.json();
      
      const botMessage = {
        
        author: 'bot',
        text: data.bot_response,
        imageUrls: data.image_urls // 
        };

        setMessages(prev => [...prev, botMessage]);

      console.log('Structured Data from AI:', data.structured_data);

    } catch (error) {
      console.error('Error fetching AI response:', error);
      const errorMessage = { author: 'bot', text: "Sorry, I'm having trouble connecting. Please try again.", imageUrl: null };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mx-auto bg-white rounded-2xl shadow-2xl flex flex-col h-[70vh] max-w-4xl text-left">
      {/* Область сообщений */}
      <div className="flex-grow p-6 overflow-y-auto">
        <div className="flex flex-col space-y-4">
          {messages.map((msg, index) => {
            if (msg.author === 'bot') {
              return <AIMessage key={index} message={msg} />;
            }
            // Сообщение пользователя
            return (
              <div key={index} className="flex items-start gap-3 justify-end">
                <div className="p-4 rounded-xl max-w-[80%] bg-primary text-white rounded-br-xl">
                  <p>{msg.text}</p>
                </div>
              </div>
            );
          })}
          {/* Индикатор загрузки "Typing..." */}
          {isLoading && (
             <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-secondary rounded-full flex-shrink-0 flex items-center justify-center font-bold">AI</div>
              <div className="p-4 rounded-r-xl rounded-bl-xl bg-secondary text-foreground max-w-[80%]">
                <p className="animate-pulse">Designing your concept...</p>
              </div>
            </div>
          )}
          {/* Пустой элемент для авто-прокрутки */}
          <div ref={chatEndRef} />
        </div>
      </div>

      {/* Область ввода */}
      <div className="p-4 bg-gray-50 border-t border-secondary">
        <div className="flex items-center space-x-3">
          <input
            type="text"
            placeholder="e.g., 'A round dining table made of dark oak...'"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            className="flex-grow p-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-primary transition-all"
            disabled={isLoading}
          />
          <button onClick={handleSendMessage} disabled={isLoading} className="bg-primary text-white rounded-full p-3 flex items-center justify-center hover:bg-opacity-90 transition-colors focus:outline-none disabled:bg-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M12 5l7 7-7 7" /></svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChatWindow;