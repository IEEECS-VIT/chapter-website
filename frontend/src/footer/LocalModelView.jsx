import React, { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";

function useMediaQuery(query) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    setMatches(media.matches);

    const listener = () => setMatches(media.matches);
    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, [query]);

  return matches;
}

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
  const isMobile = useMediaQuery("(max-width: 767px)");
  const isTablet = useMediaQuery("(min-width: 768px) and (max-width: 1024px)");

  const scale = isMobile ? 0.65 : isTablet ? 0.8 : 1.0;
  const height = isMobile ? "h-[220px]" : isTablet ? "h-[320px]" : "h-[420px]";

  return (
    <div className={`w-3/5 ${height}`}>
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <ambientLight intensity={2.9} />
        <directionalLight position={[5,5,5]} intensity={2.9} />
        <hemisphereLight skyColor="#ffffff" groundColor="#444444" intensity={1.2} />

        <Suspense fallback={null}>
          <Model path="/models/ieeeLOGO4.glb" scale={scale} />
        </Suspense>

        <OrbitControls enableZoom={false}  enablePan={false} 
        minPolarAngle={0}     
        maxPolarAngle={Math.PI}  
        minAzimuthAngle={-Infinity}
        maxAzimuthAngle={Infinity}
        autoRotate autoRotateSpeed={3} />
      </Canvas>
    </div>
  );
};

export default LocalModelViewer;
