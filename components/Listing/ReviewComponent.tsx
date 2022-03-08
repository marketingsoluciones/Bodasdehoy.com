import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import Slider from "react-slick";
import { ButtonComponent } from "../Inputs";
import { RatingStars } from "../Home/FeaturedCompanies";
import { DeleteIcon, ReviewIconPrincipal } from "../Icons";
import FormReviewComponent from "./FormReviewComponent";
import { business } from "../../interfaces";
import { useDisclosure } from "../../hooks/useDisclosure";
import ModalReview from "./ModalReview";
import { capitalize } from "../../utils/Capitalize";
import { review, reviewsT } from '../../interfaces/index';
import useFetch from '../../hooks/useFetch';
import { queries, fetchApi } from '../../utils/Fetching';
import { LoadingItem } from '../Loading/index';
import { format, getRelativeTime } from '../../utils/FormatTime';
import {AuthContextProvider} from '../../context/AuthContext'
import { EditIcon } from '../Icons/index';
import { useRouter } from 'next/router';


const ReviewComponent: FC<business> = ({ businessName, _id, reviews: opiniones, review, reviewsT}) => {
  const [reviewsProps, setReviewsProps] = useState<reviewsT>(reviewsT)
  const [averageTotal, setAverageTotal] = useState<number>(review)
  const [totalReviews, setTotalReviews] = useState(0)
  const [skip, setSkip] = useState(0)
  const [limit, setLimit] = useState(5)
  const [data, setData, loading, error, fetch] = useFetch({query : queries.getAllReviews, variables: {criteria : {business: _id}, skip, limit, sort : {createdAt: -1}}})
  const [myReview, setMyReview] = useState<review | undefined>()
  const [reviews, setReviews] = useState<review[]>([])
  const {user} = AuthContextProvider()
  const { isOpen, onClose, onOpen } = useDisclosure();


  const possibleReviews = [
    { title: "Profesionalidad", value: reviewsProps?.professionalism },
    { title: "¿Lo recomiendas?", value: reviewsProps?.recommended },
    { title: "Calidad / Precio", value: reviewsProps?.priceQuality },
    { title: "Flexibilidad", value: reviewsProps?.flexibility },
  ];



  const fetchy = () => {
    fetch({query: queries.getAllReviews, variables: {criteria: {business: _id}, skip, limit, sort:{createdAt: -1}}})
  }
  
  const handleClickMoreReviews = async () => {
    try {
    setSkip(skip + limit)
    const {results} = await fetchApi({query : queries.getAllReviews,variables:  {criteria: {business: _id}, skip : skip + limit , limit, sort:{createdAt: -1}}, token: user?.accessToken})
    results && setReviews(old => [...old, ...results])
    
    } catch (error) {
      console.log(error)
    }
  }

  const fetchMyReview = async () => {
    const {results, total} = await fetchApi({query : queries.getAllReviews, variables: {criteria : {business: _id, user: user?.uid}}, token: user?.accessToken})
    setMyReview(results[0])
  }

  const fetchAverageTotal = async () => {
    console.log(_id)
    const {review, reviewsT} = await fetchApi({query :queries.getAverageBusiness, variables: {id: _id}, token : user?.accessToken})
    setReviewsProps(reviewsT)
    setAverageTotal(review)
    
  }

  
  useEffect(() => {
    opiniones && setReviews(opiniones)
  }, [opiniones])
  


  
  
  useEffect(() => {
    !loading && !error && setReviews(data?.results)
    !loading && !error && setTotalReviews(data?.total)
    !loading && !error && fetchMyReview() 
    !loading && !error && fetchAverageTotal() 
    
  }, [data, loading, error])


  const handleRemove = async() => {
    const res = await fetchApi({query : queries.deleteReview, variables: {id : myReview?._id}})
    fetchy()
  }
  const router = useRouter()
  return (
    <div 
      id={"reviews"}
      className="w-full col-span-4 flex flex-col gap-10 transition-all h-auto"
    >
      {isOpen && (
          <ModalReview
            isOpen={isOpen}
            onClose={onClose}
            title={`¿Que opinas de ${capitalize(businessName?.toLowerCase() ?? "")}?`}
          >
            {/* @ts-ignore */}
            <FormReviewComponent businessID={_id} setReviews={setReviews} fetchy={fetchy} initialValues={myReview} />
          </ModalReview>
        )}
      <div className="w-full bg-color-base p-3 md:p-6 rounded-xl">
        <div className="flex items-center gap-3 bg-color-base">
          <ReviewIconPrincipal className="w-10 h-10" />
          <h2 className="text-lg text-gray-500">
            Opiniones sobre {businessName}
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 pt-4 ">
          <AverageComponent average={averageTotal} total={data?.total} />
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
      {user?.uid ? (
        !myReview ? (
          <ButtonComponent
          onClick={onOpen}
        >
         
          Deja tu opinión
        </ButtonComponent>
        
        ) : (
          !loading ? (
            <CommentComponent {...myReview} >
              <span className="absolute bottom-0 right-0 flex items-center gap-2 ">
            <button className="bg-color-base rounded-xl p-2 text-gray-400 hover:bg-gray-300 transition hover:text-white" onClick={onOpen}><EditIcon className="w-4 h-4" /></button>
            <button className="bg-color-base rounded-xl p-2 text-gray-400 hover:bg-gray-300 transition hover:text-white" onClick={handleRemove}><DeleteIcon className="w-4 h-4" /></button>
  
              </span>
          </CommentComponent>
          ) : (
            <span className="text-gray-400 w-full flex items-center justify-center">
            <LoadingItem size="small" text="Cargando"/>
          </span>
          )
        )
      ) : <ButtonComponent
      onClick={() => router.replace("/login")}
    >
     
     Iniciar sesión
    </ButtonComponent>}
      
      <UsersGalleryComponent />

      <div className="flex flex-col justify-center">
        
        {/* GRID COMMENTS */}
        <div className="grid place-items-center gap-10">
          {!loading
            ? (
              <>
              {reviews?.map(review => (
                <CommentComponent key={review?._id} {...review} />
              ))}
              </>
            )
            : (
              <span className="text-gray-400">
                <LoadingItem size="small" text="Cargando"/>
              </span>
            )
          }
          {totalReviews > reviews?.length && (
            <ButtonComponent onClick={handleClickMoreReviews}>
            Ver más opiniones
          </ButtonComponent>
          )}
        </div>
      </div>
      
  
    </div>
  );
};

