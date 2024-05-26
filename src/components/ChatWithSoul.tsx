"use client";
import React, { useState, useEffect } from "react";
import { Soul, said } from "@opensouls/soul";
import ChatMessages from "./ChatMessages";
import ChatFooter from "./ChatFooter";

function ChatWithSoul() {
  const [messages, setMessages] = useState([]);
  const [soulInstance, setSoulInstance] = useState<Soul | null>(null);
  const [initialized, setInitialized] = useState(false);

  const soulProps = {
    organization: process.env.NEXT_PUBLIC_SOUL_ENGINE_ORGANIZATION as string,
    blueprint: process.env.NEXT_PUBLIC_SOUL_ENGINE_BLUEPRINT as string,
    token: process.env.NEXT_PUBLIC_SOUL_ENGINE_APIKEY as string,
    debug: process.env.NEXT_PUBLIC_SOUL_ENGINE_DEVELOPMENT === "true",
  }

  useEffect(() => {
    // Create a new Soul instance
    const soul = new Soul(soulProps);
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

        // set up other events with soul.on("actionName",....)
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
  const handleSendMessage = async (inputText: string) => {
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
        <ChatFooter onSendMessage={handleSendMessage} soul={soulInstance} soulProps={soulProps} />
      </div>
      <ChatMessages messages={messages} />
    </div>
  );
}

export default ChatWithSoul;
