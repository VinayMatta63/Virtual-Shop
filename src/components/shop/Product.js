import { useFrame, useLoader } from "@react-three/fiber";
import React from "react";
import { TextureLoader } from "three";
import { DoubleSide } from "three";
import { vertexShader, fragmentShader } from "../../utils/shaders";
import { Color } from "three";
import { ShaderMaterial } from "three";
import { Shape } from "three";
import Shopkeeper from "../common/Shopkeeper";
import Wave from "../common/Wave";

const styles = {
  color: "#fff",
  backgroundColor: "rgba(0,0,0,0.8)",
  fontSize: "30px",
  padding: "100px 200px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column",
};

const Product = ({ product, position }) => {
  const length = 16,
    width = 2;

  const shape = new Shape();
  shape.moveTo(0, 0);
  shape.lineTo(0, width);
  shape.lineTo(length, width);
  shape.lineTo(length, 0);
  shape.lineTo(0, 0);

  const extrudeSettings = {
    steps: 1,
    depth: 1,
    bevelEnabled: true,
    bevelThickness: 1,
    bevelSize: 1,
    bevelOffset: -1,
    bevelSegments: 1,
  };

  const texture = useLoader(TextureLoader, "tshirt.png");
  const holoMaterial = new ShaderMaterial({
    uniforms: {
      uTime: { value: 0 },
      uColorStart: { value: new Color("#ffffff") },
      uColorEnd: { value: new Color("#81e4e6") },
    },
    vertexShader: vertexShader,
    fragmentShader: fragmentShader,
    side: DoubleSide,
    transparent: true,
    opacity: 0.5,
  });

  useFrame(({ clock }) => {
    const elapsedTime = clock.getElapsedTime();
    holoMaterial.uniforms.uTime.value = elapsedTime;
  });

  return (
    <group>
      <mesh position={position} material={holoMaterial}>
        <planeBufferGeometry args={[14, 16]} />
      </mesh>
      <mesh position={[position[0], position[1], position[2] + 0.1]}>
        <planeBufferGeometry args={[12, 14]} />
        <meshPhongMaterial
          map={texture}
          side={DoubleSide}
          opacity={0.85}
          transparent={true}
        />
      </mesh>
      <mesh position={[position[0], position[1], position[2] - 0.1]}>
        <planeBufferGeometry args={[12, 14]} />
        <meshPhongMaterial
          map={texture}
          side={DoubleSide}
          opacity={0.85}
          transparent={true}
        />
      </mesh>
      <mesh position={[position[0] - 8, position[1] - 10, position[2] - 0.5]}>
        <extrudeBufferGeometry args={[shape, extrudeSettings]} />
        <meshLambertMaterial opacity={0.85} transparent={true} />
      </mesh>
      <Wave position={position} scale={1} />
    </group>
  );
};

export default Product;
