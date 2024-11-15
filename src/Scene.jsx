import {
  Box,
  Cloud,
  OrbitControls,
  Sky,
  Sphere,
  Stats,
} from "@react-three/drei";
import { Canvas, useLoader, useThree } from "@react-three/fiber";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { DoubleSide, TextureLoader } from "three";
import Effects from "./Effects";
import RandomBoxes from "./RandomBox";
import { degToRad } from "three/src/math/MathUtils.js";
import { Base } from "./Map";
import { Building } from "./assets/Building";
import Tile from "./assets/Tile";
import { Physics, RigidBody } from "@react-three/rapier";
// import { Aeroplane } from "./assets/Aeroplane";
import * as Three from "three";
import FlightPath from "./assets/FlightPath";
import RadarPulseDisc from "./assets/Pulse";
import { useControls } from "leva";
import FogControl from "./assets/Fog";
const LINE_NB_POINTS = 500;
const Scene = () => {
  const [destiniation, setdestiniation] = useState("delhi");
  const [animsts, setAnimsts] = useState(false);
  const texture = useLoader(TextureLoader, "./earthmap.jpg");
  const nightTexture = useLoader(TextureLoader, "./earthHeight.png");
  const ind = useLoader(TextureLoader, "./ind.webp");

  useEffect(() => {
    nightTexture.offset.set(0.025, -0.02);
  }, [nightTexture]);

  const sphereRef = useRef();
  // Leva controls for position and rotation
  const { positionX, positionY, positionZ, rotationX, rotationY, rotationZ } =
    useControls({
      positionX: { value: -0.2, min: -10, max: 10, step: 0.1 },
      positionY: { value: -3.5, min: -10, max: 10, step: 0.1 },
      positionZ: { value: 2.1, min: -10, max: 10, step: 0.1 },
      rotationX: { value: -0.1, min: -Math.PI, max: Math.PI, step: 0.1 },
      rotationY: { value: -3, min: -Math.PI, max: Math.PI, step: 0.1 },
      rotationZ: { value: 0, min: -Math.PI, max: Math.PI, step: 0.1 },
    });

  return (
    <div className="w-full h-screen flex justify-center ">
      <h1
        className="capitalize absolute z-10  top-[5vh] 
      font-bold text-white text-4xl  px-20 py-10 rounded-md  backdrop-blur-sm bg-red-600 bg-opacity-5
        "
      >
        {" "}
        lets, Fly to {destiniation}
      </h1>
      <button
        onClick={() => {
          if (!animsts) {
            setAnimsts(!animsts);
          }
        }}
        className="absolute w-[100px] h-12 rounded bg-yellow-300 hover:bg-yellow-800 
        
        duration-300 
        
        top-[85%]  z-20"
      >
        <h2 className="text-white capitalize font-bold text-xl">Fly</h2>
      </button>
      <Canvas camera={{ fov: 75 }}>
        <OrbitControls />
        <ambientLight intensity={0.5} />
        <group
          ref={sphereRef}
          position={[positionX, positionY, positionZ]}
          rotation={[rotationX, rotationY, rotationZ]}
        >
          <Sphere
            args={[1, 42, 42]}
            rotation={[degToRad(40), degToRad(0), degToRad(10)]}
            scale={16}
          >
            <meshStandardMaterial
              // side={DoubleSide}
              map={texture}
              emissiveMap={nightTexture}
              emissive={0x00ff00}
              emissiveIntensity={1}
            />
          </Sphere>
          <RadarPulseDisc
            rotation={[degToRad(-40), degToRad(0), degToRad(-10)]}
            position={[2.6, 13, -9]}
            color="blue"
            scale={1}
          />
          <RadarPulseDisc
            rotation={[degToRad(-20), degToRad(0), degToRad(-10)]}
            position={[2, 15, -5.4]}
            color="red"
            scale={1}
          />
        </group>
        <group
        // position={[0,3,0]}
        // rotation={[degToRad(-20), degToRad(176), degToRad(0)]}
        >
          <FlightPath
            setAnimsts={setAnimsts}
            animsts={animsts}
            destiniation={destiniation}
            setdestiniation={setdestiniation}
            position={[0, 1, 0]}
          />
          <Base scale={100} />
          <group position={[0, 1, 0]}>
            <Cloud
              position={[-9, 0, 5]}
              speed={0.2}
              color={"white"}
              opacity={1}
            />
            <Cloud
              position={[-9, 0, 2]}
              speed={0.2}
              color={"white"}
              opacity={1}
            />
            <Cloud
              position={[-9, 0, 10]}
              speed={0.2}
              color={"red"}
              opacity={1}
            />

            <Cloud
              position={[-3, 2, -5]}
              speed={0.2}
              color={"pink"}
              opacity={1}
            />

            <Cloud
              position={[3, 1, -11]}
              speed={0.2}
              color={"pink"}
              opacity={1}
            />
            <Cloud
              position={[-6, 1, -12]}
              speed={0.2}
              color={"pink"}
              opacity={1}
            />
            <Cloud
              position={[-4, 2, 5]}
              speed={0.2}
              color={"pink"}
              opacity={0.5}
            />
            <Cloud
              position={[-1, 3, 0]}
              speed={0.2}
              color={"pink"}
              opacity={0.75}
            />
          </group>
          <Building scale={[0.005, 0.02, 0.005]} position={[-2, 0, 5]} />
          <Building
            scale={[0.005, 0.02, 0.005]}
            position={[-3.5, 0, -4.5]}
            rotation={[0, degToRad(80), 0]}
          />
          <Tile scale={0.1} position={[0, 0.2, -3]} />
          <Tile scale={0.1} position={[-2, 0.255, 0]} />
          <Tile scale={0.1} position={[-4, 0.25, -3]} />
          <Tile scale={0.1} position={[-4, 0.1, 1]} />
          <Tile scale={0.1} position={[-3.4, 0.23, 3]} />
          <Tile scale={0.05} position={[-3.2, 0.23, 5]} />
        </group>
        <FogControl destiniation={destiniation} />
        {/* <fog attach="fog" far={60} /> */}
        {/* <Sky sunPosition={[0.3, 0.0, 0]} /> */}
        <Stats />
      </Canvas>
    </div>
  );
};

export default Scene;
