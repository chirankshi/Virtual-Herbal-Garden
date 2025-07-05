import React, { useRef, useEffect, useState } from "react";
import { useGLTF, OrbitControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

const PlantModelViewer = ({ modelUrl, isFloating = false, enableControls = false }) => {
  const modelRef = useRef();
  const { scene } = useGLTF(modelUrl || "/models/defaultPlant.glb");
  const [modelScale, setModelScale] = useState(2.5); // Default scale for desktop

  // Adjust scale based on screen size
  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth;
      if (screenWidth < 550) {
        setModelScale(1.7); // 📱 Mobile screen
      } else if (screenWidth < 1024) {
        setModelScale(2); // 💻 Tablet or small laptop
      } else {
        setModelScale(2.3); // 🖥️ Big laptop or desktop
      }
    };

    handleResize(); // Call once when component mounts
    window.addEventListener("resize", handleResize); // Update on window resize

    return () => window.removeEventListener("resize", handleResize); // Cleanup
  }, []);

  useFrame(() => {
    if (isFloating && modelRef.current) {
      modelRef.current.rotation.y += 0.005;
    }
  });

  return (
    <>
      {/* Lights */}
      <ambientLight intensity={0.7} />
      <directionalLight position={[2, 2, 5]} intensity={1.2} />

      {/* Model */}
      <primitive 
        object={scene} 
        ref={modelRef} 
        position={[0, -0.5, 0]} 
        scale={modelScale} // 🎯 Dynamic responsive scale
      />

      {/* Controls */}
      <OrbitControls
        enableRotate={enableControls}
        enableZoom={true}
        enablePan={false}
        zoomSpeed={0.3}
        rotateSpeed={0.8}
      />
    </>
  );
};

export default PlantModelViewer;

