import { useAnimations, useGLTF } from "@react-three/drei";
import React, { useEffect, useLayoutEffect, useRef } from "react";
import { BufferAttribute } from "three";
import useStore, { locations } from "../../store";
import ProductPlacement from "./ProductPlacement";

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
  const { actions } = useAnimations(robot.animations, robotRef);
  const dispatch = useStore(dispatchSelector);
  const products = useStore(productsSelector);

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
        <meshPhongMaterial color="#50d4c7" />
      </mesh>
      <ProductPlacement products={products} />
      <pointLight args={["white", 1.5]} position={[-0, 20, 30]} />
      <mesh scale={0.5} position={[0, 0.6, -50]} rotation={[0, Math.PI / 6, 0]}>
        <primitive object={robot.scene} ref={robotRef} dispose={null} />
      </mesh>
    </group>
  );
};

export default Shop;
