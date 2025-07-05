import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import HeroSection from "../../components/Herosection/Herosection";
import About from "../../components/About/About";
import Products from "../../components/Products/HomeProducts";
import Exploreplants from "../../components/ExplorePlants/Exploreplants";
import BlogComponent from "../../components/Blogs/BlogComponent";
import Review from "../../components/Review/Review";
import AOS from 'aos';
import 'aos/dist/aos.css';

const Home = ({ addToCart }) => {
  const location = useLocation();

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false
    });
  }, []);

  useEffect(() => {
    if (location.state?.scrollTo) {
      const element = document.getElementById(location.state.scrollTo);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth" });
        }, 100); // wait a bit to ensure component is mounted
      }
    }
  }, [location]);

  return (
    <>
      <HeroSection />
      <Exploreplants/>
      <Products addToCart={addToCart}/>
      <BlogComponent/>
      <Review/>
      <About />
      <Footer />
    </>
  );
};

export default Home;

