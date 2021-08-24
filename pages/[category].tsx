import { GetStaticPaths } from "next"
import Link from "next/link"
import { ReactNode, memo, useState, FC } from "react"
import CardBusiness from "../components/Category/CardBusiness"
import { AireLibreIcon, ArrowIcon, CheckIconFill, EnLaCiudadIcon, LocationIcon, PlayaIcon } from "../components/icons"
import RangeComponent from "../components/RangeComponent"
import useHover from "../hooks/useHover"


const Category: FC = () => {

    const List = [
        { title: "En la playa", icon: <PlayaIcon /> },
        { title: "Al aire libre", icon: <AireLibreIcon /> },
        { title: "En la ciudad", icon: <EnLaCiudadIcon /> },
    ]

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
    ]

    return (
        <section className="flex flex-col gap-10">
            <div>
                <div className="bg-gray-100 w-full h-64 transform -mt-20 z-10" />
                <div className="bg-white rounded-lg max-w-screen-2xl mx-auto inset-x-0 flex flex-col items-center justify-center gap-1 py-10 relative">
                    <div className="w-full flex items-center justify-between absolute top-0 transform -translate-y-1/2 px-10">
                        {/* {categories.map((item: any) => (
                        <ItemCategory key={item.id} title={item?.category} route={`/${item?.category}`} />
                    ))} */}
                    </div>
                    <h1 className="font-semibold text-primary text-2xl">Lugares para bodas</h1>
                    <h3 className="font-medium text-gray-200 text-md">¿Dónde imaginás la boda de tu sueños?</h3>
                </div>
            </div>
            <div className="xl:max-w-screen-lg 2xl:max-w-screen-xl mx-auto inset-x-0 grid md:grid-cols-7 2xl:grid-cols-5 w-full">
                <div className="md:col-span-2 2xl:col-span-1 bg-white h-max w-full rounded-lg shadow">
                    <BlockFilter>
                        <p className="text-gray-200 font-medium">Filtrar por</p>
                    </BlockFilter>
                    <ActivedFilters />
                    <LocationFilter />
                    <EventType title="Tipo de boda" list={List} />
                    <RangeFilter title={"Capacidad del banquete"} min={0} max={100} />
                    <RangeFilter title={"Capacidad del cóctel"} min={0} max={100} />
                    <RangeFilter title={"Hora de cierre"} min={0} max={24} />
                    <ListFilter title={"Instalaciones"} list={ListF} />
                </div>
                <div className="md:col-span-5 2xl:col-span-4">
                    <div className="flex items-center justify-end gap-4 px-5">
                        <h2>Destacado</h2>
                        <h2>Promociones</h2>
                    </div>
                    <div className="grid md:grid-cols-2 2xl:grid-cols-3 gap-10 pl-10 py-10">
                        <CardBusiness promocion={true} />
                        <CardBusiness />
                        <CardBusiness />
                        <CardBusiness />
                        <CardBusiness />
                        <CardBusiness />
                    </div>

                </div>
            </div>
        </section>
    )
}

export default Category

interface propItemCategory {
    title: string,
    route: string
}
const ItemCategory: FC<propItemCategory> = memo(({ title, route }) => {
    return (
        <Link href={route}>
            <button className="bg-white rounded-full w-28 h-28 border border-primary flex items-center justify-center text-center text-sm text-primary capitalize hover:bg-primary hover:text-white transition duration-400">
                {title}
            </button>
        </Link>
    )
})

export const getStaticProps = async ({ params }: any) => {
    console.log(params)
    return {
        props: {

        }
    };
};


export const getStaticPaths: GetStaticPaths = async () => {

    const request = {
        query: `query {
            businessCategories {
              id
              category
              business_macrocategories {
                category
              }
            }
          }`,
        variables: {},
    }

    //     try {
    //         const {data} = await api.graphql(request)
    //         const ArrCategories = data?.data?.businessCategories
    //         return {
    //             paths: ArrCategories.map((category : any) => {
    //                 return {
    //                     params: category
    //                 }
    //             }),
    //             fallback: false
    //         }
    //     } catch (error) {
    //         console.log(error)
    //         return {paths: [], fallback : false}
    //     }

    return {
        paths: [
            { params: { category: "1" } },
            { params: { category: "2" } }
        ],
        fallback: false
    }
}


