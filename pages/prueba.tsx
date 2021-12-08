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
        <div className="max-w-screen-lg w-full bg-white h-60 my-10 mx-auto inset-x-0 relative grid grid-cols-2 ">
            <div className="w-1/2 bg-green-500 flex items-center justify-between flex-col h-full ">
                <div className=" bg-blue-500 w-max px-5 py-2 text-white ">Iniciar sesion</div>
                <div className=" bg-red-500 w-max px-5 py-2 text-white ">Cerrar sesion</div>
                <div className=" bg-red-500 w-max px-5 py-2 text-white ">otrro</div>
            </div>
            <p className="mx-auto inset-x-0 w-20 text-center border">hola mundo</p>
        </div>
    )
}

export default prueba


/*
margin-left: auto
margin-righ
left: 0
right: 0
*/