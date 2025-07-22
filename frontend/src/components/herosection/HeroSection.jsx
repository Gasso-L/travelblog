import SearchBar from "../searchbar/SearchBar";
import heroImage from "../../assets/hero-bg.png";
import "./herosection.css";

const HeroSection = () => {
  return (
    <section className="hero-section">
      <div className="hero-image-wrapper">
        <img
          src={heroImage}
          alt="Hero travel background"
          className="hero-image img-fluid"
        />
        <div className="hero-overlay">
          <div className="hero-content text-center">
            <h1 className="hero-title">
              Be Inspired. Go Explore. Share the Journey.
            </h1>
            <p className="hero-subtitle fw-bold">
              Get Inspired for Your Next Adventures
            </p>
            <SearchBar />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
