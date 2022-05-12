import React, { useEffect, useRef } from "react";
import { useSphere } from "@react-three/cannon";
import { useFrame } from "@react-three/fiber";
import { Raycaster, Vector3 } from "three";
import useWASD from "../../hooks/useWASD";
import Character from "./Character";
import gsap from "gsap";
import useStore, { locations } from "../../store";
import { useNavigate } from "react-router";

const camSelector = (state) => state.camera;
const objSelector = (state) => state.objects;
const locSelector = (state) => state.location;

const Movement = () => {
  const { forward, reverse, left, right, sprint } = useWASD();
  const navigate = useNavigate();
  const cameraRef = useStore(camSelector);
  const objects = useStore(objSelector);
  const location = useStore(locSelector);

  const delay = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };
  const characterRef = useRef(null);
  const positionRef = useRef([0, 0, 0]);

  const raycaster = new Raycaster(new Vector3(), new Vector3(), 0, 20);
  let SPEED = 9.5;
  const frontVector = new Vector3(0, 0, 0);
  const sideVector = new Vector3(0, 0, 0);
  const direction = new Vector3(0, 0, 0);

  const [ref, api] = useSphere(() => ({
    mass: 1,
    position: [0, 0, 0],
    type: "Dynamic",
  }));

  /**
   * Get Position of the sphere in physics world at any point.
   */
  useEffect(() => {
    const unsubscribe = api.position.subscribe(
      (p) => (positionRef.current = p)
    );
    return unsubscribe;
  }, []);

  useEffect(() => {
    api.position.set(positionRef.current[0], positionRef.current[1], 0);
  }, [location]);

  useFrame(async () => {
    /**
     * Change the scene from entrance to shop.
     */
    if (
      location === locations.ENTRANCE &&
      characterRef.current.position.z < -120
    ) {
      navigate("/shop");
      gsap.to(document.getElementById("cover"), {
        backgroundColor: "rgba(0,255,255,0.3)",
      });
      await delay(500);
      gsap.to(document.getElementById("cover"), { backgroundColor: "white" });
    }

    /**
     * Increase Speed while sprinting
     */
    // if (sprint && (forward || reverse || left || right)) {
    //   SPEED = 19.5;
    // } else {
    //   SPEED = 9.5;
    // }

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

    raycaster.set(characterRef.current.position, direction);
    if (!raycaster.intersectObjects(objects, true).length > 0) {
      api.velocity.set(-direction.x, 0, -direction.z);
    }

    cameraRef.current.position.x = positionRef.current[0];
    cameraRef.current.position.z = positionRef.current[2] + 13;

    /**
     * Control Camera rotation based on movement direction
     */
    if (reverse) {
      gsap.to(cameraRef.current.rotation, { y: Math.PI, duration: 0.2 });
      cameraRef.current.position.z = positionRef.current[2] - 13;
    } else if (forward) {
      cameraRef.current.position.z = positionRef.current[2] + 13;
    } else if (right) {
      cameraRef.current.position.x = positionRef.current[0] - 13;
      cameraRef.current.position.z = positionRef.current[2];
      gsap.to(cameraRef.current.rotation, {
        y: -Math.PI / 2,
        duration: 0.2,
      });
    } else if (left) {
      cameraRef.current.position.x = positionRef.current[0] + 13;
      cameraRef.current.position.z = positionRef.current[2];
      gsap.to(cameraRef.current.rotation, {
        y: Math.PI / 2,
        duration: 0.2,
      });
    } else {
      gsap.to(cameraRef.current.rotation, { y: 0, duration: 0.2 });
    }

    /**
     * Get the character to follow the sphere in physics world.
     */
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
    <Character
      ref={characterRef}
      walk={forward || reverse || left || right}
      cameraRef={cameraRef}
    />
  );
};

export default Movement;
