"use client";

import React, { useState, useEffect } from "react";
import { Soul, SoulOpts, said, Events } from "@opensouls/soul";
import { ActionEvent } from "@opensouls/engine";
import ChatMessages from "./ChatMessages";
import ChatFooter from "./ChatFooter";

export const SOUL_DEBUG = process.env.NEXT_PUBLIC_SOUL_ENGINE_DEV === 'true';
export const samantha: any = {
  blueprint: 'samantha-learns',
  organization: process.env.NEXT_PUBLIC_SOUL_ENGINE_ORGANIZATION as string,
  token: SOUL_DEBUG ? process.env.NEXT_PUBLIC_SOUL_ENGINE_APIKEY : undefined,
  debug: SOUL_DEBUG,
}

interface Message {
  sender: string;
  text: string;
};

function ChatWithSoul() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [soul, setSoul] = useState<Soul | null>(null);


  useEffect(() => {

    // Create a new Soul instance
    const newSoul = new Soul(samantha);
    setSoul(newSoul);

    // Connect to Soul
    console.log("connecting");

    const handleSays = async ({ content }: ActionEvent) => {
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
