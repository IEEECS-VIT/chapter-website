import React, { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";

function Model({ path, scale }) {
  const { scene } = useGLTF(path);

  useEffect(() => {
    scene.traverse((child) => {
      if (child.isMesh && child.material) {
        child.material.metalness = 0.2;
        child.material.roughness = 0.4;
      }
    });
  }, [scene]);

  return <primitive object={scene} scale={scale} />;
}

const LocalModelViewer = () => {

  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className={`w-full ${isMobile ? "h-[220px]" : "h-[420px]"}`}>
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <ambientLight intensity={1.8} />
        <directionalLight position={[5, 5, 5]} intensity={1.2} />
        <hemisphereLight skyColor={"#ffffff"} groundColor={"#444444"} intensity={0.6} />

        <Suspense fallback={null}>
          <Model path="/models/ieeeLOGO1.glb" scale={isMobile ? 0.85 : 1.2} />
        </Suspense>

        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={3} />
      </Canvas>
    </div>
  );
};

export default LocalModelViewer;
