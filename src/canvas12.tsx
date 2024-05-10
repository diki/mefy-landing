import React, { useEffect, useRef } from "react";

const ElectricCircuit = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    // Set canvas size
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Define node properties
    const nodeRadius = 20;
    const verticalGap = 80;
    const horizontalGap = 100;

    // Define function to draw a node
    function drawNode(x, y, value) {
      context.beginPath();
      context.arc(x, y, nodeRadius, 0, 2 * Math.PI);
      context.fillStyle = "lightblue";
      context.fill();
      context.lineWidth = 2;
      context.strokeStyle = "black";
      context.stroke();
      context.fillStyle = "black";
      context.textAlign = "center";
      context.textBaseline = "middle";
      context.fillText(value.toString(), x, y);
    }

    // Define function to draw a line between two points
    function drawLine(x1, y1, x2, y2) {
      context.beginPath();
      context.moveTo(x1, y1);
      context.lineTo(x2, y2);
      context.strokeStyle = "black";
      context.lineWidth = 2;
      context.stroke();
    }

    // Define function to recursively draw the binary tree
    function drawTree(node, x, y, level) {
      if (!node) return;

      // Draw current node
      drawNode(x, y, node.value);

      // Calculate next node's coordinates
      const nextXLeft = x - horizontalGap / 2 ** level;
      const nextXRight = x + horizontalGap / 2 ** level;
      const nextY = y + verticalGap;

      // Draw connections
      if (node.left) {
        drawLine(x, y + nodeRadius, nextXLeft, nextY - nodeRadius);
        drawTree(node.left, nextXLeft, nextY, level + 1);
      }
      if (node.right) {
        drawLine(x, y + nodeRadius, nextXRight, nextY - nodeRadius);
        drawTree(node.right, nextXRight, nextY, level + 1);
      }
    }

    // Sample binary tree data
    class Node {
      constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
      }
    }

    // Construct binary tree
    const rootNode = new Node(1);
    rootNode.left = new Node(2);
    rootNode.right = new Node(3);
    rootNode.left.left = new Node(4);
    rootNode.left.right = new Node(5);
    rootNode.right.left = new Node(6);
    rootNode.right.right = new Node(7);

    // Start drawing the tree from the root
    drawTree(rootNode, canvas.width / 2, 50, 1);

    // Clean up
    return () => {
      // Cleanup code (if necessary)
    };
  }, []);

  return <canvas ref={canvasRef} />;
};

export default ElectricCircuit;
