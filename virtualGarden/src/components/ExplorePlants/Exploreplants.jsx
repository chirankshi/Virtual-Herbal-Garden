import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Exploreplants.css";
import PlantDetail from "./PlantDetail";
import Masonry from 'react-masonry-css';

const ExplorePlants = () => {
  const [plants, setPlants] = useState([]);
  const [selectedPlant, setSelectedPlant] = useState(null);
  const [showDetail, setShowDetail] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  
  useEffect(() => {
    const fetchPlants = async () => {
      try {
        const response = await fetch("http://localhost:8802/alldata/plants"); // Replace with your real API
        const data = await response.json();
        const formattedData = data.data.map(item => ({
          title: item.plant.commonName || "Unknown Plant",  // Use commonName here if you want
          commonName: item.plant.commonName || "Unknown",
          sanskritName: item.plant.sanskritName || "Sanskrit Name",
          botanicalName: item.plant.botanicalName || "Botanical Name",
          image: item.plant.image_link || "https://via.placeholder.com/150",
          description: item.plant.sanskritName || "No Sanskrit Name available",
          modelUrl: item.plant.modelname || "/models/DefaultModel.glb", 
          size: item.plant.plantSize || "Medium",
          nativeRegion: item.plant.nativeRegion || "India",
          preferredClimate: item.plant.preferredClimate || "Tropical",
          requiredSunlight: item.plant.requiredSunlight || "Full Sun",
          requiredSoil: item.plant.requiredSoil || "Loamy",
          partsUsed: item.plant.partsUsedInMedicine || ["Leaves"],
          activeCompounds: item.plant.activeCompounds || ["Flavonoids"],
          therapeuticProperties: item.plant.therapeuticProperties || ["Anti-inflammatory", "Digestive"],
          dosageForms: item.plant.dosageForm || ["Powder", "Capsule"],
          ayushApplications: item.plant.ayushApplications || ["Used in Ayurvedic medicine for respiratory health.", "Helps in reducing stress."],
          healthBenefits: item.plant.healthBenefits || ["Boosts immunity", "Reduces stress", "Supports respiratory health"]
        }));
        
        setPlants(formattedData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching plant data:", error);
        setLoading(false);
      }
    };

    fetchPlants();
  }, []);

  const handleLearnMore = (plant) => {
    setSelectedPlant(plant);
    setShowDetail(true);
  };

  const closeDetail = () => {
    setSelectedPlant(null);
    setShowDetail(false);
  };


  return (
    <section className="explore-plants" id="explorePlants">
    <h2 className="section-title-plants">Explore Herbal Plants</h2>
  
    <div className="masonry-container">
      <div className="masonry-grid">
        {plants.slice(0, 15).map((plant, idx) => (
        <div
        key={plant.commonName + idx}
        className={`plant-card ${idx % 3 === 0 ? 'tall' : 'short'}`}
        onClick={() => handleLearnMore(plant)}
      >
        <img src={plant.image} alt={plant.commonName} className="plant-image" />
        
        <div className="plant-overlay">
          <h3 className="plant-name">{plant.commonName}</h3>
          <p className="plant-description">
            {plant.description.length > 80 ? plant.description.slice(0, 80) + "..." : plant.description}
          </p>
        </div>
      </div>
        ))}
      </div>
    </div>
  
    {showDetail && selectedPlant && (
      <PlantDetail plant={selectedPlant} onClose={closeDetail} />
    )}
  </section>
  
  
  );
};

export default ExplorePlants;
