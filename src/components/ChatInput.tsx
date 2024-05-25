import React from "react";
import { Button } from "@radix-ui/themes";
import { ArrowUpIcon } from "@radix-ui/react-icons";

interface ChatInputProps {
  inputText: string;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSend: () => void;
  onFocus?: () => void;
  onBlur?: () => void;
}

const ChatInput: React.FC<ChatInputProps> = ({
  inputText,
  handleInputChange,
  handleSend,
  onFocus,
  onBlur,
}) => {
  return (
    <div className="flex items-center justify-between p-2">
      <input
        type="text"
        value={inputText}
        onChange={handleInputChange}
        onKeyPress={(e) => {
          if (e.key === "Enter") {
            handleSend();
          }
        }}
        onFocus={onFocus}
        onBlur={onBlur}
        placeholder="Talk..."
        className="text-md mr-2 min-w-96 flex-grow rounded-lg px-4 py-2 font-OS_medium"
      />
      <Button onClick={handleSend} size="3" variant="solid">
        <ArrowUpIcon />
      </Button>
    </div>
  );
};

export default ChatInput;
