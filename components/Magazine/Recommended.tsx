import Slider from "react-slick";
import TitleSection from "../Home/TitleSection";

const Recommended = () => {
  const settings = {
    autoplay: true,
    accessibility: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    responsive: [
      {
        breakpoint: 600,
        settings: {
          slidesToScroll: 1,
          slidesToShow: 1,
        },
      },
    ],
  };
  return (
    <>
      <TitleSection
        principal={"Recomendados"}
        secondary={"para tu boda"}
        size={"xl"}
      />
      <Slider>
          
      </Slider>
    </>
  );
};

export default Recommended;
