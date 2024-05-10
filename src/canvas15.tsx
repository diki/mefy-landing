import React, { useEffect, useRef } from "react";

const CanvasComponent = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    // Set canvas size
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight * 0.8;

    // Sample binary tree data
    const treeDepth = 6; // Depth of the binary tree
    const rootX = 50; // X coordinate of the root node, starting from the left
    const verticalGap = canvas.height / (treeDepth * 2); // Vertical gap between levels to use space efficiently

    // Calculate horizontal gap based on the tree depth
    // It ensures that the last level of nodes spans the entire window width
    const maxNodesAtDepth = Math.pow(2, treeDepth - 1); // Maximum nodes at the deepest level
    const totalHorizontalSpaceAvailable = canvas.width - rootX; // Total horizontal space available
    const horizontalGap = totalHorizontalSpaceAvailable / maxNodesAtDepth; // Gap between nodes at the deepest level

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

    // Function to recursively draw the binary tree with horizontal expansion
    const drawTree = (depth, x, y, horizontalGap) => {
      if (depth === 0) return;

      // Draw current node
      drawNode(x, y, Math.floor(Math.random() * 100)); // Random value for each node

      // Calculate the horizontal gap for the current level
      const currentLevelGap = horizontalGap * Math.pow(2, treeDepth - depth); // Adjust gap based on current depth

      // Draw children if not at the last level
      if (depth > 1) {
        drawStraightLine(x, y, x + currentLevelGap / 2, y + verticalGap); // To right child
        drawTree(
          depth - 1,
          x + currentLevelGap / 2,
          y + verticalGap,
          horizontalGap
        );
        drawStraightLine(x, y, x + currentLevelGap / 2, y - verticalGap); // To left child
        drawTree(
          depth - 1,
          x + currentLevelGap / 2,
          y - verticalGap,
          horizontalGap
        );
      }
    };

    // Start drawing the tree from the root
    drawTree(treeDepth, rootX, canvas.height / 2, horizontalGap);

    // Clean up
    return () => {
      // Cleanup code (if necessary)
    };
  }, []);

  return <canvas ref={canvasRef} />;
};

export default CanvasComponent;
