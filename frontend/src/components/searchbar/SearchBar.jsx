import CustomButton from "../button/CustomButton";
import { SlMagnifier } from "react-icons/sl";
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";

const SearchBar = ({ onSearchComplete }) => {
  const [productSearch, setProductSearch] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setProductSearch(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!productSearch.trim()) return;
    navigate(`/search?q=${encodeURIComponent(productSearch)}`);
    setProductSearch("");
    if (onSearchComplete) {
      onSearchComplete();
    }
  };

  return (
    <>
      <form
        className="d-flex pt-3 pt-lg-0"
        role="search"
        onSubmit={handleSubmit}
      >
        <input
          className="form-control me-2"
          type="text"
          placeholder="Search a destination..."
          aria-label="Search"
          onChange={handleInputChange}
          value={productSearch}
        />
        <CustomButton
          variant="accent"
          type="submit"
          className="d-flex justify-content-center align-items-center gap-1 rounded-4"
        >
          <SlMagnifier />
          Search
        </CustomButton>
      </form>
    </>
  );
};

export default SearchBar;
