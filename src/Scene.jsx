import {
  Cloud,
  Clouds,
  Line,
  OrbitControls,
  Sky,
  Stats,
} from "@react-three/drei";
import { Canvas, useLoader, useThree } from "@react-three/fiber";
import React, { useMemo } from "react";
import { DoubleSide, TextureLoader } from "three";
import Effects from "./Effects";
import RandomBoxes from "./RandomBox";
import { degToRad } from "three/src/math/MathUtils.js";
import { Base } from "./Map";
import { Building } from "./assets/Building";
import Tile from "./assets/Tile";
import { Aeroplane } from "./assets/Aeroplane";
import * as Three from "three";

const LINE_NB_POINTS = 500;
const Scene = () => {
  const curve = useMemo(() => {
    return new Three.CatmullRomCurve3(
      [
        new Three.Vector3(0, 0, 0),
        new Three.Vector3(0, 0, -10),
        new Three.Vector3(-2, 0, -20),
        new Three.Vector3(-3, 0, -30),
        new Three.Vector3(0, 0, -40),
        new Three.Vector3(5, 0, -50),
      ],
      false,
      "catmullrom",
      0.5
    );
  }, []);

  const linePoints = useMemo(() => {
    return curve.getPoints(LINE_NB_POINTS);
  }, [curve]);

  const texture = useLoader(TextureLoader, "./earth.jpg");
  const nightTexture = useLoader(TextureLoader, "./earthHeight.png");
  const ind = useLoader(TextureLoader, "./ind.webp");
  return (
    <div className="w-full h-screen">
      <Canvas>
        <OrbitControls />
        <ambientLight intensity={0.8} />

        <group position={[0,3,0]}>

          
        <Line points={linePoints} color={"red"} opacity={1} lineWidth={10} />
        </group>

        {/* <pointLight position={[0, 15, -5]} distance={100} intensity={100} /> */}
        {/* <Sphere>
          <meshStandardMaterial
            map={texture}
            displacementMap={nightTexture}
            displacementScale={4}
            emissiveMap={nightTexture}
            emissiveIntensity={1.5}
            emissive={0xffd700}
          />
        </Sphere> */}
        {/* <Sky sunPosition={[0, 6, 0]} /> */}
        {/* <mesh rotation={[Math.PI / 2, degToRad(180), 0]} scale={60}>
          <planeGeometry />
          <meshStandardMaterial side={DoubleSide} map={ind} />
        </mesh> */}

        <Aeroplane scale={0.02} position={[-3, 1.5, -3]} />
        <Base scale={100} />
        <group position={[0, -1, 0]}>
          <Cloud
            position={[-3, 5, -5]}
            speed={0.2}
            color={"pink"}
            opacity={1}
          />
          <Cloud
            position={[4, 5, -15]}
            speed={0.2}
            color={"pink"}
            opacity={0.5}
          />
          <Cloud
            position={[-4, 5, -10]}
            speed={0.2}
            color={"pink"}
            opacity={1}
          />
          <Cloud
            position={[-4, 5, 5]}
            speed={0.2}
            color={"pink"}
            opacity={0.5}
          />
          <Cloud
            position={[-1, 5, 0]}
            speed={0.2}
            color={"pink"}
            opacity={0.75}
          />
        </group>
        <Building scale={[0.005, 0.02, 0.005]} position={[-2, 0, 5]} />

        <Building
          scale={[0.005, 0.02, 0.005]}
          position={[-3.5, 0, -3]}
          rotation={[0, degToRad(80), 0]}
        />
        <Building
          scale={[0.005, 0.02, 0.005]}
          position={[-2, 0, 1]}
          rotation={[0, degToRad(80), 0]}
        />
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
        <Tile scale={0.05} position={[-3.2, 0.23, 5]} />
        <group>
          <RandomBoxes position={[-3, 0, 0]} />
        </group>
        <Sky />

        <Stats />
        <Effects />
        {/* <fog attach="fog" args={["pink", 4, 40]} far={5} /> */}
      </Canvas>
    </div>
  );
};

export default Scene;
