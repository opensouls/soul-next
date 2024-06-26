"use client";
import React, { useState } from "react";
import { Button } from "@radix-ui/themes";
import ChatInput from "./ChatInput";

import {
  ArrowUpIcon,
  DiscordLogoIcon,
  ReaderIcon,
  OpenInNewWindowIcon,
} from "@radix-ui/react-icons";
import { Soul, SoulOpts } from "@opensouls/engine";

interface ChatFooterProps {
  soul: Soul | null;
  soulProps: SoulOpts;
  onSendMessage: (inputText: string) => void;
}

const ChatFooter: React.FC<ChatFooterProps> = ({ soul, soulProps, onSendMessage }) => {
  const [inputText, setInputText] = useState("");
  const [isFocused, setIsFocused] = useState(false); // State to manage focus

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

          <div className="flex flex-row items-center gap-0">
            <ChatInput
              inputText={inputText}
              handleInputChange={handleInputChange}
              handleSend={handleSend}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
            <SoulDebuggerButton soul={soul} soulProps={soulProps} />
          </div>

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
      </div>
    </>
  );
};

function SoulDebuggerButton({ soul, soulProps }: { soul: Soul | null, soulProps: SoulOpts}) {

  const disableDebugger = !soul || soul?.soulId === undefined || process.env.NEXT_PUBLIC_SOUL_ENGINE_APIKEY === undefined;
  const openDebugger = () => {
    const url = `https://souls.chat/chats/${soulProps.organization}/${soulProps.blueprint}/${soul?.soulId}`;
    window.open(url, '_blank');
  }

  return (
    <Button onClick={openDebugger} size="3" variant="solid" disabled={disableDebugger}>
      <OpenInNewWindowIcon />
    </Button>
  );
}

export default ChatFooter;
