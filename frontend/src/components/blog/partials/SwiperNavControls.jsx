import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import CustomButton from "../../button/CustomButton";
import { useSwiper } from "swiper/react";

const SwiperNavControls = () => {
  const swiper = useSwiper();

  return (
    <div className="d-flex justify-content-between mt-3">
      <CustomButton variant="accent" onClick={() => swiper.slidePrev()}>
        <FaChevronLeft />
      </CustomButton>
      <CustomButton variant="accent" onClick={() => swiper.slideNext()}>
        <FaChevronRight />
      </CustomButton>
    </div>
  );
};

export default SwiperNavControls;
