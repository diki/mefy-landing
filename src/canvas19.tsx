import React, { useEffect, useRef, useState } from "react";

const CanvasComponent = () => {
  const canvasRef = useRef(null);
  const [tree, setTree] = useState(null); // Initialize tree state

  const generateTree = (depth, x, y, horizontalGap, verticalGap) => {
    if (depth === 0) return null;

    const node = {
      value: Math.floor(Math.random() * 100),
      x,
      y,
      children: [],
    };

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

  const drawStraightLine = (context, x1, y1, x2, y2) => {
    context.beginPath();
    context.moveTo(x1, y1);
    context.lineTo(x2, y1); // Horizontal first
    context.lineTo(x2, y2); // Then vertical
    context.strokeStyle = "black";
    context.lineWidth = 2;
    context.stroke();
  };

  const drawTreeFromState = (context, node) => {
    if (!node) return;

    drawNode(context, node.x, node.y, node.value);
    node.children.forEach((child) => {
      drawStraightLine(context, node.x, node.y, child.x, child.y);
      drawTreeFromState(context, child);
    });
  };

  const traverseTree = (node, path = []) => {
    if (!node) return path;
    path.push(node); // Add the current node to path
    node.children.forEach((child) => traverseTree(child, path));
    return path;
  };

  const animateDot = (context, path) => {
    let index = 0;
    const moveDot = () => {
      if (index < path.length) {
        context.clearRect(0, 0, context.canvas.width, context.canvas.height); // Clear before redraw
        drawTreeFromState(context, tree); // Redraw the tree
        // Draw the red dot
        context.fillStyle = "red";
        context.beginPath();
        context.arc(path[index].x, path[index].y, 10, 0, 2 * Math.PI);
        context.fill();
        index++;
        setTimeout(moveDot, 1000);
        // requestAnimationFrame(moveDot);
      }
    };
    moveDot();
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight * 0.8;

    if (!tree) {
      const initialTree = generateTree(8, 50, canvas.height / 2, 150, 100);
      setTree(initialTree);
    }

    if (tree) {
      console.log("tree", tree);
      context.clearRect(0, 0, canvas.width, canvas.height);
      drawTreeFromState(context, tree);
      const path = traverseTree(tree); // Get the full traversal path
      animateDot(context, path);
    }
  }, [tree]); // Only re-run this effect if tree state changes

  return <canvas ref={canvasRef} />;
};

export default CanvasComponent;
