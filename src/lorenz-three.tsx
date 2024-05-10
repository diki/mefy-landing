import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import img from "./textures/sprites/circle.png";

const LorenzAttractor = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    // Set up the scene
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(0.0, 60.0, 0.0);
    camera.lookAt(0, 0, 30);

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.screenSpacePanning = true;
    controls.minDistance = -70;
    controls.maxDistance = 60;
    controls.target.set(0, 0, 30);
    controls.update();

    const parentGroup = new THREE.Group();
    scene.add(parentGroup);

    const axesHelper = new THREE.AxesHelper(5);
    parentGroup.add(axesHelper);

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
    const lineMaterial = new THREE.LineBasicMaterial({ vertexColors: true });

    let x = 0.1,
      y = 0,
      z = 0;
    const positions = [],
      colors = [],
      dotPosition = [];

    const animate = () => {
      requestAnimationFrame(animate);

      // Lorenz attractor calculations
      const sigma = 10,
        rho = 28,
        beta = 8 / 3;
      const dt = 0.01;
      const dx = sigma * (y - x) * dt;
      const dy = (x * (rho - z) - y) * dt;
      const dz = (x * y - beta * z) * dt;
      x += dx;
      y += dy;
      z += dz;

      positions.push(x, y, z);
      dotPosition.push(x, y, z);

      pointGeometry.setAttribute(
        "position",
        new THREE.Float32BufferAttribute(dotPosition, 3)
      );
      lineGeometry.setAttribute(
        "position",
        new THREE.Float32BufferAttribute(positions, 3)
      );

      drawingGroup.add(new THREE.Points(pointGeometry, pointMaterial));
      drawingGroup.add(new THREE.Line(lineGeometry, lineMaterial));

      renderer.render(scene, camera);

      if (positions.length > 5000) {
        positions.splice(0, 3);
        colors.splice(0, 3);
      }
    };

    animate();

    // Clean up on component unmount
    return () => {
      mountRef.current.removeChild(renderer.domElement);
      scene.dispose();
    };
  }, []);

  return <div ref={mountRef} />;
};

export default LorenzAttractor;
