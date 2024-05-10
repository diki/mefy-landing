import React, { useEffect, useRef } from "react";

const CanvasComponent = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    // Set canvas size
    canvas.width = window.innerWidth * 0.8;
    canvas.height = window.innerHeight;

    // Sample tree data
    const rootNode = {
      value: Math.floor(Math.random() * 100),
      children: [],
    };

    // Function to generate random tree
    const generateRandomTree = (node, depth, maxDepth) => {
      if (depth >= maxDepth) return;

      const numChildren = Math.floor(Math.random() * 2) + 2; // 2 or 3 children
      for (let i = 0; i < numChildren; i++) {
        const childNode = {
          value: Math.floor(Math.random() * 100),
          children: [],
        };
        node.children.push(childNode);
        generateRandomTree(childNode, depth + 1, maxDepth);
      }
    };

    // Generate random tree
    generateRandomTree(rootNode, 0, 5);

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

    // Function to recursively draw the tree
    const drawTree = (node, x, y, width, level) => {
      if (!node) return;

      // Draw current node
      drawNode(x, y, node.value);

      // Calculate horizontal gap between children
      const horizontalGap = width / (node.children.length + 1);

      // Calculate x-coordinate for children
      let childX = x - width / 2 + horizontalGap;

      // Draw connections to children
      for (const child of node.children) {
        drawLine(x, y, childX, y + 80); // Vertical connection
        drawTree(child, childX, y + 80, width * 0.8, level + 1);
        childX += horizontalGap;
      }
    };

    // Start drawing the tree from the root
    drawTree(rootNode, canvas.width / 2, 100, canvas.width * 0.8, 0);

    // Clean up
    return () => {
      // Cleanup code (if necessary)
    };
  }, []);

  return <canvas ref={canvasRef} />;
};

export default CanvasComponent;
