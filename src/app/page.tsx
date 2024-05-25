"use client";
import { Soul, said } from "@opensouls/soul";
import ChatWithSoul from "../components/ChatWithSoul";
import { React, useState, useRef, useEffect } from "react";
import { Theme, Button } from "@radix-ui/themes";
import { ArrowUpIcon } from "@radix-ui/react-icons";
import { FaDiscord, FaBookSkull } from "react-icons/fa6";
import BackgroundModel from "../components/BackgroundModel";
import BackgroundPlane from "../components/BackgroundPlane";

const Home = () => {
  return (
    <div className="relative h-screen w-screen bg-[rgb(9,9,9)]">
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="pointer-events-auto">
          <ChatWithSoul />
        </div>
      </div>
    </div>
  );
};

export default Home;
