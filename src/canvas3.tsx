import React, { useEffect, useRef } from "react";

const CanvasComponent = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    // Set canvas size
    canvas.width = window.innerWidth * 0.8;
    canvas.height = window.innerHeight;

    // Sample binary tree data
    const treeDepth = 6; // Depth of the binary tree
    const rootY = canvas.height / 2; // Y coordinate of the root node
    const verticalGap = 80; // Vertical gap between levels

    // Function to draw a node
    const drawNode = (x, y, value) => {
      const radius = 20;
      context.beginPath();
      context.arc(x, y, radius, 0, 2 * Math.PI);
      context.fillStyle = "lightblue";
      context.fill();
      context.lineWidth = 2;
      context.strokeStyle = "black";
      context.stroke();
      context.fillStyle = "black";
      context.textAlign = "center";
      context.textBaseline = "middle";
      context.fillText(value.toString(), x, y);
    };

    // Function to draw a line between two points
    const drawLine = (x1, y1, x2, y2) => {
      context.beginPath();
      context.moveTo(x1, y1);
      context.lineTo(x2, y2);
      context.strokeStyle = "black";
      context.lineWidth = 2;
      context.stroke();
    };

    // Function to recursively draw the binary tree
    const drawTree = (depth, x, y, horizontalGap) => {
      if (depth === 0) return;

      // Draw current node
      drawNode(x, y, Math.floor(Math.random() * 100)); // Random value for each node

      // Calculate the horizontal gap for the current level
      const currentGap = canvas.width / Math.pow(2, treeDepth - depth + 1);

      // Draw left child if not at the last level
      if (depth > 1) {
        drawLine(x, y, x + currentGap, y + verticalGap);
        drawTree(depth - 1, x + currentGap, y + verticalGap, currentGap);
      }

      // Draw right child if not at the last level
      if (depth > 1) {
        drawLine(x, y, x + currentGap, y - verticalGap);
        drawTree(depth - 1, x + currentGap, y - verticalGap, currentGap);
      }
    };

    // Start drawing the tree from the root
    drawTree(treeDepth, 0, rootY, canvas.width / 2);

    // Clean up
    return () => {
      // Cleanup code (if necessary)
    };
  }, []);

  return <canvas ref={canvasRef} />;
};

export default CanvasComponent;
