import { useAnimations, useGLTF, useTexture } from "@react-three/drei";
import React, { useEffect, useLayoutEffect, useRef } from "react";
import { BufferAttribute } from "three";
import { RepeatWrapping } from "three";
import useStore, { locations } from "../../store";
import ProductPlacement from "./ProductPlacement";
import Room from "./Room";

const dispatchSelector = (state) => state.dispatch;
const productsSelector = (state) => state.products;

const Shop = () => {
  const robotRef = useRef();
  const geomRef = useRef();

  useLayoutEffect(() => {
    if (geomRef.current) {
      geomRef.current.setAttribute(
        "uv2",
        new BufferAttribute(geomRef.current.attributes.uv.array, 2)
      );
    }
  }, []);
  const robot = useGLTF("/robot/scene.gltf");
  const room = useGLTF("/room.glb");
  const { actions } = useAnimations(robot.animations, robotRef);
  const dispatch = useStore(dispatchSelector);
  const products = useStore(productsSelector);

  const textures = useTexture([
    "/floor/height.png",
    "/floor/baseColor.jpg",
    "/floor/normal.jpg",
    "/floor/roughness.jpg",
    "/floor/ambientOcclusion.jpg",
    "/floor/material.jpg",
  ]);
  textures[1].repeat.set(16, 16);
  textures[4].repeat.set(16, 16);
  textures[2].repeat.set(16, 16);
  textures[3].repeat.set(16, 16);
  textures[5].repeat.set(16, 16);

  textures[1].wrapS = RepeatWrapping;
  textures[4].wrapS = RepeatWrapping;
  textures[2].wrapS = RepeatWrapping;
  textures[3].wrapS = RepeatWrapping;
  textures[5].wrapS = RepeatWrapping;

  textures[1].wrapT = RepeatWrapping;
  textures[4].wrapT = RepeatWrapping;
  textures[2].wrapT = RepeatWrapping;
  textures[3].wrapT = RepeatWrapping;
  textures[5].wrapT = RepeatWrapping;

  useEffect(() => {
    dispatch({ type: "SETLOC", payload: locations.SHOP });
    dispatch({ type: "SETOBJ", payload: robotRef.current });
  }, []);

  useEffect(() => {
    actions["Take 01"].play();
  }, []);

  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <planeBufferGeometry args={[200, 200]} ref={geomRef} />
        <meshStandardMaterial
          color="white"
          map={textures[1]}
          aoMap={textures[4]}
          normalMap={textures[2]}
          roughnessMap={textures[3]}
          displacementMap={textures[0]}
        />
      </mesh>
      <ProductPlacement products={products} />
      <pointLight args={["white", 1.5]} position={[-70, 10, -42]} />
      <mesh scale={0.5} position={[-70, 0.2, -70]}>
        <primitive object={robot.scene} ref={robotRef} dispose={null} />
      </mesh>
      {/* <mesh scale={0.5} position={[-100, 0.1, 0]}>
        <primitive object={room.scene} dispose={null} />
      </mesh> */}
      <Room scale={0.5} position={[-100, 0.1, 0]} />
    </group>
  );
};

export default Shop;
