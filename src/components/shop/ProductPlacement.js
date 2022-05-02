import { Html } from "@react-three/drei";
import React, { useState } from "react";
import Wave from "../common/Wave";
import Product from "./Product";
import "./bubble.css";

const locations = [
  [-80, 10.1, 75],
  [-80, 10.1, -75],
  [-50, 10.1, -75],
  [-50, 10.1, 75],
  [-20, 10.1, -75],
  [-20, 10.1, 75],
  [10, 10.1, -75],
  [10, 10.1, 75],
];

const ProductPlacement = ({ products }) => {
  const [product, setProduct] = useState(null);
  products.map((p, i) => (p.position = locations[i]));
  return (
    <>
      {products &&
        products.slice(0, 8).map((product, index) => {
          return (
            <Product product={product} key={index} setProduct={setProduct} />
          );
        })}
      {product &&
        product.position &&
        (console.log([product.position[2] + 7, 0.1, -product.position[0]]),
        (
          <>
            <Wave
              position={[
                product.position[2] < 0
                  ? product.position[2] + 7
                  : product.position[2] - 7,
                0.1,
                -product.position[0],
              ]}
              rotation={[
                0,
                product.position[2] < 0 ? Math.PI / 2 : -Math.PI / 2,
                0,
              ]}
              scale={1}
            />
            <Html
              position={[
                product.position[2] < 0
                  ? product.position[2] + 6
                  : product.position[2] - 6,
                12,
                -product.position[0] + 6,
              ]}
              rotation={[
                0,
                product.position[2] < 0 ? Math.PI / 2 : -Math.PI / 2,
                0,
              ]}
              transform
            >
              <div className="thought">
                <div>{product?.description}</div>
                <button>click me</button>
              </div>
            </Html>
          </>
        ))}
    </>
  );
};

export default ProductPlacement;
