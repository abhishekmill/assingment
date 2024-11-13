import React, { useRef, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useTexture } from "@react-three/drei";
import * as THREE from "three";

// Helper to get elevation from Terrain-RGB (replace with real elevation data source)
const getElevation = (r, g, b) => {
  return -10000 + (r * 256 * 256 + g * 256 + b) * 0.1;
};

const Tile = ({ position, textureUrl, elevationData }) => {
  const mesh = useRef();

  // Load tile texture
  const texture = useTexture(textureUrl);

  useEffect(() => {
    if (elevationData && mesh.current) {
      const vertices = mesh.current.geometry.attributes.position.array;

      for (let i = 0; i < vertices.length; i += 3) {
        // Example: Use random elevation; replace with real Terrain-RGB values
        const [r, g, b] = elevationData;
        const elevation = getElevation(r, g, b) / 1000; // Scale elevation
        vertices[i + 2] = elevation; // Set Z position for elevation
      }
      mesh.current.geometry.attributes.position.needsUpdate = true;
    }
  }, [elevationData]);

  return (
    <mesh ref={mesh} position={position}>
      <planeGeometry args={[1, 1, 16, 16]} />
      <meshStandardMaterial map={texture} />
    </mesh>
  );
};

const IndiaMap = () => {
  const tiles = [23]; // Placeholder for tiles' positions, textures, and elevation data

  // Example: fill `tiles` array with positions, texture URLs, and elevation RGB values for India

  return (
    <div className="w-full  h-screen">
      <Canvas camera={{ position: [0, 5, 10], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <OrbitControls />

        {/* Render each tile as a PlaneGeometry */}
        {tiles.map((tile, index) => (
          <Tile
            key={index}
            position={tile.position}
            textureUrl={tile.textureUrl}
            elevationData={tile.elevationData}
          />
        ))}
      </Canvas>
    </div>
  );
};

export default IndiaMap;
