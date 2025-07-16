import SearchBar from "../searchbar/SearchBar";
import "./HeroSection.css";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="hero-section">
      <div className="hero-overlay">
        <div className="hero-content text-center">
          <h1 className="hero-title">
            Be Inspired. Go Explore. Share the Journey.
          </h1>
          <p className="hero-subtitle">Get Inspired for Your Next Adventures</p>
          <SearchBar />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
