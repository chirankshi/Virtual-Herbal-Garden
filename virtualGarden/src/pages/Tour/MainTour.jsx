import React, { useRef, useEffect, useState, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, Environment, useTexture, Html } from "@react-three/drei";
import * as THREE from "three";
import './Tour.css'

function PlantModal({ plant, onClose }) {
  if (!plant) return null;

  return (
    <div className="Tourmodal-overlay">
      <div className="Tourmodal-container">
        <button onClick={onClose} className="Tourmodal-close-btn">×</button>
        <h2 className="Tourmodal-title">{plant.commonName}</h2>

        <div className="Tourmodal-section">
          <h3>Basic Information</h3>
          <p><strong>Sanskrit Name:</strong> {plant.sanskritName}</p>
          <p><strong>Botanical Name:</strong> {plant.botanicalName}</p>
          <p><strong>Plant Size:</strong> {plant.plantSize}</p>
          <p><strong>Native Region:</strong> {plant.nativeRegion}</p>
          <p><strong>Preferred Climate:</strong> {plant.preferredClimate}</p>
        </div>

         {plant.image_link && (
          <div className="Tourmodal-section">
            <h3>Plant Image</h3>
            <img
              src={plant.image_link}
              alt={plant.commonName}
              className="Tourmodal-image"
            />
          </div>
        )}


        <div className="Tourmodal-section">
          <h3>Growth Requirements</h3>
          <p><strong>Sunlight:</strong> {plant.requiredSunlight}</p>
          <p><strong>Soil:</strong> {plant.requiredSoil}</p>
        </div>

        <div className="Tourmodal-section">
          <h3>Medicinal Uses</h3>
          <p><strong>Parts Used:</strong> {plant.partsUsedInMedicine?.join(", ")}</p>
          <p><strong>Active Compounds:</strong> {plant.activeCompounds?.join(", ")}</p>
          <p><strong>Therapeutic Properties:</strong> {plant.therapeuticProperties?.join(", ") || "Not specified"}</p>
          <p><strong>Dosage Forms:</strong> {plant.dosageForm?.join(", ")}</p>
          <p><strong>Side Effects:</strong> {plant.sideEffects}</p>
          <p><strong>Suitable Age Group:</strong> {plant.ageGroup}</p>
        </div>
 
      </div>
    </div>
  );
}






