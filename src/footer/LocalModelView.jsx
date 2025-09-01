import React, { Suspense, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";

function Model({ path }) {
  const { scene } = useGLTF(path);

  useEffect(() => {
    scene.traverse((child) => {
      if (child.isMesh && child.material) {
        child.material.metalness = 0.2;
        child.material.roughness = 0.4;
      
      }
    });
  }, [scene]);

  return <primitive object={scene} scale={1.5} />;
}

const LocalModelViewer = () => {
  return (
    <div className="w-full h-[260px]">
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <ambientLight intensity={0.8} />
        <directionalLight position={[5, 5, 5]} intensity={1.2} />
        <hemisphereLight skyColor={"#ffffff"} groundColor={"#444444"} intensity={0.6} />

        <Suspense fallback={null}>
          <Model path="/models/ieeeLOGO1.glb" />
        </Suspense>

        <OrbitControls enableZoom={false} />
      </Canvas>
    </div>
  );
};

export default LocalModelViewer;
