import { useEffect, useRef } from "react";
import * as THREE from "three";
import img from "./textures/sprites/circle.png";

const ThreeScene = () => {
  const mount = useRef(null);

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(0.0, 50.0, 0.0);
    camera.lookAt(0, 0, 30);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    });

    const updateRendererSize = () => {
      const hero3Element = document.getElementById("hero3");
      if (!hero3Element) return;

      const hero3Rect = hero3Element.getBoundingClientRect();
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const windowWidth = window.innerWidth;

      const hero3VisiblePortion = windowHeight - hero3Rect.top;
      const hero3Progress = Math.max(
        0,
        Math.min(hero3VisiblePortion / (windowHeight * 0.5), 1)
      );

      let width = windowWidth;
      let height = windowHeight;

      if (hero3Progress > 0) {
        const scaleFactor = 1 + hero3Progress * 1.5;
        width *= scaleFactor;
        height *= scaleFactor;

        // Adjust camera to maintain center focus
        const zoomFactor = 1 / scaleFactor;
        camera.zoom = zoomFactor;
        camera.updateProjectionMatrix();

        const opacity = Math.max(0, 1 - hero3Progress);
        renderer.domElement.style.opacity = opacity.toString();
      } else {
        const scrollFactor = Math.max(0.5, 1 - scrollY / 1000);
        width = Math.max(windowWidth / 1.2, width * scrollFactor);
        height = Math.max(windowHeight / 1.2, height * scrollFactor);

        // Reset camera zoom
        camera.zoom = 1;
        camera.updateProjectionMatrix();
        renderer.domElement.style.opacity = "1";
      }

      renderer.setSize(width, height * 1.2);

      // Center the canvas with adjusted positioning
      const leftOffset = (width - windowWidth) / 2;
      renderer.domElement.style.position = "fixed";
      renderer.domElement.style.left = "50%";
      renderer.domElement.style.transform = `translateX(-50%) translateY(${
        -leftOffset / 4
      }px)`;
    };

    // Rest of the code remains the same...
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
      linewidth: 1,
    });

    let time = 0;
    let x = 0.1,
      y = 0,
      z = 0;
    let dotPosition = [];
    const positions = [],
      colors = [],
      size = [];

    function simulate() {
      time += 0.01;

      const purple = new THREE.Color("#A855F7");
      const pink = new THREE.Color("#EC4899");
      const fuchsia = new THREE.Color("#D946EF");
      const orange = new THREE.Color("#FFA07A");

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
        new THREE.Float32BufferAttribute(dotPosition, 3)
      );
      lineGeometry.setAttribute(
        "position",
        new THREE.Float32BufferAttribute(positions, 3)
      );
      lineGeometry.setAttribute(
        "color",
        new THREE.Float32BufferAttribute(colors, 3)
      );

      drawingGroup.add(camera);
      parentGroup.rotation.z -= 0.0005;
      renderer.render(scene, camera);
      dotPosition = [];
      if (positions.length > 5000) {
        positions.splice(0, 3);
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

    window.addEventListener("scroll", updateRendererSize);
    window.addEventListener("resize", updateRendererSize);
    updateRendererSize();

    return () => {
      window.removeEventListener("scroll", updateRendererSize);
      window.removeEventListener("resize", updateRendererSize);
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