export default ReviewComponent;

interface propsAverageComponent {
  total: number
  average: number
}
const AverageComponent: FC <propsAverageComponent> = ({total, average}) => {
  return (
    <div className="w-full flex flex-col items-center text-gray-500 py-6 gap-1 md:border-r border-gray-400">
      <h2 className="font-light text-5xl text-tertiary">{average?.toFixed(1) ?? 0}</h2>
      <RatingStars rating={average} size={"lg"}  />
      <p className="text-sm">{total ?? 0} Opiniones</p>
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
      <RatingStars rating={value} size={"lg"}  />
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

const CommentComponent: FC <review> = ({average, user, reference, comment, answer, createdAt, children}) => {
  const [viewAnswer, setViewAnswer] = useState(false)
  const {user : userLogin} = AuthContextProvider()

  
  const ProfileComponent: FC = () => {
    return (
      <div className="flex w-full items-center gap-3">
        <div className="w-20 h-20 relative overflow-hidden rounded-full border-white border-2">
          <img
            src="/mask_1.png"
            className="absolute w-full h-full object-cover"
          />
        </div>

        <div className="flex items-start justify-center flex-col">
          <p className="font-medium text-gray-700 pl-1">{user?.displayName}</p>
          <div className="flex items-center gap-1 ">
            <RatingStars rating={Math.ceil(average)}  size={"lg"} />
            <p className="ml-2 pl-2 border-l border-gray-300 text-xs text-gray-500">
              {reference}
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
    <div className={`grid grid-cols-12 w-full gap-14 overflow-hidden relative  `}>
      

      {/* <ProfileComponent /> */}
      
      <div className="w-16 h-16 col-span-1 relative overflow-hidden rounded-full border-white border-2">
          <img
            src={user?.photoURL ?? "/placeholder/user.png"}
            className="absolute w-full h-full object-cover"
          />
        </div>
      {/* <RatingAndRole /> */}
      <div className="px-6 pt-3 flex flex-col gap-3 col-span-11">
        <div className="w-full flex justify-between items-center">
      <div className="flex items-start flex-col justify-start text-gray-300">
          <p className="font-medium text-primary font-bold text-sm pl-1">{user?.displayName}</p>
          <div className="flex items-center gap-2">
            <RatingStars rating={Math.ceil(average)}  size={"lg"} />
          <p className=" text-xs text-gray-500 pl-1">
              {reference}
            </p>

          </div>
        </div>

        {createdAt && <small className="text-gray-400 text-xs">{getRelativeTime(createdAt)}</small>}

        </div>
        <p className="text-gray-500 text-sm text-justify text-xs pl-1 pt-2">
          {comment}
          
          
        <div className="flex items-center justify-end pb-2">
      {answer && <button onClick={() =>setViewAnswer(!viewAnswer)} className={`text-xs ${viewAnswer ? "bg-primary text-white" : "bg-white text-primary"}  w-max px-3 py-1 rounded-md hover:bg-gray-500 hover:text-white transition`}>Ver respuesta de Jaihom</button>}
        </div>
        </p>
      {viewAnswer && <ListingAnswer/>}
      </div>
      
      {children}
    </div>
  );
};
