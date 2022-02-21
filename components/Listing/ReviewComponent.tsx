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
    <div
      id={"reviews"}
      className="w-full col-span-4 flex flex-col gap-10 transition-all h-auto"
    >
      <div className="w-full bg-color-base p-3 md:p-6 rounded-xl">
        <div className="flex items-center gap-3 bg-color-base">
          <ReviewIconPrincipal className="w-10 h-10" />
          <h2 className="text-lg text-gray-500">
            Opiniones sobre {businessName}
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 pt-4 ">
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
      </div>
      <UsersGalleryComponent />

      <div className="flex flex-col justify-center">
        <div className=" flex items-center justify-between px-1 pb-4">
          <p className="text-sm text-tertiary ">Mostrando 105 opiniones</p>
        </div>
        {/* GRID COMMENTS */}
        <div className="grid place-items-center gap-10">
          <CommentComponent />
          <CommentComponent />
        </div>
      </div>
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
    <div className="w-full flex flex-col items-center text-gray-500 py-6 gap-1 md:border-r border-gray-400">
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
    slidesToShow: 4,
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
      <div className="overflow-hidden w-32 h-32 rounded-lg relative mx-auto inset-x-0">
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
      <div className="flex w-full  items-center gap-3">
        <div className="w-14 h-14 relative overflow-hidden rounded-full border-white border-2">
          <img
            src="/mask_1.png"
            className="absolute w-full h-full object-cover"
          />
        </div>

        <div className="flex items-start justify-center flex-col">
          <p className="font-medium text-gray-700 pl-1">Carolina Perez</p>
          <div className="flex items-center gap-1 ">
            <RatingStars rating={5} visibleText={false} size={"lg"} />
            <p className="ml-2 pl-2 border-l border-gray-300 text-xs text-gray-500">
              Estuve como invitada en una boda
            </p>
          </div>
        </div>
      </div>
    );
  };

  const ListingAnswer: FC = () => {
    return (
      <div className="w-full flex flex-col gap-1 pl-6">
          <h3 className="text-primary text-sm ">Respuesta de Manga Club:</h3>
          <p className="text-tertiary text-xs">
            Hola Carolina Lopéz. Muchísimas gracias por tus palabras tan
            cariñosas. Fue un verdadero placer haber participado, estamos super
            agradecidos que nos hayáis escogido
          </p>
      </div>
    );
  };

  return (
    <div className="flex flex-col gap-4 py-4 bg-color-base p-6 rounded-xl relative float-left w-full h-auto transition">
      <ProfileComponent />
      {/* <RatingAndRole /> */}
      <div className="px-6 pt-3 flex flex-col gap-3">
        <p className="text-gray-500 text-sm text-justify text-xs">
          En este maravilloso lugar se celebró la boda de mi mejor amiga. Nos
          encantó todo, la atención maravillosa desde el minuto 0 (yo ayudé a mi
          amiga mucho con los preparativos), las instalaciones, los preciosos
          paisajes... Fue un sueño, nos encantó todo. Sin duda, un lugar ideal
          para casarse.
        <div className="flex items-center justify-end pb-2">
      <button className="text-xs bg-white text-primary w-max px-3 py-1 rounded-md hover:bg-primary hover:text-white transition">Ver respuesta de Jaihom</button>
        </div>
        </p>
      <ListingAnswer/>
      </div>
      
    </div>
  );
};
