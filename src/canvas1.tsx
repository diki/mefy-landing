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
    const treeDepth = 5; // Depth of the binary tree
    const rootY = canvas.height / 2; // Y coordinate of the root node
    const horizontalGap = 100; // Horizontal gap between nodes
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

    // Function to draw a horizontal line between two points
    const drawHorizontalLine = (x1, y1, x2) => {
      context.beginPath();
      context.moveTo(x1, y1);
      context.lineTo(x2, y1);
      context.strokeStyle = "black";
      context.lineWidth = 2;
      context.stroke();
    };

    // Function to draw a vertical line between two points
    const drawVerticalLine = (x, y1, y2) => {
      context.beginPath();
      context.moveTo(x, y1);
      context.lineTo(x, y2);
      context.strokeStyle = "black";
      context.lineWidth = 2;
      context.stroke();
    };

    // Function to recursively draw the binary tree
    const drawTree = (depth, x, y) => {
      if (depth === 0) return;

      // Draw current node
      drawNode(x, y, Math.floor(Math.random() * 100)); // Random value for each node

      // Calculate the x-coordinate for the next level
      const nextX = x + horizontalGap;

      // Calculate the y-coordinate for the children
      const deltaY = verticalGap * Math.pow(2, 5 - depth);
      const leftChildY = y + deltaY;
      const rightChildY = y - deltaY;

      // Draw horizontal line to left child
      drawHorizontalLine(x, y, nextX);

      // Draw vertical line to left child
      drawVerticalLine(nextX, y, leftChildY);

      // Draw left child
      drawTree(depth - 1, nextX, leftChildY);

      // Draw horizontal line to right child
      drawHorizontalLine(x, y, nextX);

      // Draw vertical line to right child
      drawVerticalLine(nextX, y, rightChildY);

      // Draw right child
      drawTree(depth - 1, nextX, rightChildY);
    };

    // Start drawing the tree from the root
    drawTree(treeDepth, 50, rootY);

    // Clean up
    return () => {
      // Cleanup code (if necessary)
    };
  }, []);

  return <canvas ref={canvasRef} />;
};

export default CanvasComponent;
