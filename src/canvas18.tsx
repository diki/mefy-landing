import React, { useEffect, useRef, useState } from "react";

const CanvasComponent = () => {
  const canvasRef = useRef(null);
  const [tree, setTree] = useState(); // Initialize tree state

  // Function to generate the tree structure
  const generateTree = (depth, x, y, horizontalGap, verticalGap) => {
    if (depth === 0) return null;

    // Create node with randomized existence of children
    const node = {
      value: Math.floor(Math.random() * 100),
      x,
      y,
      children: [],
    };

    // Determine whether to add left and right children
    if (Math.random() > 0.2 && depth > 1) {
      // 80% chance of left child
      node.children.push(
        generateTree(
          depth - 1,
          x + horizontalGap,
          y + verticalGap,
          horizontalGap,
          verticalGap
        )
      );
    }
    if (Math.random() > 0.2 && depth > 1) {
      // 80% chance of right child
      node.children.push(
        generateTree(
          depth - 1,
          x + horizontalGap,
          y - verticalGap,
          horizontalGap,
          verticalGap
        )
      );
    }

    return node;
  };

  // Function to recursively draw the tree from the state
  const drawTreeFromState = (context, node) => {
    if (!node) return;

    // Draw the node
    drawNode(context, node.x, node.y, node.value);

    // Draw connections and child nodes
    node.children.forEach((child) => {
      drawStraightLine(context, node.x, node.y, child.x, child.y);
      drawTreeFromState(context, child);
    });
  };

  // Function to draw a node
  const drawNode = (context, x, y, value) => {
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

  // Function to draw an L-shaped line
  const drawStraightLine = (context, x1, y1, x2, y2) => {
    context.beginPath();
    context.moveTo(x1, y1);
    context.lineTo(x2, y1); // Horizontal first
    context.lineTo(x2, y2); // Then vertical
    context.stroke();
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const rootX = 50; // X coordinate of the root node, starting from the left
    const rootY = canvas.height / 2; // Vertical middle of the canvas
    const horizontalGap = 150; // Fixed horizontal gap between nodes
    const verticalGap = 100; // Fixed vertical gap between levels

    // Generate tree on initial mount
    if (!tree) {
      const initialTree = generateTree(
        8,
        rootX,
        rootY,
        horizontalGap,
        verticalGap
      );
      console.log("eee", initialTree);
      setTree(initialTree);
    }

    // Clear the canvas before drawing
    context.clearRect(0, 0, canvas.width, canvas.height);

    // Draw the tree from the generated data
    if (tree) {
      drawTreeFromState(context, tree);
    }
  }, [tree]); // Depend on the tree state

  return <canvas ref={canvasRef} />;
};

export default CanvasComponent;
