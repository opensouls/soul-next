"use client";
import ChatWithSoul from "../components/ChatWithSoul";

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
