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
    const horizontalGap = canvas.width / Math.pow(2, treeDepth + 1); // Horizontal gap between nodes

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

    // Function to recursively draw the binary tree
    const drawTree = (depth, x, y) => {
      if (depth === 0) return;

      // Draw current node
      drawNode(x, y, Math.floor(Math.random() * 100)); // Random value for each node

      // Calculate next node's coordinates
      const nextXLeft = x - horizontalGap;
      const nextXRight = x + horizontalGap;
      const nextY = y + verticalGap;

      // Draw connections with straight lines
      context.beginPath();
      context.moveTo(x, y);
      context.lineTo(nextXLeft, nextY); // Left child
      context.moveTo(x, y);
      context.lineTo(nextXRight, nextY); // Right child
      context.strokeStyle = "black";
      context.lineWidth = 2;
      context.stroke();

      // Draw left child if not at the last level
      if (depth > 1) {
        drawTree(depth - 1, nextXLeft, nextY);
      }

      // Draw right child if not at the last level
      if (depth > 1) {
        drawTree(depth - 1, nextXRight, nextY);
      }
    };

    // Start drawing the tree from the root
    drawTree(treeDepth, canvas.width / 2, rootY);

    // Clean up
    return () => {
      // Cleanup code (if necessary)
    };
  }, []);

  return <canvas ref={canvasRef} />;
};

export default CanvasComponent;
