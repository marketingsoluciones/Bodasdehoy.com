import Slider from "react-slick";
import { FC, ReactNode, useState, memo, useEffect } from "react";
import { GetStaticPaths, GetStaticProps } from "next";
import { fetchApi, queries } from "../../utils/Fetching";
import { business, category, subCategory } from "../../interfaces";
import {
  AireLibreIcon,
  ArrowIcon,
  CheckIcon,
  EnLaCiudadIcon,
  Location2Icon,
  PlayaIcon,
} from "../../components/Icons";
import { RangeComponent } from "../../components/Inputs";
import { useHover } from "../../hooks";
import { createURL } from "../../utils/UrlImage";
import {
  CardBusiness,
  HeaderCategory,
  ItemSubCategory,
} from "../../components/Category";
import useFetch from "../../hooks/useFetch";
import { LoadingItem } from "../../components/Loading";

const CategoryPage: FC<category> = (props) => {
  const { _id, imgBanner, subCategories, heading, title, description } = props;
  const query = {
    query: queries.getAllBusiness,
    variables: { criteria: { categories: _id } },
  };
  const [data, loading, error, fetchy] = useFetch({ ...query });

  useEffect(() => {
    fetchy({ ...query });
  }, [_id]);

  const settings = {
    autoplay: true,
    infinite: true,
    speed: 200,
    slidesToShow: 3,
    arrows: true,
    centerMode: true,
    responsive: [
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesPerRow: 1,
          fade: true,
        },
      },
    ],
  };

  return (
    <section className="flex flex-col gap-10">
      <div>
        <img
          src={
            imgBanner?.i640
              ? createURL(imgBanner?.i640)
              : "/placeholder/image.png"
          }
          className="w-full h-40 transform -mt-20 z-10 object-center object-cover"
        />
        <HeaderCategory {...props} />
      </div>
      <div className="max-w-screen-lg w-full mx-auto inset-x-0 grid grid-cols-1 items-center justify-between top-0  px-10">
        <Slider {...settings}>
          {subCategories?.length > 0 &&
            subCategories.map((item: subCategory) => (
              <ItemSubCategory key={item._id} {...item} />
            ))}
        </Slider>
      </div>
      <div className="xl:max-w-screen-lg 2xl:max-w-screen-xl mx-auto inset-x-0 grid md:grid-cols-7 2xl:grid-cols-5 w-full">
        <Filters />
        <div className="md:col-span-5 2xl:col-span-4">
          <div className="flex items-center justify-start gap-4 px-5 py-3">
          <p className="text-sm text-gray-500 ">Resultados encontrados: {data?.total ?? 0}</p>
          </div>
            {!loading && !error && data.results.length > 0 && (
          <div className="grid md:grid-cols-3 2xl:grid-cols-4 gap-6 pl-6 py-6 place-items-center">
                {data.results.map((business: business) => (
                  <CardBusiness key={business._id} {...business} />
                  ))}
                  </div>
            )}
            {loading && <div className="min-h-40 h-40 w-full grid place-items-center"><LoadingItem text={"Cargando"} size={"small"} /></div>}
            {error && "error"}
          </div>
      </div>
    </section>
  );
};

export default CategoryPage;

const Filters = () => {
  const List = [
    { title: "En la playa", icon: <PlayaIcon /> },
    { title: "Al aire libre", icon: <AireLibreIcon /> },
    { title: "En la ciudad", icon: <EnLaCiudadIcon /> },
  ];

  const ListF = [
    { title: "Terraza" },
    { title: "Zona ajardinada" },
    { title: "Zona de baile" },
    { title: "Zona para ceremonia" },
    { title: "Salones de banquetes" },
    { title: "Carpa" },
    { title: "Cocina para catering" },
    { title: "Hospedaje para invitados" },
    { title: "Parking" },
  ];
  return (
    <>
      <div className="md:col-span-2 2xl:col-span-1 bg-white h-max w-full rounded-lg shadow">
        <ActivedFilters />
        <LocationFilter />
        <EventType title="Tipo de boda" list={List} />
        <RangeFilter title={"Capacidad del banquete"} min={0} max={100} />
        <RangeFilter title={"Capacidad del cóctel"} min={0} max={100} />
        <RangeFilter title={"Hora de cierre"} min={0} max={24} />
        <ListFilter title={"Instalaciones"} list={ListF} />
      </div>
    </>
  );
};

const BlockFilter = ({ children, className }: any) => {
  return (
    <div className={`py-4 px-6 border-b border-base ${className}`}>
      {children}
    </div>
  );
};

