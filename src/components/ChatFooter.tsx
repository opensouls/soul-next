"use client";
import React, { useState } from "react";
import { Button } from "@radix-ui/themes";
import ChatInput from "./ChatInput";
import SoulForm from "./SoulForm";
import {
  ArrowUpIcon,
  DiscordLogoIcon,
  FileTextIcon,
  EyeOpenIcon,
  ReaderIcon,
  Cross1Icon,
} from "@radix-ui/react-icons";

interface ChatFooterProps {
  onSendMessage: (inputText: string) => void;
}

const ChatFooter: React.FC<ChatFooterProps> = ({ onSendMessage }) => {
  const [inputText, setInputText] = useState("");
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [isFocused, setIsFocused] = useState(false); // State to manage focus

  const togglePanel = () => {
    setIsPanelOpen(!isPanelOpen);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
  };

  const handleSend = () => {
    if (inputText.trim()) {
      onSendMessage(inputText);
      setInputText("");
    }
  };

  const handleFocus = () => {
    setIsFocused(true); // Set focus state to true when focused
  };

  const handleBlur = () => {
    setIsFocused(false); // Set focus state to false when not focused
  };

  return (
    <>
      <div className="absolute bottom-0 left-0 right-0 border-zinc-800 pb-8 pl-4 pr-4 pt-4 md:m-24 md:mx-auto md:mb-16 md:max-w-screen-lg md:rounded-lg md:bg-zinc-800 md:p-0 md:pl-4 md:pr-4">
        <div className="hidden items-center justify-between md:flex">
          <img
            src="images/logo.png"
            alt="Open Souls Logo"
            height={24}
            width={140}
          />
          <ChatInput
            inputText={inputText}
            handleInputChange={handleInputChange}
            handleSend={handleSend}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
          <div className="flex items-center justify-between gap-2">
            <Button
              className="p-2 cursor-pointer"
              size="3"
              variant="soft"
              onClick={() => open('https://docs.souls.chat/', '_blank')}
            >
              <ReaderIcon />
            </Button>

            <Button
              className="p-2"
              size="3"
              variant="soft"
              onClick={() => open('https://discord.com/invite/opensouls', '_blank')}
            >
              <DiscordLogoIcon />
            </Button>
          </div>
        </div>
        <div className="flex items-center justify-between md:hidden">
          <input
            type="text"
            value={inputText}
            onChange={handleInputChange}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                handleSend();
              }
            }}
            onFocus={handleFocus}
            onBlur={handleBlur}
            placeholder="Talk..."
            className="mr-2 flex-grow rounded-lg py-2 pl-4 font-OS_medium"
          />
          <Button onClick={handleSend} size="3" variant="solid">
            <ArrowUpIcon />
          </Button>
        </div>
        <SoulForm isOpen={isPanelOpen} onClose={togglePanel} />
      </div>
    </>
  );
};

export default ChatFooter;
