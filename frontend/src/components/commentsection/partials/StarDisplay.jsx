import { FaStar, FaRegStar } from "react-icons/fa";

const StarDisplay = ({ value, max = 5 }) => {
  const stars = [];

  for (let i = 1; i <= max; i++) {
    stars.push(i <= value ? <FaStar key={i} /> : <FaRegStar key={i} />);
  }

  return <span className="text-warning d-inline-flex gap-1">{stars}</span>;
};

export default StarDisplay;
