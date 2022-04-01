import React, { forwardRef, useEffect } from "react";
import { useSphere } from "@react-three/cannon";
import { useFrame } from "@react-three/fiber";
import { Vector3 } from "three";
import useWASD from "../hooks/useWASD";

const Character = forwardRef(({ cameraRef }, positionRef) => {
  const { forward, reverse, left, right } = useWASD();
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
    // if (jump) {
    //   api.velocity.set(-direction.x, (SPEED * 9.82) / 2, -direction.z);
    // }
    cameraRef.current.position.x = positionRef.current[0];
    cameraRef.current.position.y = positionRef.current[1] + 2;
    cameraRef.current.position.z = positionRef.current[2] + 10;
  });

  return (
    <mesh castShadow ref={ref} position={[0, 0, 0]}>
      <sphereBufferGeometry attach="geometry" args={[1, 50, 50]} />
      <meshBasicMaterial attach="material" color="hotpink" />
    </mesh>
  );
});

export default Character;
