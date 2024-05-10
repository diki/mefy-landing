import React, { useRef, useEffect } from "react";

function LineArt() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const width = canvas.width;
    const height = canvas.height;

    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, width, height);
    ctx.strokeStyle = "white";
    ctx.lineWidth = 2;

    // Function to draw L-shaped lines
    function drawLines() {
      const centerX = width / 2;
      const centerY = height / 2;
      const lines = 100;

      for (let i = 0; i < lines; i++) {
        const joints = Math.floor(Math.random() * 6) + 2; // Random number of joints between 2 and 7
        let x = centerX;
        let y = centerY;
        let direction = Math.random() * Math.PI * 2; // Initial direction

        ctx.beginPath();
        ctx.moveTo(x, y);

        for (let j = 0; j < joints; j++) {
          const length = Math.random() * 50 + 10; // Random length for each segment
          x += length * Math.cos(direction);
          y += length * Math.sin(direction);
          ctx.lineTo(x, y);

          // Change direction by 90 degrees (either left or right)
          if (Math.random() > 0.5) {
            direction += Math.PI / 2;
          } else {
            direction -= Math.PI / 2;
          }
        }

        ctx.stroke();
      }
    }

    drawLines();
  }, []);

  return (
    <canvas
      ref={canvasRef}
      width={800}
      height={800}
      style={{ backgroundColor: "black" }}
    />
  );
}

export default LineArt;