const ActivedFilters = () => {
  return (
    <BlockFilter className="flex items-center justify-between gap-2">
      <span className="flex items-center gap-2">
        <p className="text-sm text-gray-500">Filtros activos</p>
        <span className="rounded-full border border-primary text-xs text-primary w-6 h-6 flex items-center justify-center">
          10
        </span>
      </span>
      <button className="px-2 w-max border border-primary focus:outline-none bg-white text-primary text-xs rounded-full py-1 hover:text-white hover:bg-primary transition">
        Limpiar
      </button>
    </BlockFilter>
  );
};

interface propsAccordion {
  title: string;
  children: any;
}
const Accordion: FC<propsAccordion> = ({ title, children }: any) => {
  const [show, setShow] = useState(true);
  return (
    <BlockFilter className={`flex flex-col ${show ? "gap-4" : ""}`}>
      <div className="flex justify-between w-full items-center">
        <h2 className="text-sm font-semibold text-primary capitalize">
          {title}
        </h2>
        <span onClick={() => setShow(!show)}>
          <ArrowIcon className="text-primary cursor-pointer hover:opacity-90 transition transform hover:scale-110 " />
        </span>
      </div>
      <div
        className={`relative w-full overflow-hidden  ${
          show ? "max-h-full" : "max-h-0"
        }`}
      >
        {children}
      </div>
    </BlockFilter>
  );
};

const LocationFilter = () => {
  return (
    <Accordion title="Localidad">
      <Location2Icon className="text-primary absolute w-4 h-4 inset-y-0 my-auto left-5" />
      <input className="w-full bg-color-base rounded-full h-10 focus:outline-none pl-10 text-sm text-gray-200" />
    </Accordion>
  );
};

interface propsEventType {
  title: string;
  list: { icon: ReactNode; title: string }[];
}

const EventType: FC<propsEventType> = ({ title, list }) => {
  const [selected, setSelect] = useState<number>();
  return (
    <Accordion title={title}>
      <div className="w-full grid grid-cols-3 gap-2">
        {list.map((item: { title: string; icon: ReactNode }, idx: number) => (
          <div
            key={idx}
            className="w-full flex items-center justify-center flex-col"
          >
            <button
              onClick={() => setSelect(idx)}
              className={`${
                selected === idx ? "text-primary" : "text-gray-200"
              } text-xs flex items-center justify-center  flex-col  gap-2 focus:outline-none cursor-pointer transition hover:text-primary `}
            >
              {item.icon}
              {item.title}
            </button>
          </div>
        ))}
      </div>
    </Accordion>
  );
};

interface propsRangeFilter {
  title: string;
  min: number;
  max: number;
}

const RangeFilter: FC<propsRangeFilter> = ({ title, min, max }) => {
  return (
    <Accordion title={title}>
      <div className="py-4 px-4">
        <RangeComponent min={min} max={max} />
      </div>
    </Accordion>
  );
};

interface propsListFilter {
  title: string;
  list: { title: string }[];
}

const ListFilter: FC<propsListFilter> = ({ title, list }) => {
  const [checked, setCheck] = useState<number[]>([]);

  const ActiveFilter = (idx: number) => {
    if (!checked.includes(idx)) {
      setCheck((old) => [...old, idx]);
    } else {
      setCheck((old) => old.filter((item) => item !== idx));
    }
  };

  const ItemList = ({ idx, item }: any) => {
    const [hoverRef, isHovered] = useHover();
    return (
      <li
        ref={hoverRef}
        className="text-gray-200 text-sm flex items-center gap-2 cursor-pointer"
        onClick={() => ActiveFilter(idx)}
      >
        {checked.includes(idx) || isHovered ? (
          <CheckIcon className="w-4 h-4" />
        ) : (
          <div className="w-4 h-4 border border-gray-200 rounded-full" />
        )}
        {item.title}
      </li>
    );
  };
  return (
    <Accordion title={title}>
      <ul className="flex flex-col gap-2">
        {list.map((item: any, idx: number) => (
          <ItemList key={idx} idx={idx} item={item} />
        ))}
      </ul>
    </Accordion>
  );
};

export const getStaticProps: GetStaticProps = async ({ params }: any) => {
  try {
    console.time("Category Page queries");
    const {
      results: [category],
    } = await fetchApi(queries.getAllCategoryBusiness, {
      criteria: { slug: params.slug },
    });

    console.timeEnd("Category Page queries");
    return {
      props: category ?? {},
    };
  } catch (error) {
    console.timeEnd("Category Page queries");
    console.log(error);
    return {
      props: {},
    };
  }
};

export const getStaticPaths: GetStaticPaths = async () => {
  try {
    const { results } = await fetchApi(queries.getCategories);

    const paths = results.reduce(
      (acc: { params: { slug: string } }[], category: category) => {
        category.slug && acc.push({ params: { slug: category.slug } });
        return acc;
      },
      []
    );
    return {
      paths: paths,
      fallback: "blocking",
    };
  } catch (error) {
    console.log(error);
    return {
      paths: [],
      fallback: "blocking",
    };
  }
};
