import React from 'react'
import './ExplorePlantsPage.css';
import videoSrc from '/videos/aboutmain1.mp4'; 
import Footer from '../../components/Footer/Footer';
import { useRef,useState ,useEffect } from "react";
import PlantDetail from '../../components/ExplorePlants/PlantDetail';
import plantvideo from '/videos/plant2mdicine.mp4'; 
import plantimg1 from  '../../assets/images/aboutmission.jpg';
import plantimg2 from '../../assets/images/about1.jpg';
import plantseed from '../../assets/images/plantseed.jpg';
import plantgrow from '../../assets/images/plantgrow.jpg';
import changepot from '../../assets/images/changepotplant.jpg';
import TeamSlider from '../../components/TeamSlider/TeamSlider';
const ExplorePlantsPage = () => {

  const [plants, setPlants] = useState([]);
  const [selectedPlant, setSelectedPlant] = useState(null);
  const [showDetail, setShowDetail] = useState(false);
  const buttonText = "Explore";
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
    
  const handlePlay = () => {
    videoRef.current.play();
      setIsPlaying(true);
  };

  
const handlePlaybutton = () => {
  if (videoRef.current) {
    videoRef.current.play();
  }
};

  useEffect(() => {
    const fetchPlants = async () => {
      try {
        const response = await fetch("http://localhost:8802/alldata/plants"); // Replace with your real API
        const data = await response.json();
        const formattedData = data.data.map(item => ({
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
        }catch (error) {
          console.error("Error fetching plant data:", error);
        }
      };
  
      fetchPlants();
  }, []);
  
  
  const handleLearnMore = (plant) => {
    console.log("Selected Plant Model URL:", plant.modelUrl); // <- Add this
    setSelectedPlant(plant);
    setShowDetail(true);
  };


  const closeDetail = () => {
    setSelectedPlant(null);
    setShowDetail(false);
  };



  return (
    <>
        {/* Hero Section */}
      <section className="explore-plant-hero">
        <div className="explore-plant-hero__overlay">
          <h1 className="explore-plant-hero__title">
            Explore Medicinal Plants 
          </h1>
        </div>
      </section>

        {/* intro */}
      <div className="content_introPlant">

        <div className="contentmainhead">
          <h2>🌿 Discover the Power of Healing Herbs</h2>
        </div>

        <div className="contentMainVideo">
          <div className="videocard-container">
            <video ref={videoRef} className={`custom-video ${isPlaying ? 'playing' : ''}`} muted loop controls=   {isPlaying}>
              <source src={videoSrc} type="video/mp4" />
            </video>
            
            {!isPlaying && (
              <div className="video-overlay" onClick={handlePlay}>
                <button className="play-button">&#9658;</button>
              </div>
            )}
          </div>
        </div>

        <div className="contentmainintro">
            <p>Discover the powerful medicinal plants that have supported wellness for centuries. From soothing herbs to immune-boosting roots, explore their uses, benefits, and natural healing properties—all in one place.</p>
        </div>

      </div>

      
      {/* featured plant of month */}

      <div className="featuredplant">
        <h3>Featured Plants of the Month 🌿 </h3>
        <div className="featuredplantscard">
          {plants.slice(15, 20).map((plant, idx) => (
            <div key={plant.commonName + idx} className='plantCards'>
              <img src={plant.image}/>
              <div className="plantName">{plant.commonName}</div>
              <div className="plantoverlaybutton">
                <button className='learnmore'  onClick={() => handleLearnMore(plant)}>Learn More</button>
              </div>
            </div>
          ))}
        </div>
      </div>


    {/* plant content */}
    <div className="plant-page__content">
          <div className="plant-page__heading">
            <div className="plant-page__main-title">
              <h1>Herbal Plants and Their Medicinal Preparations</h1>
            </div>
            <div className="plant-page__description">
              <p>
              The preparation of herbal medicines involves extracting the beneficial compounds from plants and creating effective, natural treatments.
              </p>
            </div>
          </div>

          <div className="plant-page__divider"></div>

          <div className="plant-page__details">

            <div className="plant-page__cards-container">
              <div className="plant-page__card">
                <h4> Infusions</h4>
                <p>Steeping herbs in hot water, often used for digestive issues or relaxation (e.g., chamomile tea)</p>
              </div>
              <div className="plant-page__card">
                <h4> Decoctions</h4>
                <p> Boiling tough plant parts like roots, often used for colds or nausea (e.g., ginger root).</p>
              </div>
              <div className="plant-page__card img">
                <img src={plantimg1} alt='plant_img'></img>
              </div>
              <div className="plant-page__card img">
                <img src={plantimg2} alt='plant_image'></img>
              </div>
            </div>

            <div className="plant-page__video-container">
              <video  ref={videoRef} className="plant-page__video" muted loop controls>
                <source src={plantvideo} type="video/mp4" />
              </video>
              <div className="video-overlay-plant"  onClick={handlePlaybutton}>
                <button className="play-button-plant">&#9658;</button>
              </div>
            </div>

          </div>

    </div>


        {/* view all plants */}
        <div className='sliderexploreplant'>
          <div className="explore-plantsPage-heading">
            <h2>🌿 Your Digital Doorway To Natural healing</h2>
            <p>Discover a wide variety of medicinal and aromatic plants. Click on each to learn more about their benefits, origins, and uses.</p>
          </div>
          <div className="plant-page__divider"></div>
          <TeamSlider images={plants} button={buttonText}   onButtonClick={handleLearnMore}/>
        </div>

        {/* taking care guidance */}

        <div className="takecareplant">
          <div className="mainHeadTakecare">
            <h1 className='TakecareTitle'>🌿 Right Way to Plant & Care for Healthy Growth</h1>
            <p>Follow The Instruction :</p>
          </div>
          <div className="TakecareStepsCards">
            <div className="TakecareStepCard">
              <h3>1. Sow the Seeds Properly</h3>
              <img src={plantseed} alt='Plantseed'/>
              <div className="hr"></div>
              <p>Plant seeds at the right depth in fertile soil, giving them the best start to sprout.</p>
            </div>
            <div className="TakecareStepCard">
              <h3>2. Water and Sunlight Management</h3>
              <img src={plantgrow} alt='Plantgrow'/>
              <div className="hr"></div>
              <p>Keep the soil evenly moist and provide adequate sunlight based on the plant’s needs.</p>
            </div>
            <div className="TakecareStepCard">
              <h3>3. Repot or Transplant When Needed</h3>
              <img src={changepot} alt='changepot'/>
              <div className="hr"></div>
              <p>Move growing plants to larger pots or garden beds to support healthy root development.</p>
            </div>
          </div>

        </div>


        {/* massonary container */}
      <div className="masonry-container">
         <h1>"Botanical Highlights"</h1>
        <div className="masonry-grid">
          {plants.slice(20, 30).map((plant, idx) => (
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


      <div className="footcont">
      <Footer />
      </div>

      
    {showDetail && selectedPlant && (
      <PlantDetail plant={selectedPlant} onClose={closeDetail} />
    )}


    </>
  )
}

export default ExplorePlantsPage;