// 🎥 Camera movement using WASD
function CameraController() {
  const velocity = useRef([0, 0]);
  const moveSpeed = 0.5;

  useEffect(() => {
    const handleKeyDown = (e) => {
      switch (e.key) {
        case "w": velocity.current[1] = -moveSpeed; break;
        case "s": velocity.current[1] = moveSpeed; break;
        case "a": velocity.current[0] = -moveSpeed; break;
        case "d": velocity.current[0] = moveSpeed; break;
      }
    };
    const handleKeyUp = (e) => {
      if (["w", "s"].includes(e.key)) velocity.current[1] = 0;
      if (["a", "d"].includes(e.key)) velocity.current[0] = 0;
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  useFrame(({ camera }) => {
    camera.position.x += velocity.current[0];
    camera.position.z += velocity.current[1];
    camera.position.y = 6;
    camera.lookAt(0, 0, 0);
  });

  return null;
}

// 🌱 Ground with texture
function Ground() {
  const [colorMap, normalMap, roughnessMap] = useTexture([
    "/textures/grass/Grass007_2K-JPG_Color.jpg",
    "/textures/grass/Grass007_2K-JPG_NormalGL.jpg",
    "/textures/grass/Grass007_2K-JPG_Roughness.jpg",
  ]);

  [colorMap, normalMap, roughnessMap].forEach((tex) => {
    tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
    tex.repeat.set(20, 20);
  });

  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
      <planeGeometry args={[200, 200]} />
      <meshStandardMaterial map={colorMap} normalMap={normalMap} roughnessMap={roughnessMap} />
    </mesh>
  );
}




function Plant({ plant, setModalPlant }) {
  const gltf = useGLTF(plant.modelname);
  const [hovered, setHovered] = useState(false);

  return (
    <group
      position={plant.position}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      onClick={() => setModalPlant(plant)}
    >
      <primitive object={gltf.scene} scale={2} />

      {hovered && (
        <>
          <Html distanceFactor={10} position={[0, 2.5, 0]}>
            <div style={{
              background: "#222", color: "white", padding: "4px 10px", borderRadius: "8px",
              textAlign: "center", fontSize: "14px", opacity: 0.9
            }}>
              {plant.commonName}
            </div>
          </Html>

          <Html distanceFactor={12} position={[0, 4, 0]}>
            <div style={{
              background: "white", padding: "8px 12px", borderRadius: "10px", maxWidth: "220px",
              fontSize: "12px", boxShadow: "0 0 10px rgba(0,0,0,0.3)"
            }}>
              <p><strong>Botanical:</strong> {plant.botanicalName}</p>
              <p><strong>Sanskrit:</strong> {plant.sanskritName}</p>
              <p><strong>Climate:</strong> {plant.preferredClimate}</p>
              <p><strong>Sunlight:</strong> {plant.requiredSunlight}</p>
              <p><strong>Used Parts:</strong> {plant.partsUsedInMedicine?.join(", ")}</p>
            </div>
          </Html>
        </>
      )}
    </group>
  );
}


// 🌳 Garden Scene
function GardenScene({ setModalPlant }) {
  const [plants, setPlants] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8802/alldata/plants")
      .then(res => res.json())
      .then(data => {
        const grid = data.data.map((item, i) => {
          const spacing = 18;
          const columns = 6;
          const x = (i % columns) * spacing - ((columns - 1) * spacing) / 2;
          const z = Math.floor(i / columns) * spacing - 30;
          return {
            ...item.plant,
            position: [x, 1, z]
          };
        });
        setPlants(grid);
      })
      .catch(err => console.error("Failed to load plant data:", err));
  }, []);

  return (
    <Suspense fallback={null}>
      <Environment files="/hdr/sunflowers_puresky_2k.hdr" background />
      <ambientLight intensity={0.4} />
      <directionalLight position={[10, 10, 10]} intensity={1.5} castShadow />
      <Ground />
      {plants.map((plant, i) => (
        <Plant key={i} plant={plant} setModalPlant={setModalPlant} />
      ))}
      <CameraController />
    </Suspense>
  );
}

// New component to show movement keys legend
function MovementLegend() {
  return (
    <div style={{
      position: "fixed",
      top: 150,
      left: 20,
      background: "rgba(0,0,0,0.7)",
      color: "white",
      padding: "15px 20px",
      borderRadius: "10px",
      fontFamily: "Arial, sans-serif",
      fontSize: "16px",
      zIndex: 1000,
      userSelect: "none",
      maxWidth: "220px"
    }}>
      <h3 style={{ marginTop: 0, marginBottom: 10 }}>Controls</h3>
      <ul style={{ paddingLeft: 20, margin: 0 }}>
        <li><strong>W</strong>: Move Forward</li>
        <li><strong>A</strong>: Move Left</li>
        <li><strong>S</strong>: Move Backward</li>
        <li><strong>D</strong>: Move Right</li>
      </ul>
    </div>
  );
}

// 🟢 Main Entry
export default function MainTour() {
  const [modalPlant, setModalPlant] = useState(null);
  // const [showLegend, setShowLegend] = useState(true);

  // useEffect(() => {
  //   // Hide legend after 30 seconds
  //   const timer = setTimeout(() => {
  //     setShowLegend(false);
  //   }, 30000);

  //   return () => clearTimeout(timer);
  // }, []);

  return (
    
    <>
      <div style={{ height: "100vh", position: "relative" }}>
        <Canvas shadows camera={{ position: [0, 6, 25], fov: 60 }}>
          <GardenScene setModalPlant={setModalPlant} />
        </Canvas>
        <PlantModal plant={modalPlant} onClose={() => setModalPlant(null)} />
        {/* {showLegend && <MovementLegend />} */}
         <MovementLegend />
      </div>
    </>
    
  );
}
