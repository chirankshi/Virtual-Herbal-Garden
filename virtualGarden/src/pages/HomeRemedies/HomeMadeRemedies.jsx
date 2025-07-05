import React, { useState, useEffect } from "react";
import Footer from '../../components/Footer/Footer'
import "./HomeMadeRemedies.css";

// Set your working API URL here
const API_URL = "http://localhost:8802/alldata/homeRemedies";

const HomeMadeRemedies = () => {
  const [diseaseData, setDiseaseData] = useState([]);
  const [selectedDisease, setSelectedDisease] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchDiseaseData = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error("Failed to fetch from API");
        const result = await response.json();
        setDiseaseData(result.data || []);
      } catch (error) {
        console.error("Error fetching data:", error);
        setDiseaseData([]);
      }
    };

    fetchDiseaseData();
  }, []);

  const handleCloseModal = () => setSelectedDisease(null);
  const handleSearch = (query) => setSearchQuery(query.toLowerCase());

  const filteredDiseaseData = searchQuery
    ? diseaseData.filter((disease) => {
        const diseaseMatch = disease?.disease?.toLowerCase()?.includes(searchQuery);

        const remedyMatch = disease?.remedies?.some((remedy) =>
          remedy?.name?.toLowerCase()?.includes(searchQuery) ||
          remedy?.ingredients?.some((ingredient) =>
            ingredient?.toLowerCase()?.includes(searchQuery)
          )
        );

        return diseaseMatch || remedyMatch;
      })
    : diseaseData;

  return (
    <>
      {/* Hero Section */}
      <section className="homeremedy-hero">
        <div className="homeremedy-hero__overlay">
          <h1 className="homeremedy-hero__title">Home Remedies</h1>
        </div>
      </section>

      <div className="remedies-container">

        {/* Search Bar */}
        <div className="search-barRemediy">
          <input
            type="text"
            placeholder="Search remedies..."
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>

        {/* Disease Cards */}
        <div className="card-grid">
          {filteredDiseaseData.map((disease, index) => (
            <div
              key={index}
              onClick={() => setSelectedDisease(disease)}
              className="card"
            >
              <img
                src={disease.image_link}
                alt={disease.disease}
                className="card-image"
              />
              <h2 className="card-title">{disease.disease}</h2>
            </div>
          ))}
        </div>


        {selectedDisease && (
          <div className="custom-modal-overlay" onClick={handleCloseModal}>
            <div className="custom-modal-content" onClick={(e) => e.stopPropagation()}>
              <button className="custom-modal-close" onClick={handleCloseModal}>
                &times;
              </button>
              <h2 className="custom-modal-title">
                Remedies for {selectedDisease.disease}
              </h2>

              <div className="custom-remedy-grid">
                {selectedDisease.remedies?.map((remedy, idx) => (
                  <div key={idx} className="custom-remedy-card">
                    <h3>{remedy.name}</h3>

                    {remedy.image_link && (
                      <img
                        src={remedy.image_link}
                        alt={remedy.name}
                        className="custom-remedy-image"
                      />
                    )}

                    <div className="custom-remedy-section">
                      <p>Ingredients:</p>
                      <ul className="custom-remedy-list">
                        {remedy.ingredients?.map((item, i) => (
                          <li key={i}>{item}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="custom-remedy-section">
                      <p>Steps:</p>
                      <ol className="custom-remedy-list">
                        {remedy.steps?.map((step, i) => (
                          <li key={i}>{step}</li>
                        ))}
                      </ol>
                    </div>

                    {remedy.video_link && (
                      <div className="custom-remedy-video-container">
                        <iframe
                          src={remedy.video_link}
                          title={remedy.name}
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscopepicture-in-picture"
                          allowFullScreen
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

      </div>

      <div className="footcont">
        <Footer/>
      </div>

    </>
  );
};

export default HomeMadeRemedies;
