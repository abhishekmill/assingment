import * as THREE from "three";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { shaderMaterial } from "@react-three/drei";
import { extend } from "@react-three/fiber";

// Define the custom shader material for the radar pulse
const RadarPulseMaterial = shaderMaterial(
  {
    uTime: 0,
    uOpacity: 0.5,
    uColor: new THREE.Color(0x9900ff), // Radar pulse color
  },
  // Vertex Shader
  `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
  `,
  // Fragment Shader
  `
  uniform float uTime;
  uniform float uOpacity;
  uniform vec3 uColor;
  varying vec2 vUv;

  void main() {
    // Calculate distance from center (vUv - 0.5 to center UV coordinates)
    float dist = length(vUv - vec2(0.5));
    
    // Create a pulsing circular wave that expands over time
    float pulse = smoothstep(0.0, 0.02, 0.5 - abs(dist - mod(uTime * 0.5, 1.0)));

    // Fade out effect as the pulse expands
    float alpha = pulse * uOpacity * (1.0 - dist);

    gl_FragColor = vec4(uColor, alpha);
  }
  `
);

// Extend the shader material to be used in JSX
extend({ RadarPulseMaterial });

const RadarPulseDisc = ({ position, rotation, scale, color = "red" }) => {
  const materialRef = useRef();
  const meshRef = useRef();

  // Animate the uTime uniform to drive the radar pulse expansion
  useFrame((state, delta) => {
    if (materialRef.current) {
      const scale = Math.sin(state.clock.getElapsedTime()) * 0.5;
      meshRef.current.scale.x = scale;
      meshRef.current.scale.y = scale;
      // console.log(delta);
      // materialRef.current.scale.x = scale

      materialRef.current.uTime += delta; // Increments time for pulse expansion
    }
  });

  return (
    <group position={position} rotation={rotation} scale={scale}>
      <mesh ref={meshRef} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[1, 64, 64]} />{" "}
        {/* Disc-shaped plane for radar */}
        <radarPulseMaterial
          ref={materialRef}
          uOpacity={1}
          transparent
          uColor={color}
        />
      </mesh>
    </group>
  );
};

export default RadarPulseDisc;
