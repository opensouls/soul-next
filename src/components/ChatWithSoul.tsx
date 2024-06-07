"use client";
import React, { useState, useEffect } from "react";
import { Soul, SoulOpts, said, Events } from "@opensouls/soul";
import { SoulEvent } from "@opensouls/core";
import ChatMessages from "./ChatMessages";
import ChatFooter from "./ChatFooter";

function ChatWithSoul() {
  const [messages, setMessages] = useState([]);
  const [soulInstance, setSoulInstance] = useState<Soul | null>(null);
  const [initialized, setInitialized] = useState(false);

  const soulProps: SoulOpts = {
    organization: process.env.NEXT_PUBLIC_SOUL_ENGINE_ORGANIZATION as string,
    blueprint: process.env.NEXT_PUBLIC_SOUL_ENGINE_BLUEPRINT as string,
    token: process.env.NEXT_PUBLIC_SOUL_ENGINE_APIKEY as string,
    debug: process.env.NEXT_PUBLIC_SOUL_ENGINE_DEVELOPMENT === "true",
    local: process.env.NEXT_PUBLIC_SOUL_ENGINE_LOCAL === "true",
    soulId: 'hello',
  }

  useEffect(() => {
    // Create a new Soul instance
    const soul = new Soul(soulProps);
    setSoulInstance(soul);

    // Connect to Soul
    console.log("connecting");

    soul
      .connect()
      .then(() => {
        console.log("connected");

        // Set up event listener for incoming messages

        soul.on("says", async ({ content }) => {
          const response = await content();
          // Update messages state with Soul's response
          setMessages((prevMessages) => [
            ...prevMessages,
            { sender: "Soul", text: response },
          ]);
          console.log('Events.says', JSON.stringify(response, null, 2));
        });

        soul.on(Events.newSoulEvent, (evt: SoulEvent) => {
          console.log('Events.newSoulEvent', JSON.stringify(evt, null, 2));
        })

        soul.on(Events.newInteractionRequest, (evt: SoulEvent) => {
          console.log('Events.newInteractionRequest', JSON.stringify(evt, null, 2));
        })

        soul.on(Events.newPerception, (evt: SoulEvent) => {
          console.log('Events.newPerception', JSON.stringify(evt, null, 2));
        })


        // set up other events with soul.on("actionName",....)
      })
      .catch((error) => {
        console.error("Failed to connect to Soul:", error);
      });

    return () => {
      if (soulInstance) {
        console.log('disconnected');
        soulInstance.disconnect();
      }
    };
  }, []);

  useEffect(() => {
    console.log('hi check');
    if(soulInstance) {
      console.log(soulInstance);
    }

    if (soulInstance && soulInstance.connected && !initialized) {
      console.log('sending hi');
      
      soulInstance.dispatch(said("User", "Hi!")).catch((error) => {
        console.error("Failed to dispatch message:", error);
      });
      setInitialized(true);
    }
  }, [soulInstance, soulInstance?.connected, initialized]);

  // Function to handle sending a message
  const handleSendMessage = async (inputText: string) => {
    // Check if the Soul instance is started before dispatching a message
    console.log('handleSendMessage');
    if (soulInstance && soulInstance.connected) {
      try {
        console.log('sending');
        await soulInstance.dispatch(said("User", inputText));
        setMessages((prev) => [...prev, { sender: "User", text: inputText }]);
        console.log('sent');
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
