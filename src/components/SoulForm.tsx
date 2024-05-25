import React, { useState, useEffect } from "react";
import * as Form from "@radix-ui/react-form";
import { Button } from "@radix-ui/themes";

interface SoulFormProps {
  isOpen: boolean;
  onClose: () => void;
}

const SoulForm: React.FC<SoulFormProps> = ({ isOpen, onClose }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [opacity, setOpacity] = useState(0);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      setOpacity(1);
    } else {
      setOpacity(0);
      setTimeout(() => {
        setIsVisible(false);
      }, 300);
    }
  }, [isOpen]);

  if (!isVisible) {
    return null;
  }

  return (
    <div
      className="fixed bottom-0 left-0 right-0 top-0 z-50 flex items-center justify-center bg-black bg-opacity-50 transition-opacity duration-300"
      style={{ opacity }}
    >
      <div
        className="mx-auto transform rounded-lg bg-black p-16 shadow-lg transition-transform duration-300"
        style={{ opacity }}
      >
        <h2 className="mb-6 font-OS_medium text-lg text-white">
          Instant Chat - THIS IS NOT STYLED OR ORGANIZED YET
        </h2>

        <Form.Root>
          {/* NAME YOUR SOUL */}
          <div className="mb-4 grid grid-cols-2 gap-6 border-4 border-blue-400">
            <Form.Field className="border-2 border-green-300">
              <Form.Label
                htmlFor="soulName"
                className="mb-2 block font-OS_medium text-white"
              >
                Name Your Soul
              </Form.Label>
              <Form.Control
                asChild
                id="soulName"
                className="w-full rounded border border-gray-300 p-2"
              >
                <input type="text" defaultValue="Spark, the Venture Puppy" />
              </Form.Control>
            </Form.Field>

            {/* CONVO SCENE */}
            <div className="border-2 border-green-300">
              <Form.Field className="w-full">
                <Form.Label
                  htmlFor="conversationScene"
                  className="mb-2 block font-OS_medium text-white"
                >
                  {" Conversational Scene"}
                </Form.Label>
                <Form.Control
                  asChild
                  id="conversationScene"
                  className="w-full rounded border border-gray-300 p-2"
                >
                  <textarea rows={4} />
                </Form.Control>
              </Form.Field>
            </div>

            {/* SPEAKING STYLE */}
            <div className="mb-6 flex items-center border-2 border-red-400">
              <Form.Field className="w-full">
                <Form.Label
                  htmlFor="speakingStyle"
                  className="mb-2 block font-OS_medium text-white "
                >
                  Speaking Style
                </Form.Label>
                <Form.Control
                  asChild
                  id="speakingStyle"
                  className="w-full rounded border border-gray-300 p-2"
                >
                  <input
                    type="text"
                    defaultValue="When the soul says big dummy"
                  />
                </Form.Control>
              </Form.Field>
              {/* SPEAKING STYLE BUTTONS */}
              <div className="ml-4 flex gap-2">
                <Form.Submit asChild>
                  <Button
                    type="Button"
                    className="rounded px-4 py-2 hover:text-white"
                    variant="outline"
                  >
                    -
                  </Button>
                </Form.Submit>
                <Form.Submit asChild>
                  <Button
                    type="Button"
                    className="ml-2 rounded border border-gray-300 px-4 py-2 hover:text-white"
                    variant="outline"
                  >
                    +
                  </Button>
                </Form.Submit>
              </div>
            </div>

            {/* CONVO CONDITIONS */}
            <div className="mb-6 flex items-center border-2 border-red-400">
              <Form.Field className="w-full">
                <Form.Label
                  htmlFor="conditions"
                  className="mb-2 block font-OS_medium text-white"
                >
                  Conversation Conditions & Triggers
                </Form.Label>
                <Form.Control
                  asChild
                  id="conditions"
                  className="w-full rounded border border-gray-300 p-2"
                >
                  <input
                    type="text"
                    defaultValue="When the soul says big dummy"
                  />
                </Form.Control>
              </Form.Field>
              {/* CONVO CONDITIONS BUTTONS */}
              <div className="ml-4 flex gap-2">
                <Form.Submit asChild>
                  <Button
                    type="Button"
                    className="rounded border border-gray-300 px-4 py-2  hover:text-white"
                    variant="outline"
                  >
                    -
                  </Button>
                </Form.Submit>
                <Form.Submit asChild>
                  <Button
                    type="Button"
                    className="ml-2 rounded border border-gray-300 px-4 py-2 hover:text-white"
                    variant="outline"
                  >
                    +
                  </Button>
                </Form.Submit>
              </div>
            </div>
          </div>

          {/* ADD IMAGE */}
          <div className="flex flex-col justify-center rounded-lg border-2 border-dashed p-16">
            <Form.Submit asChild>
              <Button
                type="Button"
                className="rounded border border-gray-300 px-4 py-2  hover:text-white"
                variant="outline"
              >
                +
              </Button>
            </Form.Submit>
            <span className="mt-2 text-center text-sm text-white">
              Upload an image or .gif
            </span>
          </div>
          {/* CANCEL & SAVE BUTTONS */}
          <div className="mt-8 flex justify-between ">
            <Form.Submit asChild>
              <Button
                type="Button"
                className="ml-2 rounded border px-4 py-2 hover:text-white"
                variant="outline"
                onClick={onClose}
              >
                Cancel
              </Button>
            </Form.Submit>
            <Form.Submit asChild>
              <Button
                type="submit"
                className="rounded px-4 py-2 text-white"
                variant="solid"
              >
                Save to Soul Engine
              </Button>
            </Form.Submit>
          </div>
        </Form.Root>
      </div>
    </div>
  );
};

export default SoulForm;
