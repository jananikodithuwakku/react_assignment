import { useEffect, useRef } from "react";
import * as THREE from "three";
import "./Assignment_48.css";

export default function Assignment_48() {
  const mountRef = useRef(null);

  useEffect(() => {
    if (!mountRef.current) return;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      0.1,
      1000,
    );
    camera.position.z = 4;

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    });

    renderer.setSize(
      mountRef.current.clientWidth,
      mountRef.current.clientHeight,
    );

    renderer.setClearColor(0x000000, 0);

    mountRef.current.appendChild(renderer.domElement);

    // cube
    const geometry = new THREE.BoxGeometry(1.3, 1.3, 1.3);
    const material = new THREE.MeshStandardMaterial({ color: "#576ea1" });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    // lights
    scene.add(new THREE.AmbientLight(0xffffff, 0.5));
    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(5, 5, 5);
    scene.add(light);

    // mouse rotation
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };

    const onMouseDown = (e) => {
      isDragging = true;
      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const onMouseMove = (e) => {
      if (!isDragging) return;

      const deltaX = e.clientX - previousMousePosition.x;
      const deltaY = e.clientY - previousMousePosition.y;

      cube.rotation.y += deltaX * 0.01;
      cube.rotation.x += deltaY * 0.01;

      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    renderer.domElement.addEventListener("mousedown", onMouseDown);
    renderer.domElement.addEventListener("mousemove", onMouseMove);
    renderer.domElement.addEventListener("mouseup", onMouseUp);
    renderer.domElement.addEventListener("mouseleave", onMouseUp);

    let animationId;
    const animate = () => {
      animationId = requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(animationId);

      renderer.domElement.removeEventListener("mousedown", onMouseDown);
      renderer.domElement.removeEventListener("mousemove", onMouseMove);
      renderer.domElement.removeEventListener("mouseup", onMouseUp);
      renderer.domElement.removeEventListener("mouseleave", onMouseUp);

      if (mountRef.current && renderer.domElement.parentNode) {
        mountRef.current.removeChild(renderer.domElement);
      }

      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return (
  <div className="cube-container" ref={mountRef}/>);
}
