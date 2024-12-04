/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useEffect, useRef } from "react";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
import * as THREE from "three";
import img from "./textures/sprites/circle.png";

const ThreeScene = () => {
  const mount = useRef(null);

  useEffect(() => {
    // Set up the scene
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(0.0, 50.0, 0.0);
    camera.lookAt(0, 0, 30);

    // Initial renderer setup
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    });

    const updateRendererSize = () => {
      const scrollY = window.scrollY;
      const scrollFactor = Math.max(0.5, 1 - scrollY / 1000);

      let width = window.innerWidth;
      let height = window.innerHeight;

      width = Math.max(window.innerWidth / 1.2, width * scrollFactor);
      height = Math.max(window.innerHeight / 1.2, height * scrollFactor);

      renderer.setSize(width, height * 1.2);

      // Update opacity
      const opacity = Math.max(0.5, 1 - scrollY / 1000);
      renderer.domElement.style.opacity = opacity.toString();

      // Center the canvas
      renderer.domElement.style.position = "fixed";
      renderer.domElement.style.left = "50%";
      renderer.domElement.style.transform = "translateX(-50%)";
    };

    // Initial size setup
    updateRendererSize();

    // Add scroll listener
    window.addEventListener("scroll", updateRendererSize);
    window.addEventListener("resize", updateRendererSize);

    //@ts-ignore
    mount.current.appendChild(renderer.domElement);

    const parentGroup = new THREE.Group();
    scene.add(parentGroup);
    const drawingGroup = new THREE.Group();
    parentGroup.add(drawingGroup);

    const loader = new THREE.TextureLoader();
    const sprite = loader.load(img);
    const pointGeometry = new THREE.BufferGeometry();
    const pointMaterial = new THREE.PointsMaterial({
      size: 1,
      sizeAttenuation: true,
      map: sprite,
      alphaTest: 0.5,
      transparent: true,
    });

    const lineGeometry = new THREE.BufferGeometry();
    const lineMaterial = new THREE.LineBasicMaterial({
      transparent: true,
      opacity: 1,
      linewidth: 1, // Add this line to increase stroke width
    });

    let time = 0; // Add time variable for animation
    let x = 0.1,
      y = 0,
      z = 0;

    //@ts-ignore
    let dotPosition = [];
    //@ts-ignore
    const positions = [],
      //@ts-ignore
      colors = [],
      //@ts-ignore
      size = [];

    function simulate() {
      time += 0.01;

      // Animate color with added light orange
      const purple = new THREE.Color("#A855F7");
      const pink = new THREE.Color("#EC4899");
      const fuchsia = new THREE.Color("#D946EF");
      const orange = new THREE.Color("#FFA07A"); // Light orange

      // Calculate color based on time with 4 colors now
      const color = new THREE.Color();
      if (time % 4 < 1) {
        color.lerpColors(purple, pink, time % 1);
      } else if (time % 4 < 2) {
        color.lerpColors(pink, fuchsia, time % 1);
      } else if (time % 4 < 3) {
        color.lerpColors(fuchsia, orange, time % 1);
      } else {
        color.lerpColors(orange, purple, time % 1);
      }

      lineMaterial.color = color;

      const dt = 0.01;
      const dx = 10 * (y - x) * dt;
      const dy = (x * (28 - z) - y) * dt;
      const dz = (x * y - (8 / 3) * z) * dt;
      x += dx;
      y += dy;
      z += dz;

      dotPosition.push(x, y, z);
      positions.push(x, y, z);
      colors.push(x / 30 + 0.5, y / 30 + 0.5, z / 30 + 0.5);
      size.push(10);

      pointGeometry.setAttribute(
        "position",
        //@ts-ignore
        new THREE.Float32BufferAttribute(dotPosition, 3)
      );
      lineGeometry.setAttribute(
        "position",
        //@ts-ignore
        new THREE.Float32BufferAttribute(positions, 3)
      );
      lineGeometry.setAttribute(
        "color",
        //@ts-ignore
        new THREE.Float32BufferAttribute(colors, 3)
      );

      drawingGroup.add(camera);
      parentGroup.rotation.z -= 0.0005;
      renderer.render(scene, camera);
      //@ts-ignore
      dotPosition = [];
      if (positions.length > 5000) {
        //@ts-ignore
        positions.splice(0, 3);
        //@ts-ignore
        colors.splice(0, 3);
      }
    }

    const dot = new THREE.Points(pointGeometry, pointMaterial);
    const line = new THREE.Line(lineGeometry, lineMaterial);
    scene.add(dot);
    scene.add(line);

    const animate = () => {
      requestAnimationFrame(animate);
      simulate();
    };

    animate();

    return () => {
      window.removeEventListener("scroll", updateRendererSize);
      window.removeEventListener("resize", updateRendererSize);
      //@ts-ignore
      mount.current.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div
      ref={mount}
      className="fixed top-0 left-0 w-full flex justify-center z-0"
    />
  );
};

export default ThreeScene;
