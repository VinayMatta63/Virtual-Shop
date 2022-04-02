import { useEffect, useState } from "react";
import nipplejs from "nipplejs";

const useWASD = () => {
  const keys = {
    w: "forward",
    a: "left",
    s: "reverse",
    d: "right",
    " ": "jump",
    Shift: "sprint",
  };

  const [movement, setMovement] = useState({
    forward: false,
    reverse: false,
    left: false,
    right: false,
    jump: false,
    sprint: false,
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
  const element = document.getElementById("joystick-zone");

  if (element !== null) {
    const manager = nipplejs.create({
      mode: "static",
      color: "cyan",
      shape: "circle",
      zone: document.getElementById("joystick-zone"),
      position: { left: "10%", bottom: "10%" },
    });

    manager.on("move", (event, data) => {
      setMovement((m) => ({
        ...m,
        forward: data.vector.y > 0.5,
        reverse: data.vector.y < -0.5,
        left: data.vector.x < -0.5,
        right: data.vector.x > 0.5,
      }));
    });

    manager.on("end", (event, data) => {
      setMovement({
        forward: false,
        reverse: false,
        left: false,
        right: false,
        jump: false,
        sprint: false,
      });
    });
  }

  return movement;
};

export default useWASD;
