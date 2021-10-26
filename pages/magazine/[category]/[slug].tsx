import { Markup } from "interweave";
import { GetStaticPaths, GetStaticProps } from "next";
import {
  Banner,
  ShareComponent,
  TagsComponent,
} from "../../../components/Article";
import { TagIcon } from "../../../components/Icons/TagIcon";
import { RelatedArticles, AsideLastestArticles, SuscribeComponent } from "../../../components/Magazine";
import { BreadCumbs, DisqusComponent } from "../../../components/Surface";
import { Searcher } from "../../index";

const Article = () => {
  const tags = [
    "bodas en tendencia",
    "bodas",
    "post-covid",
    "catering para bodas",
    "Cómo organizar una boda",
    "decoración de bodas",
    "organizar la boda",
  ];
  return (
    <section className="w-full flex flex-col items-center ">
      <div className="max-w-screen-lg mx-auto inset-x-0 px-5 md:px-0">
        <BreadCumbs />
        <Banner />
        <div className="grid md:grid-cols-3 w-full gap-6 py-8">
          <div className="md:col-span-2 bg-white  rounded-xl p-8 grid grid-cols-6">
            <TagsComponent />
            <ShareComponent />
            <div className="w-full col-span-6 text-sm pt-8 ">
              <Markup content={text} />
              <div className="flex items-center flex-wrap gap-2 ">
                <TagIcon className="text-primary w-6 h-6" />
                {tags?.map((item, idx) => (
                  <a key={idx} className="text-xs text-gray-200">
                    #{}
                  </a>
                ))}
              </div>
            </div>
            <div className="col-span-6 pt-8">
              <DisqusComponent />
            </div>
          </div>

          <aside className="hidden md:flex col-span-1 flex-col gap-8 mt-10">
            <Searcher placeholder="¿Que buscas?" />
            <AsideLastestArticles title={"lo más leido"} />
          </aside>
        </div>
      <RelatedArticles title={"Lee más sobre Pedir Matrimonio"} />
      </div>
      <SuscribeComponent />
    </section>
  );
};

export default Article;

export const getStaticProps: GetStaticProps = async ({ params }: any) => {
  console.log(params);
  return {
    props: {},
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [
      {
        params: {
          category: "Antes-de-la-boda",
          slug: "15-formas-super-romanticas-de-pedir-matrimonio-¡La-5-os-sorprendera!",
        },
      },
      { params: { category: "2", slug: "nuevo2" } },
    ],
    fallback: false,
  };
};

const text = `Seguro que te has imaginado una y mil veces cómo te pedirán matrimonio. Antes del “sí, quiero”, ese momento en el que tu chico te mira a los ojos y te dice que quiere pasar toda la vida contigo es uno de los más felices y emocionantes que vivirás en tu vida. Por ello, todas hemos fantaseado alguna vez con lo bonito que sería que sucediese de una u otra forma, y en todas ellas el romanticismo suele ser un elemento clave.

Te traemos un listado con las formas más románticas de pedir matrimonio… ¿Cuál elegirías tú?

Con un flashmob
Es una de las formas que más de moda se ha puesto en los últimos años pero… ¡nos encanta! No importa si es buen bailarín o no, como en otros muchos campos, aquí la intención es lo que cuenta. ¡Casi imposible decir que no!



Pedida de mano en la playa 
Es uno de los clásicos de las propuestas románticas. Que tu chico se arrodille ante ti mientras paseáis por la playa bajo las estrellas y la luz de la luna y saque un anillo personalizado y hecho a medida de Eme jewels, una firma de joyería completamente artesanal y cien por cien hecha a mano en España. ¡Será una experiencia mágica que todas hemos soñado con vivir! Además, esta joyería cuida al detalle la selección de piedras y metales preciosos para la creación de cada una de sus joyas. Encontrarás, desde modelos de ediciones limitadas hasta su colección de “básicos” y su especial atención a los elementos marinos.

Y, por supuesto, para una pedida de mano perfecta, no puedes dejar de ver los 61 anillos de compromiso con los que tu pareja dirá “sí quiero”.

De viaje 
Un viaje a tu destino favorito o esa ciudad a la que siempre quisiste ir es la mejor excusa para que se arrodille y te pida matrimonio. Será un viaje que tendrás que planear al detalle, ya que no hay posibilidad de que algo salga mal o de dejar algún cabo suelto. Descubre los 6 mejores lugares para pedir matrimonio.

Un viaje a tu destino favorito o esa ciudad a la que siempre quisiste ir es la mejor excusa para que se arrodille y te pida matrimonio. Será un viaje que tendrás que planear al detalle, ya que no hay posibilidad de que algo salga mal o de dejar algún cabo suelto. Descubre los 6 mejores lugares para pedir matrimonio.

Un viaje a tu destino favorito o esa ciudad a la que siempre quisiste ir es la mejor excusa para que se arrodille y te pida matrimonio. Será un viaje que tendrás que planear al detalle, ya que no hay posibilidad de que algo salga mal o de dejar algún cabo suelto. Descubre los 6 mejores lugares para pedir matrimonio.

Un viaje a tu destino favorito o esa ciudad a la que siempre quisiste ir es la mejor excusa para que se arrodille y te pida matrimonio. Será un viaje que tendrás que planear al detalle, ya que no hay posibilidad de que algo salga mal o de dejar algún cabo suelto. Descubre los 6 mejores lugares para pedir matrimonio.



`;
