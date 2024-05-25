import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { FireParticles } from "./FireParticles";

function Model({ path }) {
  const { scene } = useGLTF(path);
  scene.position.set(0, 0, 0);
  scene.scale.set(8, 8, 8);
  scene.traverse(function (object) {
    if (object.isMesh) object.geometry.center();
  });
  return <primitive object={scene} />;
}

const BackgroundModel = ({ modelPath }) => {
  return (
    <div className="pointer-events-auto absolute inset-0">
      <Canvas
        className="h-full w-full"
        camera={{ position: [0, 0, 5], fov: 50 }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[0, 5, 5]} intensity={1} />
        <OrbitControls
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          rotateSpeed={0.5}
          zoomSpeed={0.5}
          panSpeed={0.5}
        />
        <Model path={modelPath} />
        <FireParticles count={2000} color="#ff6030" />
      </Canvas>
    </div>
  );
};

export default BackgroundModel;
