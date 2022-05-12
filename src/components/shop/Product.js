import { useFrame, useLoader } from "@react-three/fiber";
import React, { useRef } from "react";
import { TextureLoader } from "three";
import { DoubleSide } from "three";
import { vertexShader, fragmentShader } from "../../utils/shaders";
import { Color } from "three";
import { ShaderMaterial } from "three";
import { Shape } from "three";
import { Html } from "@react-three/drei";
import "./bubble.css";
import "./info.css";

const Product = ({ product, setProduct }) => {
  const prodRef = useRef();
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
    <group ref={prodRef} rotation={[0, 0, 0]}>
      <mesh position={product.position} material={holoMaterial}>
        <planeBufferGeometry args={[14, 16]} />
      </mesh>
      <mesh
        position={[
          product.position[0],
          product.position[1],
          product.position[2] + 0.1,
        ]}
      >
        <planeBufferGeometry args={[12, 14]} />
        <meshPhongMaterial
          map={texture}
          side={DoubleSide}
          opacity={0.85}
          transparent={true}
        />
      </mesh>
      <mesh
        position={[
          product.position[0],
          product.position[1],
          product.position[2] - 0.1,
        ]}
      >
        <planeBufferGeometry args={[12, 14]} />
        <meshPhongMaterial
          map={texture}
          side={DoubleSide}
          opacity={0.85}
          transparent={true}
        />
      </mesh>
      <mesh
        position={[
          product.position[0] - 8,
          product.position[1] - 10,
          product.position[2] - 0.5,
        ]}
      >
        <extrudeBufferGeometry args={[shape, extrudeSettings]} />
        <meshLambertMaterial opacity={0.85} transparent={true} />
      </mesh>
      <Html
        position={[
          product.position[0] + 10,
          product.position[1],
          product.position[2] - 0.5,
        ]}
        transform
      >
        <div className="info">
          <button onClick={() => setProduct(product)}>Know More</button>
        </div>
      </Html>
    </group>
  );
};

export default Product;
