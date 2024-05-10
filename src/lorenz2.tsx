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

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    });

    if (window.innerWidth < 768) {
      renderer.setSize(window.innerWidth, window.innerHeight / 2);
    } else {
      renderer.setSize(window.innerWidth / 2, window.innerHeight);
    }
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
      size: 3,
      sizeAttenuation: true,
      map: sprite,
      alphaTest: 0.5,
      transparent: true,
    });

    const lineGeometry = new THREE.BufferGeometry();
    const lineMaterial = new THREE.LineBasicMaterial({ color: 0x000000 });

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
      parentGroup.rotation.z -= 0.005;
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
      //@ts-ignore
      mount.current.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mount} />;
};

export default ThreeScene;
