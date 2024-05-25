"use client";
import React, { useState, useEffect } from "react";
import { Soul, said } from "@opensouls/soul";
import ChatMessages from "./ChatMessages";
import ChatFooter from "./ChatFooter";
import process from "process";

function ChatWithSoul() {
  const [messages, setMessages] = useState([]);
  const [soulInstance, setSoulInstance] = useState(null);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    // Create a new Soul instance
    const soul = new Soul({
      organization: "danielhamilton",
      blueprint: "thoth",
    });
    setSoulInstance(soul);

    // Connect to Soul
    soul
      .connect()
      .then(() => {
        // Set up event listener for incoming messages
        soul.on("says", async ({ content }) => {
          const response = await content();
          // Update messages state with Soul's response
          setMessages((prevMessages) => [
            ...prevMessages,
            { sender: "Soul", text: response },
          ]);
        });
      })
      .catch((error) => {
        console.error("Failed to connect to Soul:", error);
      });

    return () => {
      if (soulInstance) {
        soulInstance.disconnect();
      }
    };
  }, []);

  useEffect(() => {
    if (soulInstance && soulInstance.connected && !initialized) {
      soulInstance.dispatch(said("User", "Hi!")).catch((error) => {
        console.error("Failed to dispatch message:", error);
      });
      setInitialized(true);
    }
  }, [soulInstance, initialized]);

  // Function to handle sending a message
  const handleSendMessage = async (inputText) => {
    // Check if the Soul instance is started before dispatching a message
    if (soulInstance && soulInstance.connected) {
      try {
        await soulInstance.dispatch(said("User", inputText));
        setMessages((prev) => [...prev, { sender: "User", text: inputText }]);
      } catch (err) {
        console.error("Failed to dispatch message:", err);
      }
    } else {
      console.error("Soul is not connected. Cannot dispatch message.");
    }
  };

  return (
    <div className="container">
      <div className="pointer-events-auto">
        <ChatFooter onSendMessage={handleSendMessage} />
      </div>
      <ChatMessages messages={messages} />
    </div>
  );
}

export default ChatWithSoul;
