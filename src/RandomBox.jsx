import React from "react";
import { Canvas } from "@react-three/fiber";
import { Box } from "@react-three/drei";
import Effects from "./Effects";

function RandomBuildings({ count }) {
  // Array of bright colors
  const colors = [
    "#FF5733", // Bright red
    "#33FF57", // Bright green
    "#3357FF", // Bright blue
    "#FF33A6", // Bright pink
    "#FFFF33", // Bright yellow
  ];

  // Generate boxes with random sizes, positions, and colors
  const boxes = Array.from({ length: count }, () => ({
    x: (Math.random() - 0.5) * 5, // Random x position within -5 to 5
    y: 0, // Fixed y position
    z: (Math.random() - 0.5) * 5, // Random z position within -5 to 5
    width: Math.random() * 0.3 + 0.02, // Random width between 0.3 and 0.5
    depth: Math.random() * 0.2 + 0.02, // Random depth between 0.3 and 0.5
    height: Math.random() * 0.2 + 0.4, // Random height between 0.4 and 0.6
    color: colors[Math.floor(Math.random() * colors.length)], // Randomly select a color
  }));

  return (
    <>
      {/* Generate boxes as buildings */}
      {boxes.map((box, index) => (
        <Box
          castShadow
          key={index}
          args={[box.width, box.height, box.depth]} // Dimensions
          position={[box.x, box.y + box.height / 2, box.z]} // Position
        >
          <meshStandardMaterial color={'white'} /> {/* Apply random color */}
        </Box>
      ))}
    </>
  );
}

function CityScene({ position, count = 50 }) {
  return (
    <group position={position}>
      {/* Random buildings on the plane */}
      {/* <RandomBuildings count={count} /> */}
    </group>
  );
}

export default CityScene;
