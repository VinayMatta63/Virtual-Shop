import { useEffect, useState } from "react";

const useWASD = () => {
  const keys = {
    w: "forward",
    a: "left",
    s: "reverse",
    d: "right",
    " ": "jump",
  };

  const [movement, setMovement] = useState({
    forward: false,
    reverse: false,
    left: false,
    right: false,
    jump: false,
  });

  useEffect(() => {
    const moveFieldByKey = (key) => keys[key];

    const onKeyDown = (event) => {
      setMovement((m) => ({ ...m, [moveFieldByKey(event.key)]: true }));
    };
    const onKeyUp = (event) => {
      setMovement((m) => ({ ...m, [moveFieldByKey(event.key)]: false }));
    };

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("keyup", onKeyUp);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("keyup", onKeyUp);
    };
  }, []);

  return movement;
};

export default useWASD;
