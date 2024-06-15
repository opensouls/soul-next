"use client";

import React, { useState, useEffect } from "react";
import { Soul, SoulOpts, said, Events } from "@opensouls/soul";
import { SoulEvent } from "@opensouls/core";
import ChatMessages from "./ChatMessages";
import ChatFooter from "./ChatFooter";
import { samantha } from "../../scripts/souls";

function ChatWithSoul() {
  const [messages, setMessages] = useState([]);
  const [soul, setSoul] = useState<Soul | null>(null);


  useEffect(() => {
    
    // Create a new Soul instance
    const newSoul = new Soul(samantha);
    setSoul(newSoul);

    // Connect to Soul
    console.log("connecting");

    const handleSays = async ({ content }) => {
      const response = await content();
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: "Soul", text: response },
      ]);
    };
    
    newSoul
      .connect()
      .then(() => {
        newSoul.on("says", handleSays);
    
        // set up other events with soul.on("actionName",....)
      })
      .catch((error) => {
        console.error("Failed to connect to Soul:", error);
      });
    
    return () => {
      if (newSoul) {
        newSoul.off("says", handleSays);
        console.log('disconnected');
        newSoul.disconnect();
      }
    };

  }, []);

  useEffect(() => {
    console.log('hi check');
    if (soul) {
      console.log(soul);
    }

    if (soul && soul.connected) {
      soul.dispatch(said("User", "Hi!"))
        .catch((error) => {
          console.error("Failed to dispatch message:", error);
        });
    }
  }, [soul, soul?.connected]);

  // Function to handle sending a message
  const handleSendMessage = async (inputText: string) => {

    // Check if the Soul instance is started before dispatching a message
    if (soul && soul.connected) {
      try {
        await soul.dispatch(said("User", inputText));
        setMessages((prev) => ([...prev, { sender: "User", text: inputText }]));
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
        <ChatFooter onSendMessage={handleSendMessage} soul={soul} soulProps={samantha} />
      </div>
      <ChatMessages messages={messages} />
    </div>
  );
}

export default ChatWithSoul;
