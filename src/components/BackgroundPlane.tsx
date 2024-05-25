"use client";
import React, { useState, useEffect } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import { TextureLoader } from "three";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";

const PlaneWithTexture = () => {
  const texture = useLoader(TextureLoader, "/images/Samantha.png");
  const displacementMap = useLoader(
    TextureLoader,
    "/images/Samantha_displace.png",
  );

  // Original displacement scale
  const ORIGINAL_DISPLACEMENT_SCALE = 0.2; // Adjust as needed for desired effect

  // State management
  const [displacementScale, setDisplacementScale] = useState(
    ORIGINAL_DISPLACEMENT_SCALE,
  );
  const [isHolding, setIsHolding] = useState(false);

  // Function to adjust displacement scale based on click/touch input
  const adjustDisplacementScale = () => {
    if (isHolding) {
      setDisplacementScale((prev) => Math.max(prev - 0.05, 0.1));
    } else if (displacementScale < ORIGINAL_DISPLACEMENT_SCALE) {
      setDisplacementScale((prev) =>
        Math.min(prev + 0.05, ORIGINAL_DISPLACEMENT_SCALE),
      );
    }
  };

  // Frame loop to handle continuous adjustments and rotation
  useFrame(() => {
    adjustDisplacementScale();
  });

  // Mouse/touch event handlers for click-and-hold detection
  const handleStart = () => setIsHolding(true);
  const handleEnd = () => setIsHolding(false);

  // Attach both mouse and touch event listeners
  useEffect(() => {
    window.addEventListener("mousedown", handleStart);
    window.addEventListener("mouseup", handleEnd);
    window.addEventListener("touchstart", handleStart);
    window.addEventListener("touchend", handleEnd);

    return () => {
      window.removeEventListener("mousedown", handleStart);
      window.removeEventListener("mouseup", handleEnd);
      window.removeEventListener("touchstart", handleStart);
      window.removeEventListener("touchend", handleEnd);
    };
  }, []);

  return (
    <mesh position={[0, -1, 0]}>
      <planeGeometry args={[10, 10, 64, 64]} />
      <meshStandardMaterial
        map={texture}
        displacementMap={displacementMap}
        displacementScale={displacementScale}
        transparent={true}
        opacity={1}
      />
    </mesh>
  );
};

const BackgroundPlane = () => {
  return (
    <div className="pointer-events-auto absolute inset-0">
      <Canvas
        className="h-full w-full"
        camera={{ position: [0, 0, 5], fov: 70 }}
      >
        <ambientLight intensity={0.25} />
        <directionalLight position={[0, 5, 5]} intensity={2} />
        <OrbitControls
          enableZoom={false}
          enableRotate={true}
          minPolarAngle={Math.PI / 3}
          maxPolarAngle={(2 * Math.PI) / 3}
          minAzimuthAngle={-Math.PI / 4}
          maxAzimuthAngle={Math.PI / 4}
        />
        <PlaneWithTexture />
      </Canvas>
    </div>
  );
};

export default BackgroundPlane;
