import React from "react";

interface Message {
  sender: string;
  text: string;
}

interface SoulMessagesProps {
  messages: Message[];
}

const SoulMessages: React.FC<SoulMessagesProps> = ({ messages }) => {
  return (
    <div className="soul-messages pb-8 pl-4 pr-4 pt-4 font-OS_regular transition-all duration-500 ease-out md:m-24 md:mx-auto md:mb-16 md:max-w-screen-lg md:p-0 md:pl-4 md:pr-4 md:text-2xl">
      {messages
        .filter((msg) => msg.sender === "Soul")
        .map((msg, index) => (
          <p
            key={index}
            className="message soul-message pb-4"
            style={{
              opacity: 0,
              transform: "translateY(20px)",
              animationDelay: `${index * 100}ms`,
              animationFillMode: "forwards",
            }}
          >
            {msg.sender}: {msg.text}
          </p>
        ))}
    </div>
  );
};

export default SoulMessages;
