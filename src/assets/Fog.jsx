import React, { useState, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { gsap } from "gsap";

const FogControl = ({ destiniation }) => {
  const { camera } = useThree();
  const [fogValue, setFogValue] = useState(60); // Initial fog value set to 60

  useFrame(() => {
    // Calculate the target fog value based on camera position
    // const targetFogValue = camera.position.y < 10 ? 2 : 60;

    // Animate the fog value gradually
    setFogValue(camera.position.y * 2);
  });

  return (
    <>
      <fog attach="fog" far={fogValue} />
    </>
  );
};

export default FogControl;
