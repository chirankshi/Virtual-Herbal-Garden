import React, { useEffect,useRef,useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "./AboutUs.css";
import TeamSlider from '../../components/TeamSlider/TeamSlider'
import videoSrc from '/videos/aboutmain1.mp4'; 
import visionImage from '../../assets/images/about4.jpg';
import whyChooseImage from '../../assets/images/whyChoose.avif';
import Footer from "../../components/Footer/Footer";
import Massonry from "../../components/Masonary/Massonary";

import img0 from "../../assets/images/aboutwork1.jpg";
import img1 from "../../assets/images/aboutteam1.jpg";
import img2 from "../../assets/images/aboutteam2.jpg";
import img3 from "../../assets/images/aboutteam.jpg";
import img4 from "../../assets/images/aboutwork.jpg";
import img5 from "../../assets/images/aboutwork2.jpg";
import img6 from "../../assets/images/aboutwork3.jpg";
import img7 from "../../assets/images/aboutwork4.jpg";
// Add more differently sized images

 const imagesabout = [
    img0,
    img1,
    img4,
    img2,
    img3,
    img5,
    img6, img7
  ];

  import member1 from '../../assets/images/teamMember.jpeg';
  import member2 from '../../assets/images/teamMember1.jpeg';
  import member3 from '../../assets/images/teamMember2.jpeg';
  import member4 from '../../assets/images/teamMember3.jpeg';
  import member5 from '../../assets/images/teamMember4.jpeg';
  import member6 from '../../assets/images/teamMember5.jpeg';
  import member7 from '../../assets/images/teamMember6.jpeg';
  
  const teamMembers = [
    { name: 'Aarav Mehta', img: member1 },
    { name: 'Saanvi Sharma', img: member2 },
    { name: 'Vivaan Patel', img: member3 },
    { name: 'Diya Reddy', img: member4 },
    { name: 'Ishaan Gupta', img: member5 },
    { name: 'Anaya Joshi', img: member6 },
    { name: 'Krishna Rao', img: member7 },
  ];
  



const AboutUs = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

 
 
    const videoRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
  
    const handlePlay = () => {
      videoRef.current.play();
      setIsPlaying(true);
    };
  

  return (
    <>
      {/* Hero Section */}
      <section className="aboutus-hero">
        <div className="aboutus-hero__overlay">
          <h1 className="aboutus-hero__title" data-aos="fade-right">
            About Us
          </h1>
        </div>
      </section>

      {/* Content Section */}
      <section className="aboutus-content">
        <div className="aboutus-content__header" data-aos="fade-up">
          <h2>🌿 Our Vision – Bridging Nature and Technology for a Healthier Tomorrow</h2>
        </div>

        <div className="aboutus-content__cards">

          <div className="aboutus-content__card" data-aos="fade-up" data-aos-delay="100">
            <h4>Promote Natural Healing</h4>
            <p>
              Reintroduce the power of traditional herbs and natural remedies in modern lifestyles through interactive learning.
            </p>
          </div>

          <div className="aboutus-content__card" data-aos="fade-up" data-aos-delay="200">
            <h4>Make Herbal Knowledge Accessible</h4>
            <p>
              Create a user-friendly platform where anyone can explore, understand, and benefit from medicinal plants and their uses.
            </p>
          </div>

          <div className="aboutus-content__card" data-aos="fade-up" data-aos-delay="300">
            <h4>Foster Eco-conscious Living</h4>
            <p>
              Encourage sustainable wellness and environmental awareness by connecting people digitally with nature’s healing bounty.
            </p>
          </div>
        </div>
         <div className="aboutus-content_imagevideocard">
            <div className="videocard-container">
              <video
                ref={videoRef}
                className={`custom-video ${isPlaying ? 'playing' : ''}`}
                muted
                loop
                controls={isPlaying}
              >
                <source src={videoSrc} type="video/mp4" />
              </video>

              {!isPlaying && (
                <div className="video-overlay" onClick={handlePlay}>
                  <button className="play-button">&#9658;</button>
                </div>
              )}
            </div>
            <div className="imagecard">
              <img src={visionImage} alt="vision-image" />
            </div>
        </div>
      </section>

      <div className="about-content__forchoose">
        <div className="forchoose__mainheadTitle">
            <div className="heading__mainhead"><h1>Why a Virtual Garden?</h1></div>
            <div className="mainhead__content">
              <p>In a fast-paced, urbanized world, many people have lost touch with the healing power of nature. Access to gardens and green spaces can be limited due to urbanization, climate, and lifestyle. Our Virtual Herbal Garden aims to bridge this gap, making plant knowledge and natural healing accessible to anyone, anywhere. Here's why we created it:</p>
            </div>
        </div>

        <div className="divhr"></div>

        <div className="forchosse__maincontent">

          <div className="forchoose_imagecont">
            <img src={whyChooseImage} alt="about_Why_chooseUs" />
          </div>

          <div className="forchoose_cardsmainCont">
            <div className="forchoose__maicard">
              <h4>🌱 Accessible to All</h4>
              <p>
                Explore healing plants from anywhere—city or village—via our 3D virtual garden, no travel needed.
              </p>
            </div>
            <div className="forchoose__maicard">
            <h4>🌿 Flexible Learning</h4>
            <p>
              Learn about herbs and remedies at your own pace, whenever it fits your schedule.
            </p>
            </div>
            <div className="forchoose__maicard">
            <h4>💡 Interactive Learning</h4>
            <p>
              Engage with 3D models and quizzes to better understand plant benefits in a fun way.
            </p>
            </div>
            <div className="forchoose__maicard">
            <h4>🌍 Eco Awareness</h4>
            <p>
              Learn how herbal practices support sustainability and biodiversity through our garden.
            </p>
            </div>
            <div className="forchoose__maicard">
            <h4>🧘‍♀️ Boost Mental Health</h4>
            <p>
              Experience the calming effect of greenery digitally—ideal for urban lifestyles.
            </p>
            </div>
            <div className="forchoose__maicard">
            <h4>🌿 Inspire Natural Living</h4>
            <p>
              Get motivated to grow herbs, use natural remedies, and live a more holistic lifestyle.
            </p>
            </div>
          </div>



        </div>

      </div>

      <div className="about-content__ourTeam">

        <div className="OurTeamMain">
          <div className="ourTeam__mainhead">
            <h1>Our Team <span>Of </span> Dedication</h1>
          </div>

          <div className="ourTeam__content">
            <p>A dedicated team of nature-lovers, developers, and herbal experts.
            Together, we’re building a digital sanctuary for wellness and plant-based living.:</p>
          </div>
        </div>
        
        <div className="slider">
          <TeamSlider images={teamMembers}/>
        </div>
      </div>
      
      <div className="about-content__ourWork">
        <div className="ourWork__Heading">
          <h1>Our <span>Work</span></h1>
        </div>
        {/* <Massonry/> */}
        <div className="ourTeam__MasonaryContainer">
          <Massonry images={imagesabout} />
        </div>
        
      </div>

      <div className="footcont">
      <Footer />
      </div>

      
    </>
  );
};

export default AboutUs;
