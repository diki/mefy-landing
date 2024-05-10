import React, { useEffect, useRef } from "react";

const CanvasComponent = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    // Set canvas size
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Sample binary tree data
    const treeDepth = 8; // Depth of the binary tree
    const rootX = 50; // X coordinate of the root node, starting from the left
    const horizontalGap = 150; // Fixed horizontal gap between nodes
    const verticalGap = 100; // Fixed vertical gap between levels

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

    // Function to draw an L-shaped line between two points
    const drawStraightLine = (x1, y1, x2, y2) => {
      context.beginPath();
      context.moveTo(x1, y1);
      context.lineTo(x2, y1); // Horizontal part of the L-shape
      context.lineTo(x2, y2); // Vertical part of the L-shape
      context.strokeStyle = "black";
      context.lineWidth = 2;
      context.stroke();
    };

    // Function to recursively draw the binary tree with uniform connection lengths
    const drawTree = (depth, x, y) => {
      if (depth === 0) return;

      // Draw current node
      drawNode(x, y, Math.floor(Math.random() * 100)); // Random value for each node

      // Calculate new positions for children
      const childX = x + horizontalGap; // Horizontal position for children
      const childYRight = y + verticalGap; // Vertical position for right child
      const childYLeft = y - verticalGap; // Vertical position for left child

      // Draw children if not at the last level
      if (depth > 1) {
        drawStraightLine(x, y, childX, childYRight);
        drawTree(depth - 1, childX, childYRight);
        drawStraightLine(x, y, childX, childYLeft);
        drawTree(depth - 1, childX, childYLeft);
      }
    };

    // Start drawing the tree from the root
    drawTree(treeDepth, rootX, canvas.height / 2);

    // Clean up
    return () => {
      // Cleanup code (if necessary)
    };
  }, []);

  return <canvas ref={canvasRef} />;
};

export default CanvasComponent;
