import { Dispatch, FC, SetStateAction, useEffect, useState, MouseEventHandler } from 'react';
import Slider from "react-slick";
import { ButtonComponent } from "../Inputs";
import { RatingStars } from "../Home/FeaturedCompanies";
import { DeleteIcon, ReviewIconPrincipal, ViewGrid } from "../Icons";
import FormReviewComponent from "./FormReviewComponent";
import { business } from "../../interfaces";
import { useDisclosure } from "../../hooks/useDisclosure";
import ModalReview from "./ModalReview";
import { capitalize } from "../../utils/Capitalize";
import { review, reviewsT, image } from "../../interfaces/index";
import useFetch from "../../hooks/useFetch";
import { queries, fetchApi } from "../../utils/Fetching";
import { LoadingItem } from "../Loading/index";
import { format, getRelativeTime } from "../../utils/FormatTime";
import { AuthContextProvider } from "../../context/AuthContext";
import { EditIcon, CloseIcon, UploadImageIcon } from "../Icons/index";
import { useRouter } from "next/router";
import { createURL } from "../../utils/UrlImage";
import ClickAwayListener from "react-click-away-listener";


interface imagesReviews {
  image: image;
  review: review;
}

interface propsReviewComponent extends business {
  totalReviews: number;
  averageTotal: number;
  setTotalReviews: Dispatch<SetStateAction<number>>;
  setAverageTotal: Dispatch<SetStateAction<number>>;
  setReviewsProps: Dispatch<SetStateAction<reviewsT>>;
  reviewsProps: any;
}
const ReviewComponent: FC<propsReviewComponent> = ({
  businessName,
  _id,
  reviews: opiniones,
  review,
  reviewsT,
  totalReviews,
  setTotalReviews,
  averageTotal,
  reviewsProps,
  setReviewsProps,
  setAverageTotal,
}) => {
  const [skip, setSkip] = useState(0);
  const [limit, setLimit] = useState(5);
  const [data, setData, loading, error, fetch] = useFetch({
    query: queries.getAllReviews,
    variables: {
      criteria: { business: _id },
      skip,
      limit,
      sort: { createdAt: -1 },
    },
  });
  const [myReview, setMyReview] = useState<review | undefined>();
  const [reviews, setReviews] = useState<review[]>([]);
  const { user } = AuthContextProvider();
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [showPreview, setShowPreview] = useState<{
    data: review;
    source: image;
  } | null>(null);

  const possibleReviews = [
    { title: "Profesionalidad", value: reviewsProps?.professionalism },
    { title: "¿Lo recomiendas?", value: reviewsProps?.recommended },
    { title: "Calidad / Precio", value: reviewsProps?.priceQuality },
    { title: "Flexibilidad", value: reviewsProps?.flexibility },
  ];

  const fetchy = () => {
    fetch({
      query: queries.getAllReviews,
      variables: {
        criteria: { business: _id },
        skip,
        limit,
        sort: { createdAt: -1 },
      },
    });
  };

  const handleClickMoreReviews = async () => {
    try {
      setSkip(skip + limit);
      const { results } = await fetchApi({
        query: queries.getAllReviews,
        variables: {
          criteria: { business: _id },
          skip: skip + limit,
          limit,
          sort: { createdAt: -1 },
        },
        token: user?.accessToken,
      });
      results && setReviews((old) => [...old, ...results]);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchAverageTotal = async () => {
    const { review, reviewsT } = await fetchApi({
      query: queries.getAverageBusiness,
      variables: { id: _id },
      token: user?.accessToken,
    });
    setReviewsProps(reviewsT);
    setAverageTotal(review);
  };

  useEffect(() => {
    fetchAverageTotal();
  }, []);
  const fetchMyReview = async () => {
    if (user?.uid) {
      const { results, total } = await fetchApi({
        query: queries.getAllReviews,
        variables: { criteria: { business: _id, user: user?.uid } },
        token: user?.accessToken,
      });
      setMyReview(results[0]);
    }
  };

  useEffect(() => {
    opiniones && setReviews(opiniones);
  }, [opiniones]);

  useEffect(() => {
    !loading && !error && setReviews(data?.results);
    !loading && !error && setTotalReviews(data?.total);
    !loading && !error && fetchMyReview();
    !loading && !error && fetchAverageTotal();
  }, [data, loading, error, user]);

  const handleRemove = async () => {
    await fetchApi({
      query: queries.deleteReview,
      variables: { id: myReview?._id },
    });
    fetchy();
  };
  const router = useRouter();


  const [images, setImages] = useState<imagesReviews[]>([]);

  useEffect(() => {
    if (reviews && reviews.length > 0) {
      const imagesReviews = reviews.reduce((acc: any, review) => {
        review.imgCarrusel.forEach((image) => {
          const obj = {
            image,
            review,
          };
          acc = [...acc, obj];
        });
        return acc;
      }, []);

      setImages(imagesReviews);
    } else {
      setImages([])
    }
  }, [reviews, data]);

  return (
    <>
      {showPreview && (
        <PreviewComponent
          state={showPreview}
          set={setShowPreview}
          images={images}
        />
      )}

      <div
        id={"reviews"}
        className="w-full col-span-4 flex flex-col gap-2 transition-all h-auto"
      >
        {isOpen && (
          <ModalReview
            isOpen={isOpen}
            onClose={onClose}
            title={`¿Que opinas de ${capitalize(
              businessName?.toLowerCase() ?? ""
            )}?`}
          >
            {/* @ts-ignore */}
            <FormReviewComponent
              businessID={_id}
              setReviews={setReviews}
              fetchy={fetchy}
              initialValues={myReview}
            />
          </ModalReview>
        )}
        <div className="w-full p-3 md:p-6 rounded-xl">
          <div className="flex items-center gap-3">
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
            <ButtonComponent onClick={onOpen}>Deja tu opinión</ButtonComponent>
          ) : !loading ? (
            <CommentComponent setPreview={setShowPreview} {...myReview}>
              <span className="absolute bottom-0 right-0 flex items-center gap-2 ">
                <button
                  className="bg-color-base rounded-xl p-2 text-gray-400 hover:bg-gray-300 transition hover:text-white"
                  onClick={onOpen}
                >
                  <EditIcon className="w-4 h-4" />
                </button>
                <button
                  className="bg-color-base rounded-xl p-2 text-gray-400 hover:bg-gray-300 transition hover:text-white"
                  onClick={handleRemove}
                >
                  <DeleteIcon className="w-4 h-4" />
                </button>
              </span>
            </CommentComponent>
          ) : (
            <span className="text-gray-400 w-full flex items-center justify-center">
              <LoadingItem size="small" text="Cargando" />
            </span>
          )
        ) : (
          <ButtonComponent onClick={() => router.replace("/login")}>
            Iniciar sesión
          </ButtonComponent>
        )}

        {images && images.length > 0 && <UsersGalleryComponent images={images} set={setShowPreview} />}

        <div className="flex flex-col justify-center">
          {/* GRID COMMENTS */}
          <div className="grid place-items-center ">
            {!loading ? (
              <>
                {reviews?.filter(review => review.user._id !== myReview?.user._id).map((review) => (
                  <CommentComponent
                    setPreview={setShowPreview}
                    key={review?._id}
                    {...review}
                  />
                ))}
              </>
            ) : (
              <span className="text-gray-400">
                <LoadingItem size="small" text="Cargando" />
              </span>
            )}
            {totalReviews > reviews?.length && (
              <ButtonComponent onClick={handleClickMoreReviews}>
                Ver más opiniones
              </ButtonComponent>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ReviewComponent;

interface propsAverageComponent {
  total: number;
  average: number;
}
const AverageComponent: FC<propsAverageComponent> = ({ total, average }) => {
  return (
    <div className="w-full flex flex-col items-center text-gray-500 py-6 gap-1 md:border-r border-gray-400">
      <h2 className="font-light text-5xl text-tertiary">
        {average?.toFixed(1) ?? 0}
      </h2>
      <RatingStars rating={average} size={"lg"} />
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
      <RatingStars rating={value} size={"lg"} />
    </div>
  );
};

export const UsersGalleryComponent: FC<{ images: imagesReviews[], set: CallableFunction }> = ({ images, set }) => {
  const Image: FC<imagesReviews> = ({ image, review }) => {
    return (
      <button onClick={() => set({ source: image, data: review })}>
        <div className="overflow-hidden w-full h-full rounded-lg relative mx-auto inset-x-0">
          <img
            alt={review?.user?.displayName ?? ""}
            src={image?.i320 ? createURL(image.i320) : "placeholder/image.png"}
            className="absolute w-full h-full object-cover object-center"
          />
        </div>
      </button>
    );
  };

  return (
    <>
      <div className="border-b border-gray-100">
        <p className="text-sm text-tertiary">Imagenes de clientes</p>
        <div className="grid grid-cols-4 w-full gap-2 h-48 pb-6 py-3">
          {images.slice(0, 4).map((item, idx) => (
            <Image key={idx} {...item} />
          ))}
        </div>
      </div>
    </>
  );
};

interface propsPreviewComponent {
  state: { data: review; source: image } | null;
  set: Dispatch<SetStateAction<{ data: review; source: image } | null>>;
  images: imagesReviews[];
}

export const PreviewComponent: FC<propsPreviewComponent> = ({
  state,
  set,
  images,
}) => {
  const [imagePrincipal, setImagePrincipal] = useState<image | undefined>(
    state?.source
  );
  const [viewGrid, setViewGrid] = useState(false);
  const handleClose = () => {
    set(null);
  };

  useEffect(() => {
    setImagePrincipal(state?.source);
  }, [state?.source]);

  useEffect(() => {
    setViewGrid(false);
  }, [state]);
  return (
    <div className="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-80 z-40 flex items-center justify-center ">
      <ClickAwayListener onClickAway={handleClose}>
        <div className="bg-white w-3/4 h-3/4 m-auto inset-0 relative rounded-2xl overflow-auto no-scrollbar">
          {/* HEADER */}

          {!viewGrid ? (
            <>
              <button
                className="text-gray-500 absolute top-5 right-10 w-fit h-fit"
                onClick={handleClose}
              >
                {<CloseIcon className="w-5 h-5" />}
              </button>
              <div className="grid grid-cols-2 h-full p-8 gap-5">
                <div className="overflow-hidden h-full">
                  <button
                    onClick={() => {
                      setViewGrid(true);
                    }}
                    className="flex items-center gap-1 text-sm hover:bg-color-base transition rounded-md p-2 w-max"
                  >
                    <ViewGrid className="w-5 h-5" />
                    <p>Ver todas las imagenes</p>
                  </button>

                  <img
                    className="w-full h-[91%] bg-gray-300 object-contain border object-center rounded-md overflow-hidden "
                    src={imagePrincipal ? createURL(imagePrincipal.i640) : ""}
                    alt={""}
                  />
                </div>

                <div className="no-scrollbar flex flex-col gap-4 h-full overflow-auto">
                  <div className="border-b border-color-base pb-4">
                    <div className="flex gap-2">
                      <img
                        className="object-cover w-10 h-10 rounded-full border border-gray-200"
                        src={
                          state?.data.user.photoURL ?? "/placeholder/logo.png"
                        }
                        alt={"2"}
                      />
                      <div className="flex flex-col items-start">
                        <h2 className="text-sm text-gray-700 capitalize">
                          {state?.data?.user?.displayName}
                        </h2>
                        <RatingStars
                          rating={state?.data?.average ?? 0}
                          size={"lg"}
                        />
                      </div>
                    </div>
                    {state?.data.createdAt && (
                      <small className="text-xs text-gray-400 -mt-3">
                        Opinion realizada el {format(state?.data.createdAt, "es", { dateStyle: "long" })}
                      </small>
                    )}
                  </div>
                  <h3 className="text-sm text-gray-700 font-semibold">
                    {state?.data.reference}
                  </h3>
                  <p className="text-xs min-h-40 h-full">
                    {state?.data.comment}
                  </p>
                  <div>
                    <h4 className="pb-1 text-sm font-bold text-gray-400 ">
                      Imagenes de esta reseña
                    </h4>
                    <div className="flex flex-wrap gap-2 ">
                      {state?.data.imgCarrusel.map((item) => (
                        <button
                          key={item?._id}
                          onClick={() => setImagePrincipal(item)}
                        >
                          <img
                            className="w-20 h-20 rounded object-cover object-center border"
                            src={
                              item?.i320
                                ? createURL(item.i320)
                                : "/placeholder/image.png"
                            }
                            alt={item?._id}
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="bg-color-base p-4 px-10 flex justify-between items-center">
                <h2 className="text-gray-700 font-bold">Galería de imagenes</h2>
                <button
                  className="text-gray-500  top-5 right-5 w-fit h-fit"
                  onClick={handleClose}
                >
                  {<CloseIcon className="w-5 h-5" />}
                </button>
              </div>
              <ViewGridComponent set={set} images={images} />
            </>
          )}
        </div>
      </ClickAwayListener>
    </div>
  );
};

export const ViewGridComponent: FC<{
  set: Dispatch<SetStateAction<{ data: review; source: image } | null>>;
  images: { image: image; review: review }[];
}> = ({ set, images }) => {
  return (
    <div className="grid grid-cols-6 gap-3 p-6">
      {images?.map((item, idx) => (
        <button
          key={idx}
          onClick={() => set({ data: item.review, source: item.image })}
        >
          <img
            className="w-40 h-40 mx-auto rounded object-cover object-center border"
            src={
              item?.image?.i320
                ? createURL(item.image.i320)
                : "/placeholder/image.png"
            }
            alt={item.image._id}
          />
        </button>
      ))}
    </div>
  );
};

interface propsCommentComponent extends review {
  setPreview: Dispatch<SetStateAction<{ data: review; source: image } | null>>;
}
const CommentComponent: FC<propsCommentComponent> = ({
  setPreview,
  ...props
}) => {
  const {
    average,
    user,
    reference,
    comment,
    answer,
    createdAt,
    children,
    imgCarrusel,
  } = props;

  const [viewAnswer, setViewAnswer] = useState(false);
  const { user: userLogin } = AuthContextProvider();

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
    <>
      <div className={`flex items-center w-full h-full overflow-hidden relative `}>
        <img
          src={user?.photoURL ?? "/placeholder/user.png"}
          className="relative w-full h-full object-cover object-center w-[4rem] h-[4rem] rounded-full"
          alt={user?.displayName ?? ""}
        />
        {/* <RatingAndRole /> */}
        <div className="px-6 pt-3 flex flex-col w-full">
          <div className="w-full flex justify-between items-center">
            <div className="flex items-start flex-col justify-start text-gray-300">
              <p className="font-medium text-primary font-bold text-sm pl-1">
                {user?.displayName}
              </p>
              <div className="flex flex-col items-start md:flex-row md:items-center gap-2">
                <RatingStars rating={Math.ceil(average)} size={"lg"} />
                <p className="hidden md:block text-xs text-gray-500 pl-1">
                  {reference}
                </p>
              </div>
            </div>

            {createdAt && (
              <small className="text-gray-400 text-xs">
                {getRelativeTime(createdAt)}
              </small>
            )}
          </div>
          <p className="text-gray-500 text-sm text-justify text-xs pl-1 pt-2">
            {comment}

            <div className="flex items-center justify-end pb-2">
              {answer && (
                <button
                  onClick={() => setViewAnswer(!viewAnswer)}
                  className={`text-xs ${viewAnswer
                    ? "bg-primary text-white"
                    : "bg-white text-primary"
                    }  w-max px-3 py-1 rounded-md hover:bg-gray-500 hover:text-white transition`}
                >
                  Ver respuesta de Jaihom
                </button>
              )}
            </div>
          </p>
          {viewAnswer && <ListingAnswer />}
        </div>
        {children}
      </div>
      <div className="flex flex-wrap w-full gap-2 -mt-4 pb-2">
        {imgCarrusel.map((item) => (
          <button
            key={item?._id}
            onClick={() => setPreview({ data: props, source: item })}
          >
            <img
              src={createURL(item?.i320)}
              className={
                "w-20 h-20 object-center object-cover border rounded-md"
              }
              alt={""}
            />
          </button>
        ))}
      </div>
    </>
  );
};
