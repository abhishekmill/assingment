import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useLoader } from "@react-three/fiber";
import { TextureLoader } from "three";

export function Base(props) {
  const { nodes, materials } = useGLTF("/inida .glb");
  const texture = useLoader(TextureLoader, "./photoshoped.jpg");

  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.cleanerpPlane1_1.geometry}
        rotation={[Math.PI / 2, 0, 0]}
        scale={0.01}
      >
        <meshStandardMaterial map={texture} />
      </mesh>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.cleanerpCube1_0.geometry}
        material={materials.lambert2}
        rotation={[Math.PI / 2, 0, 0]}
        scale={0.01}
      />
    </group>
  );
}

useGLTF.preload("/inida .glb");
