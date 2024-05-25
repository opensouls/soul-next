import React, { useEffect, useRef } from "react";

interface Message {
  sender: string;
  text: string;
}

interface ChatMessagesProps {
  messages: Message[];
}

const ChatMessages: React.FC<ChatMessagesProps> = ({ messages }) => {
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const messagesContainer = messagesContainerRef.current;
    if (messagesContainer) {
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
  }, [messages]);

  return (
    <div
      ref={messagesContainerRef}
      className="messages-container absolute bottom-20 left-0 right-0 top-0 overflow-y-auto pb-8 pl-8 pr-8 pt-8 font-OS_medium text-lg md:m-24 md:mx-auto md:mb-16 md:max-w-screen-lg md:p-0 md:pl-4 md:pr-4 md:text-2xl"
    >
      {messages.map((msg, index) => (
        <p
          key={index}
          className={`message mb-2 mt-2 rounded-lg pb-4 pl-4 pr-4 pt-4 transition-colors duration-500 ${
            msg.sender === "Soul" ? "soul-message" : "user-message"
          }`}
          style={{
            transitionDelay: `${index * 50}ms`,
          }}
        >
          {msg.sender}: {msg.text}
        </p>
      ))}
    </div>
  );
};

export default ChatMessages;