const BlockFilter = ({ children, className }: any) => {
    return (
        <div className={`py-4 px-6 border-b border-base ${className}`}>
            {children}
        </div>
    )
}

const ActivedFilters = () => {
    return (
        <BlockFilter className="flex items-center justify-between gap-2">
            <span className="flex items-center gap-2">
                <p className="text-sm text-gray-200">Filtros activos</p>
                <span className="rounded-full border border-primary text-xs text-primary w-6 h-6 flex items-center justify-center">10</span>
            </span>
            <button className="px-2 w-max border border-primary focus:outline-none bg-white text-primary text-xs rounded-full py-1 hover:text-white hover:bg-primary transition">Limpiar</button>
        </BlockFilter>
    )
}

interface propsAccordion {
    title: string,
    children: any
}
const Accordion: FC<propsAccordion> = ({ title, children }: any) => {
    const [show, setShow] = useState(true)
    return (
        <BlockFilter className={`flex flex-col ${show ? "gap-4" : ""}`}>
            <div className="flex justify-between w-full items-center">
                <h2 className="text-sm font-semibold text-primary capitalize">{title}</h2>
                <span onClick={() => setShow(!show)} >
                    <ArrowIcon className="text-primary cursor-pointer hover:opacity-90 transition transform hover:scale-110 " />
                </span>
            </div>
            <div className={`relative w-full overflow-hidden  ${show ? "max-h-full" : "max-h-0"}`}>
                {children}
            </div>
        </BlockFilter>
    )
}

const LocationFilter = () => {
    return (
        <Accordion title="Localidad">
            <LocationIcon className="text-primary absolute w-4 h-4 inset-y-0 my-auto left-5" />
            <input className="w-full bg-base rounded-full h-10 focus:outline-none pl-10 text-sm text-gray-200" />
        </Accordion>
    )
}

interface propsEventType {
    title: string, list: { icon: ReactNode, title: string }[]
}

const EventType: FC<propsEventType> = ({ title, list }) => {
    const [selected, setSelect] = useState<number>()
    return (
        <Accordion title={title}>
            <div className="w-full grid grid-cols-3 gap-2">
                {list.map((item: { title: string, icon: ReactNode }, idx: number) => (
                    <div key={idx} className="w-full flex items-center justify-center flex-col">
                        <button onClick={() => setSelect(idx)} className={`${selected === idx ? "text-primary" : "text-gray-200"} text-xs flex items-center justify-center  flex-col  gap-2 focus:outline-none cursor-pointer transition hover:text-primary `}>
                            {item.icon}
                            {item.title}
                        </button>
                    </div>
                ))}
            </div>
        </Accordion>
    )
}

interface propsRangeFilter {
    title: string, min: number, max: number
}

const RangeFilter: FC<propsRangeFilter> = ({ title, min, max }) => {
    return (
        <Accordion title={title}>
            <div className="py-4 px-4">
                <RangeComponent min={min} max={max} />

            </div>
        </Accordion>
    )
}


interface propsListFilter {
    title: string,
    list: { title: string }[]
}

const ListFilter: FC<propsListFilter> = ({ title, list }) => {
    const [checked, setCheck] = useState<number[]>([])

    const ActiveFilter = (idx: number) => {
        if (!checked.includes(idx)) {
            setCheck(old => [...old, idx])
        } else {
            setCheck(old => old.filter(item => item !== idx))
        }
    }

    const ItemList = ({ idx, item }: any) => {
        const [hoverRef, isHovered] = useHover()
        return (
            <li ref={hoverRef} className="text-gray-200 text-sm flex items-center gap-2 cursor-pointer" onClick={() => ActiveFilter(idx)}>
                {checked.includes(idx) || isHovered ? <CheckIconFill className="w-4 h-4" /> : <div className="w-4 h-4 border border-gray-200 rounded-full" />}
                {item.title}
            </li>
        )
    }
    return (
        <Accordion title={title}>
            <ul className="flex flex-col gap-2">
                {list.map((item: any, idx: number) => (
                    <ItemList key={idx} idx={idx} item={item} />
                ))}
            </ul>
        </Accordion>
    )
}

