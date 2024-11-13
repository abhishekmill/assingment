import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

export function Building(props) {
  const { nodes, materials } = useGLTF("/building.glb");
  return (
    <group {...props} scale={[.01,.013,.01]} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["Highrise_12-Mesh"].geometry}
        material={materials["default"]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["Highrise_12-Mesh_1"].geometry}
        material={materials["Material.001"]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["Highrise_12-Mesh_2"].geometry}
        material={materials["Material.013"]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["Highrise_12-Mesh_3"].geometry}
        material={materials["Material.012"]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["Highrise_12-Mesh_4"].geometry}
        material={materials["Material.009"]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["Highrise_12-Mesh_5"].geometry}
        material={materials["Material.010"]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["Highrise_12-Mesh_6"].geometry}
        material={materials["Material.011"]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["Highrise_12-Mesh_7"].geometry}
        material={materials["Material.002"]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["Highrise_12-Mesh_8"].geometry}
        material={materials["Material.003"]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["Highrise_12-Mesh_9"].geometry}
        material={materials["Material.004"]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["Highrise_12-Mesh_10"].geometry}
        material={materials["Material.005"]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["Highrise_12-Mesh_11"].geometry}
        material={materials["Material.006"]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["Highrise_12-Mesh_12"].geometry}
        material={materials["Material.007"]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["Highrise_12-Mesh_13"].geometry}
        material={materials["Material.008"]}
      />
    </group>
  );
}

useGLTF.preload("/troncityscape1 %23FV7.glb");
