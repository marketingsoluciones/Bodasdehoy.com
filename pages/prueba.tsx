import Slider from 'react-slick'
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };

const prueba = () => {
    return (
        <div>
            <Slider {...settings}>
                <div>
                    Hola mundo
                </div>
                <div>
                    Hola mundo
                </div>
                <div>
                    Hola mundo
                </div>
            </Slider>
        </div>
    )
}

export default prueba
