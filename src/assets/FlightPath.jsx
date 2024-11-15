import React, { useEffect, useMemo, useRef, useState } from "react";
import { Box, Line, Sphere, Stage } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import Aeroplane from "./Aeroplane";
import * as THREE from "three";
import { degToRad } from "three/src/math/MathUtils.js";
import Effects from "../Effects";
import { CuboidCollider, MeshCollider, RigidBody } from "@react-three/rapier";
import RadarPulseDisc from "./Pulse";
import gsap from "gsap";
const LINE_NB_POINTS = 500;

const FlightPath = ({ position, setdestiniation, setAnimsts, animsts }) => {
  // Define Delhi and Bengaluru positions
  const planeref = useRef();

  const delhi = new THREE.Vector3(-4, 0, -6);
  const bengaluru = new THREE.Vector3(-3, 0, 5);
  const [flight, setflight] = useState(true);

  // Create a custom path using CatmullRomCurve3
  const curve = useMemo(() => {
    return new THREE.CatmullRomCurve3(
      [
        delhi,
        new THREE.Vector3(0, 0, -6),
        new THREE.Vector3(0, 2, 0),
        new THREE.Vector3(3, 3, 2),
        new THREE.Vector3(2, 0.5, 7),
        bengaluru,
        new THREE.Vector3(-8, 2, 5),
        new THREE.Vector3(-9, 3, 3),
        new THREE.Vector3(-8, 2, 0),
      ],
      true,
      "catmullrom",
      0.5
    );
  }, []);

  // Generate line points from the curve
  const linePoints = useMemo(() => curve.getPoints(LINE_NB_POINTS), [curve]);

  // Refs and state for airplane and camera animations
  const airplaneRef = useRef();
  const { camera } = useThree(); // Access the camera from the Three.js context
  const [t, setT] = useState(0);
  const [isFlying, setIsFlying] = useState(false); // Track if the airplane is flying

  let [cameraOffset, setCameraOffset] = useState(new THREE.Vector3(-1, 3, 0.5));
  let [cameraOffset2, setCameraOffset2] = useState(new THREE.Vector3(0, 23, 9));

  function animateCameraOffset(cameraOffset2) {
    // Create an object to store the values being animated
    const offset = { x: cameraOffset.x, y: cameraOffset.y, z: cameraOffset.z };

    // Animate the x, y, and z values with GSAP
    gsap.to(offset, {
      x: cameraOffset2.x, // Target x value
      y: cameraOffset2.y, // Target y value
      z: cameraOffset2.z, // Target z value
      duration: 2,
      ease: "power2.inOut",
      yoyo: true,
      repeat: false,
      onUpdate: () => {
        // Use the updated values to set cameraOffset via setCameraOffset
        setCameraOffset(new THREE.Vector3(offset.x, offset.y, offset.z));
      },
      onComplete: () => {
        setflight(animsts);
      },
    });
  }
  useEffect(() => {
    // Determine the target offset based on `animsts`
    const targetOffset = animsts
      ? new THREE.Vector3(-1, 3, 0.5)
      : cameraOffset2;

    // Set the initial camera offset and then animate to the target
    setCameraOffset(targetOffset);
    animateCameraOffset(targetOffset);

    console.log(targetOffset);
    console.log(animsts ? "zoomin" : "zoomout");
  }, [animsts]);

  useFrame((state, delta) => {
    console.log(animsts);

    if (!flight) {
      setT((t) => (t >= 1 ? 0 : t + delta * 0.0));
    }

    if (flight) {
      setT((t) => (t >= 1 ? 0 : t + delta * 0.1));
    }

    // Target position and tangent on the path
    const targetPosition = curve.getPointAt(t);
    const tangent = curve.getTangentAt(t);

    if (airplaneRef.current) {
      airplaneRef.current.position.lerp(targetPosition, 0.05); // Adjust 0.1 for smoother interpolation

      // Calculate the target rotation to make the airplane face the tangent direction
      const lookAtTarget = new THREE.Vector3()
        .copy(targetPosition)
        .add(tangent);
      airplaneRef.current.lookAt(lookAtTarget);

      // Smoothly interpolate rotation by lerping quaternion
      const targetQuaternion = airplaneRef.current.quaternion.clone();
      airplaneRef.current.quaternion.slerp(targetQuaternion, 0.001); // Adjust 0.1 for smoother interpolation

      // Add banking effect by adjusting rotation.z (optional)
      const bankAmount = -Math.atan2(tangent.y, tangent.x) * 0.0; // Adjust factor for desired banking
      airplaneRef.current.rotation.x = THREE.MathUtils.lerp(
        airplaneRef.current.rotation.x,
        bankAmount,
        0.01
      );

      // Animate the camera to follow the airplane with an offset
      const cameraTargetPosition = targetPosition.clone().add(cameraOffset);

      // Smoothly move the camera to follow the airplane
      camera.position.lerp(cameraTargetPosition, 0.9);

      // Make the camera look at the airplane's current position
      if (cameraOffset.y < 20) {
        camera.lookAt(airplaneRef.current.position);
      }
      if (cameraOffset.y > 20) {
        camera.lookAt(new THREE.Vector3(-1, 10, 7));
        
      }

    
    }
  });

  // Start the animation by setting the t value and enabling the animation loop
  React.useEffect(() => {
    setIsFlying(true); // Start the flight when the component is mounted
  }, []);

  const box1Ref = useRef();
  const box2Ref = useRef();

  useFrame(() => {
    if (box1Ref.current && planeref.current) {
      // Create bounding boxes for both objects
      const box1Collider = new THREE.Box3().setFromObject(box1Ref.current);
      const box2Collider = new THREE.Box3().setFromObject(box2Ref.current);
      const planeCollider = new THREE.Box3().setFromObject(planeref.current);

      // Check for intersection
      if (box1Collider.intersectsBox(planeCollider)) {
        setdestiniation("banguluru");

        setflight(false);
        setAnimsts(false);
      }
      if (box2Collider.intersectsBox(planeCollider)) {
        setdestiniation("delhi");

        setAnimsts(false);
        setflight(false);
      }
    }
  });

  return (
    <group scale={1} position={position}>
      {/* Render the path line */}
      <Line points={linePoints} color="white" opacity={1} lineWidth={10} />
      <RadarPulseDisc position={[-4, -0.6, -6]} scale={[3, 3, 3]} />
      <RadarPulseDisc position={[-3, -0.5, 5]} color="blue" scale={[3, 3, 3]} />

      {/* Render the airplane with ref for animation */}
      <Box
        ref={box1Ref}
        scale={[0.001, 1, 1]}
        position={[-5.5, 1, -4]}
        rotation={[degToRad(0), degToRad(90), degToRad(0)]}
      >
        <meshBasicMaterial color={"red"} />
      </Box>

      <Box ref={box2Ref} scale={[0.001, 1, 1]} position={[-2, 0, 5.5]}>
        <meshBasicMaterial color={"blue"} />
      </Box>

      <group ref={airplaneRef}>
        <Sphere
          scale={[0.15, 0.1, 0.01]}
          rotation={[degToRad(-40), degToRad(20), degToRad(10)]}
          ref={planeref}
        >
          <meshStandardMaterial color={"blue"} transparent opacity={1} />
        </Sphere>
        <Stage
          environment={"sunset"}
          intensity={0.3}
          shadows={false}
          preset={"upfront"}
        >
          <Aeroplane
            scale={0.01}
            rotation={[degToRad(-40), degToRad(30), degToRad(-10)]}
          />
        </Stage>

        {/* <Effects /> */}
      </group>
    </group>
  );
};

export default FlightPath;
