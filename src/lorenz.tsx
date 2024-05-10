import React, { useEffect, useRef } from "react";

const LorenzAttractor = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    const c = 28;
    const h = 0.015;
    const t = -6;
    let x0 = 0;
    let y0 = 1;
    let z0 = 10;
    let x1, y1, z1;
    const cx = 250;
    const cy = 330;
    const scale = 15;
    const n = 10000;
    let i = 0;

    const interval = setInterval(() => {
      if (i < n) {
        for (let k = 0; k < 20; k++) {
          x1 = x0 + h * t * (x0 - y0);
          y1 = y0 + h * (-x0 * z0 + c * x0 - y0);
          z1 = z0 + h * (x0 * y0 - z0);

          context.strokeStyle = `hsl(${Math.abs(x1) * 10}, ${
            Math.abs(y1) * 10
          }%, ${Math.abs(z1) * 2}%)`;
          context.beginPath();
          context.moveTo(cx + x0 * scale, cy + y0 * scale);
          context.lineTo(cx + x1 * scale, cy + y1 * scale);
          context.stroke();

          x0 = x1;
          y0 = y1;
          z0 = z1;
          i++;
        }
      } else {
        clearInterval(interval);
      }
    }, 1);

    return () => clearInterval(interval);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      width="500"
      height="660"
      style={{ background: "#000" }}
    />
  );
};

export default LorenzAttractor;
