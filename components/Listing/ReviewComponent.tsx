import { FC, useState } from "react";
import Slider from "react-slick";
import { ButtonComponent } from "../Inputs";
import { RatingStars } from "../Home/FeaturedCompanies";
import { ReviewIconPrincipal } from "../Icons";
import FormReviewComponent from "./FormReviewComponent";
import { business } from "../../interfaces";

const ReviewComponent: FC<Partial<business>> = ({ businessName }) => {
  const [isOpen, setOpen] = useState(false);
  const possibleReviews = [
    { title: "Profesionalidad", value: 5 },
    { title: "¿Lo recomiendas?", value: 0 },
    { title: "Calidad / Precio", value: 5 },
    { title: "Flexibilidad", value: 0 },
  ];
  return (
    <div className="p-3 md:p-6 bg-color-base w-full rounded-lg flex flex-col gap-4 transition-all h-auto">
      <div className="flex items-center gap-3">
        <ReviewIconPrincipal />
        <h2 className="text-xl text-gray-500">
          Opiniones sobre {businessName}
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 border-b pb-6 pt-4 border-gray-100 ">
        <AverageComponent />
        <div className="col-span-2 grid grid-cols-2 gap-6 py-2">
          {possibleReviews.map((item, idx) => (
            <SelectReviewComponent
              key={idx}
              title={item.title}
              value={item.value}
            />
          ))}
        </div>
      </div>
      <UsersGalleryComponent />
      <CommentComponent />
      <ButtonComponent
        onClick={() => setOpen(!isOpen)}
        className="ml-auto right-0"
        color={"white"}
      >
        Deja tu opinión
      </ButtonComponent>
      {isOpen && <FormReviewComponent />}
    </div>
  );
};

export default ReviewComponent;

const AverageComponent: FC = () => {
  return (
    <div className="w-full flex flex-col items-center text-gray-500 py-6 gap-1 md:border-r border-tertiary">
      <h2 className="font-light text-5xl text-tertiary">4.5</h2>
      <RatingStars rating={2} size={"lg"} visibleText={false} />
      <p className="text-sm">2 Opiniones</p>
    </div>
  );
};

interface propsSelectReviewComponent {
  title: string;
  value: number;
}
const SelectReviewComponent: FC<propsSelectReviewComponent> = ({
  title,
  value,
}) => {
  return (
    <div className="flex flex-col gap-1 items-center text-tertiary">
      <p className="text-sm">{title}</p>
      <RatingStars rating={value} size={"lg"} visibleText={false} />
    </div>
  );
};

export const UsersGalleryComponent: FC = () => {
  const settings = {
    autoplay: true,
    infinite: true,
    slidesToShow: 3,
    rows: 1,
    arrows: false,
    centerMode: true,
    responsive: [
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesPerRow: 1,
          rows: 1,
        },
      },
    ],
  };

  const Image: FC = () => {
    return (
      <div className="overflow-hidden w-40 h-40 rounded-lg relative mx-auto inset-x-0">
        <img
          alt={"hola"}
          src="/mask_1.png"
          className="absolute w-full h-full object-cover"
        />
      </div>
    );
  };

  return (
    <div className="border-b border-gray-100">
      <p className="text-sm text-tertiary">12 fotos de usuarios</p>
      <div className="grid grid-cols-1  w-full pb-6 py-3">
        <Slider {...settings}>
          <Image />
          <Image />
          <Image />
          <Image />
        </Slider>
      </div>
    </div>
  );
};

const CommentComponent: FC = () => {
  const ProfileComponent: FC = () => {
    return (
      <div className="flex items-center gap-2">
        <div className="w-12 h-12 rounded-full relative overflow-hidden border border-primary">
          <img
            src="/mask_1.png"
            className="absolute w-full h-full object-cover"
          />
        </div>
        <div className="flex flex-col gap-1 text-gray-500 leading-3">
          <p className="">Por Carolina Perez</p>
          <p className="text-sm">21 de marzo de 2021</p>
        </div>
      </div>
    );
  };

  const RatingAndRole: FC = () => {
    return (
      <div className="w-full flex items-center justify-start">
        <RatingStars rating={5} visibleText={false} size={"lg"} />
        <p className="ml-2 pl-2 border-l border-gray-300 text-sm text-gray-500">
          Estuve como invitada en una boda
        </p>
      </div>
    );
  };

  const ListingAnswer: FC = () => {
    return (
      <div className="bg-white rounded-xl w-full p-4 flex flex-col gap-2">
        <h3 className="text-primary">Respuesta de Manga Club</h3>
        <p className="text-tertiary text-sm">
          Hola Carolina Lopéz. Muchísimas gracias por tus palabras tan
          cariñosas. Fue un verdadero placer haber participado, estamos super
          agradecidos que nos hayáis escogido
        </p>
      </div>
    );
  };

  return (
    <div className="flex flex-col gap-4 py-4">
      <ProfileComponent />
      <RatingAndRole />
      <p className="text-gray-500 text-sm text-justify">
        En este maravilloso lugar se celebró la boda de mi mejor amiga. Nos
        encantó todo, la atención maravillosa desde el minuto 0 (yo ayudé a mi
        amiga mucho con los preparativos), las instalaciones, los preciosos
        paisajes... Fue un sueño, nos encantó todo. Sin duda, un lugar ideal
        para casarse.
      </p>
      <ListingAnswer />
    </div>
  );
};
