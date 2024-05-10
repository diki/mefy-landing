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
    const treeDepth = 7; // Depth of the binary tree
    const rootY = canvas.height / 2; // Y coordinate of the root node
    const verticalGap = 80; // Vertical gap between levels
    const horizontalGap = 100; // Horizontal gap between nodes

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
    const drawTree = (depth, x, y, level) => {
      if (depth === 0) return;

      // Draw current node
      drawNode(x, y, Math.floor(Math.random() * 100)); // Random value for each node

      // Draw left child if not at the last level
      if (depth > 1) {
        drawLine(x, y, x + horizontalGap, y + verticalGap);
        drawTree(depth - 1, x + horizontalGap, y + verticalGap, level + 1);
      }

      // Draw right child if not at the last level
      if (depth > 1) {
        drawLine(x, y, x + horizontalGap, y - verticalGap);
        drawTree(depth - 1, x + horizontalGap, y - verticalGap, level + 1);
      }
    };

    // Start drawing the tree from the root
    drawTree(treeDepth, 50, rootY, 1);

    // Clean up
    return () => {
      // Cleanup code (if necessary)
    };
  }, []);

  return <canvas ref={canvasRef} />;
};

export default CanvasComponent;
