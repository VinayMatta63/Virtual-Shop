import React, { forwardRef, useEffect, useRef } from "react";
import { useSphere } from "@react-three/cannon";
import { useFrame } from "@react-three/fiber";
import { Vector3 } from "three";
import useWASD from "../hooks/useWASD";
import Character from "./Character";

const Body = forwardRef(({ cameraRef }, positionRef) => {
  const { forward, reverse, left, right } = useWASD();
  const characterRef = useRef(null);
  const SPEED = 10;
  const frontVector = new Vector3(0, 0, 0);
  const sideVector = new Vector3(0, 0, 0);
  const direction = new Vector3(0, 0, 0);
  const [ref, api] = useSphere(() => ({
    mass: 1,
    position: [0, 0, 0],
    type: "Dynamic",
  }));

  useEffect(() => {
    const unsubscribe = api.position.subscribe(
      (p) => (positionRef.current = p)
    );
    return unsubscribe;
  }, []);

  useFrame(() => {
    frontVector.set(0, 0, Number(forward) - Number(reverse));
    sideVector.set(Number(right) - Number(left), 0, 0);
    direction
      .subVectors(frontVector, sideVector)
      .normalize()
      .multiplyScalar(SPEED);

    api.velocity.set(-direction.x, 0, -direction.z);
    cameraRef.current.position.x = positionRef.current[0];
    cameraRef.current.position.z = positionRef.current[2] + 15;
    characterRef.current.position.x = positionRef.current[0];
    characterRef.current.position.z = positionRef.current[2] + 5;

    /*
     * Setting Character rotation while walking.
     */
    if (forward || reverse || left || right) {
      characterRef.current.rotation.y = -direction.x / 2;
    }
    if (reverse) {
      characterRef.current.rotation.y += Math.PI;
    }
    if ((reverse && left) || (reverse && right)) {
      characterRef.current.rotation.y -= Math.PI;
    }
    if (forward && left) {
      characterRef.current.rotation.y -= (Math.PI / 4) * 3;
    }
    if (forward && right) {
      characterRef.current.rotation.y += (Math.PI / 4) * 3;
    }
  });

  return (
    <group>
      <mesh ref={ref} castShadow position={[0, 0, 0]}>
        <sphereBufferGeometry attach="geometry" args={[1, 50, 50]} />
        <meshBasicMaterial attach="material" color="hotpink" />
      </mesh>
      <Character
        ref={characterRef}
        walk={forward || reverse || left || right}
        cameraRef={cameraRef}
      />
    </group>
  );
});

export default Body;
