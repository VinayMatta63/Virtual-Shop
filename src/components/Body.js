import React, { forwardRef, useEffect, useRef } from "react";
import { useSphere } from "@react-three/cannon";
import { useFrame } from "@react-three/fiber";
import { Raycaster, Vector3 } from "three";
import useWASD from "../hooks/useWASD";
import Character from "./Character";

const Body = forwardRef(({ cameraRef, entranceRef }, positionRef) => {
  const { forward, reverse, left, right, sprint } = useWASD();
  const characterRef = useRef(null);
  const raycaster = new Raycaster(new Vector3(), new Vector3(), 0, 20);
  let SPEED = 10;
  const objects = [];
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
    !objects.includes(entranceRef.current) && objects.push(entranceRef.current);

    /**
     * Increase Speed while sprinting
     */
    if (sprint && (forward || reverse || left || right)) {
      SPEED = 20;
    } else {
      SPEED = 10;
    }

    /**
     * Deciding which direction to move the character
     */
    frontVector.set(0, 0, Number(forward) - Number(reverse));
    sideVector.set(Number(right) - Number(left), 0, 0);
    direction
      .subVectors(frontVector, sideVector)
      .normalize()
      .multiplyScalar(SPEED);

    /**
     * Restrict character movement based on intersections with walls
     */
    raycaster.ray.origin.copy(characterRef.current.position);
    raycaster.ray.direction.copy(direction);
    if (!raycaster.intersectObjects(objects).length > 0) {
      api.velocity.set(-direction.x, 0, -direction.z);
    }

    cameraRef.current.position.x = positionRef.current[0];
    cameraRef.current.position.z = positionRef.current[2] + 13;

    /**
     * Control Camera rotation based on movement direction
     */
    if (reverse) {
      cameraRef.current.position.z = positionRef.current[2] - 13;
      cameraRef.current.rotation.y = Math.PI;
    } else if (forward) {
      cameraRef.current.position.z = positionRef.current[2] + 13;
    } else if (right) {
      cameraRef.current.position.x = positionRef.current[0] - 13;
      cameraRef.current.position.z = positionRef.current[2];
      cameraRef.current.rotation.y = (3 * Math.PI) / 2;
    } else if (left) {
      cameraRef.current.position.x = positionRef.current[0] + 13;
      cameraRef.current.position.z = positionRef.current[2];
      cameraRef.current.rotation.y = -(3 * Math.PI) / 2;
    } else {
      cameraRef.current.rotation.y = 0;
    }

    characterRef.current.position.x = positionRef.current[0];
    characterRef.current.position.z = positionRef.current[2];

    /**
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
      <Character
        ref={characterRef}
        walk={forward || reverse || left || right}
        cameraRef={cameraRef}
      />
    </group>
  );
});

export default Body;
