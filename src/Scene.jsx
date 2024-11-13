import { Box, Cloud, OrbitControls, Sky, Stats } from "@react-three/drei";
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

const LINE_NB_POINTS = 500;
const Scene = () => {
  const [flight, setflight] = useState(true);
  const [destiniation, setdestiniation] = useState("delhi");

  const texture = useLoader(TextureLoader, "./earth.jpg");
  const nightTexture = useLoader(TextureLoader, "./earthHeight.png");
  const ind = useLoader(TextureLoader, "./ind.webp");

  useEffect(() => {
    console.log(flight);
  }, [flight]);

  return (
    <div className="w-full h-screen">
      <button
        onClick={() => setflight(true)}
        className="absolute w-[150px] h-16 rounded hover:bg-yellow-800 duration-300 bg-red-800 top-[15%] left-[47%] z-20"
      >
        <h2 className="text-white capitalize font-bold text-xl">
          lets, Fly to
          <br />
          {destiniation}
        </h2>
      </button>
      <Canvas camera={{ fov: 75 }}>
        <OrbitControls />
        <ambientLight intensity={1.5} />
        {/* <group position={[0,3,0]}>

          
        <Line points={linePoints} color={"red"} opacity={1} lineWidth={10} />
        </group> */}

        <FlightPath
          setdestiniation={setdestiniation}
          flight={flight}
          setflight={setflight}
          position={[0, 1, 0]}
        />

        <Base scale={100} />
        {/* <group position={[0, -1, 0]}>
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
        </group> */}
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
        <Sky distance={80} rayleigh={23} sunPosition={[2, 1, 2]} />
        <Stats />
        {/* <fog attach="fog" args={["white", 4, 40]} far={5} /> */}
      </Canvas>
    </div>
  );
};

export default Scene;
