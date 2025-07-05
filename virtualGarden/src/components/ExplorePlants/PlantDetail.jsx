import React, { useState } from "react";
import { IoMdImages } from "react-icons/io";
import { MdOutlineOndemandVideo } from "react-icons/md";
import { FaSun, FaMapMarkerAlt, FaTree } from "react-icons/fa";
import { MdLandscape, MdOutlineWbSunny } from "react-icons/md";
import PlantModelViewer from "./PlantModelViewer";
import { MdOutlineViewInAr } from "react-icons/md";
import { Canvas } from "@react-three/fiber"; // Import Canvas here
import "./PlantDetail.css";

const PlantDetail = ({ plant, onClose }) => {
  const [viewType, setViewType] = useState("image");
  const [isSecondaryContainerOpen, setIsSecondaryContainerOpen] = useState(false);
  const [currentSecondaryContent, setCurrentSecondaryContent] = useState("");

  // Handle the toggle between AYUSH and Health Benefits content
  const handleSecondaryContentChange = (contentType) => {
    console.log("Button clicked for:", contentType); // Debug log
    if (currentSecondaryContent !== contentType) {
      setCurrentSecondaryContent(contentType);
      setIsSecondaryContainerOpen(true); // Open the secondary container when either option is selected
    }
  };

  // Handle closing the secondary container
  const closeSecondaryContainer = () => {
    console.log("Closing secondary container"); // Debug log
    setIsSecondaryContainerOpen(false);
  };

  return (
    <>
      <div className="modal-overlay">
        <div className="modal-box">
          <button className="modal-close" onClick={onClose}>X</button>
          <div className="mainInfoContainer">
           
          <h2 className="modal-heading">{plant.commonName}</h2>
                <div className="viewer-content">
                  {viewType === "image" ? (
                    <img src={plant.image || plant.image_link} alt={plant.title} className="viewer-image" />
                  ) : (
                    plant.modelUrl && (
                      <div className="viewer-model">
                        <Canvas camera={{ position: [0, 1.5, 6], fov: 60 }}>
                          <PlantModelViewer
                            modelUrl={plant.modelUrl|| "/models/AloeVera.glb"}
                            isFloating={viewType === "auto"}
                            enableControls={viewType === "model"}
                          />
                        </Canvas>
                      </div>
                    )
                  )}
                </div>
              </div>
            
              <div className="viewer-section">
                <div className="viewer-toggle">
                  <button 
                    onClick={() => setViewType("image")} 
                    className={viewType === "image" ? "active" : ""}
                  >
                    <IoMdImages size={24} />
                  </button>
                  <button 
                    onClick={() => setViewType("model")} 
                    className={viewType === "model" ? "active" : ""}
                  >
                    <MdOutlineViewInAr  size={24} />
                  </button>
                  <button 
                    onClick={() => setViewType("auto")} 
                    className={viewType === "auto" ? "active" : ""}
                  >
                    <MdOutlineOndemandVideo size={24} />
                  </button>
                </div>
              <div className="plant-info-container">
              <div className="allname">
                <div className="allNamePlant">Sanskrit Name: <span>{plant.sanskritName}</span></div>
                <div className="allNamePlant">Botanical Name: <span>{plant.botanicalName}</span></div>
              </div>
              <div className="left-right-container">
                {/* left */}
                <div className="plant-info-column leftPlants">
                  <div className="info-box"><FaTree />Size: <span className="info-boxDetail">{plant.size}</span></div>
                  <div className="info-box"><FaMapMarkerAlt/>Region: <span className="info-boxDetail">{plant.nativeRegion}</span></div>
                  <div className="info-box"><MdLandscape/>Climate: <span className="info-boxDetail">{plant.preferredClimate}</span></div>
                  <div className="info-box"><FaSun/>Sunlight: <span className="info-boxDetail">{plant.requiredSunlight}</span></div>
                  <div className="info-box"><MdOutlineWbSunny/>Soil: <span className="info-boxDetail">{plant.requiredSoil}</span></div>
                </div>
                {/* right */}
                <div className="plant-info-column rightPlants">
                  <div className="tag-box">
                    <h4>Parts Used</h4>
                    <div className="tags">
                      {plant.partsUsed?.map((part, i) => <span key={i}>{part}</span>)}
                    </div>
                  </div>
                  <div className="tag-box">
                    <h4>Active Compounds</h4>
                    <div className="tags">
                      {plant.activeCompounds?.map((compound, i) => <span key={i}>{compound}</span>)}
                    </div>
                  </div>
                  <div className="tag-box">
                    <h4>Therapeutic Properties</h4>
                    <div className="tags">
                      {plant.therapeuticProperties?.map((prop, i) => <span key={i}>{prop}</span>)}
                    </div>
                  </div>
                  <div className="tag-box">
                    <h4>Dosage Forms</h4>
                    <div className="tags">
                      {plant.dosageForms?.map((form, i) => <span key={i}>{form}</span>)}
                    </div>
                   
                  </div>
                

      <div className="application-toggle-box">
  <button className="btn-secondary" onClick={() => handleSecondaryContentChange("ayush")}>
    AYUSH Application <span>🌿</span>
  </button>
  <button className="btn-secondary" onClick={() => handleSecondaryContentChange("health")}>
    Health Benefits <span>🌿</span>
  </button>
</div>

                </div>
              </div>
             
            </div>
          </div>
         
{isSecondaryContainerOpen && (
  <div className="tag-box application-box">
    <h3>{currentSecondaryContent === "ayush" ? "AYUSH Applications" : "Health Benefits"}</h3>
        <p>
          {currentSecondaryContent === "ayush"
            ? plant.ayushApplications?.join(plant.ayushApplications) || "No AYUSH applications available."
            : plant.healthBenefits?.join(plant.healthBenefits) || "No health benefits available."}
        </p>
  </div>
)}
        </div>
     
      </div>
     
    </>
  );
};

export default PlantDetail;
