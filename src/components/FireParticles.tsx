import React, { useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export const FireParticles = ({ count, color }: any) => {
  const mesh = useRef<THREE.Points>(null);

  // Initialize particle positions within a circular area (inside the vessel)
  useEffect(() => {
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const radius = 0.3; // Smaller radius for particles
    const xOffset = -0.15; // Amount to move particles to the left
    const zOffset = -0; // Amount to move particles forward or backward
    const yOffset = 0; // Amount to move particles up or down

    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 4; // Random angle
      const x = Math.cos(angle) * radius + xOffset + zOffset + yOffset; // Adjusted X coordinate
      const y = 0; // Start at base level
      const z = Math.sin(angle) * radius; // Z coordinate
      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      // Set random particle colors
      colors[i * 3] = Math.random();
      colors[i * 3 + 1] = Math.random();
      colors[i * 3 + 2] = Math.random();
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    if(mesh.current) { 
      mesh.current.geometry = geometry;
    }
    
  }, [count]);

  // Animate particles to simulate fire and gravity
  useFrame((state, delta) => {
    if (!mesh.current) return;
    const positions = mesh.current.geometry.attributes.position
      .array as Float32Array;

    const gravity = -5;

    for (let i = 0; i < count; i++) {
      const idx = i * 3 + 1; // Index pointing to Y-axis value
      positions[idx] += (0.02 + Math.random() * 0.05) * delta; // Add a little random to the rise speed and multiply by delta
      positions[idx] += gravity * delta; // Apply gravity and multiply by delta

      // If particle falls below ground, reset its position to a random height
      if (positions[idx] < 0) {
        positions[idx] = Math.random() * 2; // Randomize the height
      }
    }

    mesh.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={mesh}>
      <pointsMaterial
        attach="material"
        size={0.05} // Adjust particle size for visibility
        color={color || "orange"} // Fire-like color
        opacity={0.4} // Subtle opacity for blending
        transparent
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};
