import {
  createContext,
  FC,
  Dispatch,
  useContext,
  useReducer,
  Reducer,
  useState,
  useEffect,
} from "react";
import { fetchApi, queries } from "../utils/Fetching";

interface filtersActived {
  total: number;
  filters: filter;
  valir: string | null;
}

interface filter {
  coordinates?: number[] | undefined;
  cities?: string[];
  characteristics?: string[]
}
interface localities {
  total: number | null;
  results: {
    total: number,
    location: string[]
  } | null
}

enum actions {
  ADD_FILTER,
  RESET_FILTER,
  ADD_CITY,
  REMOVE_CITY,
  ADD_CHARACTERISTIC,
  REMOVE_CHARACTERISTIC,
  ADD_VALIR,
  RESET_VALIR,
}

type action = {
  type: keyof typeof actions;
  payload: any;
};

type Context = {
  localities: any;
  setLocalities: Dispatch<action> | any;
  filters: filtersActived;
  setFilters: Dispatch<action>;
};

const initialContext: Context = {
  localities: {
    total: null,
    results: null
  },
  setLocalities: () => null,
  filters: {
    total: 0,
    filters: {},
    valir: null,
  },
  setFilters: () => null,
};

const FiltersContext = createContext<Context>(initialContext);



const reducerFilters: any = (
  state: filtersActived,
  { type, payload }: action
) => {
  if (type === "ADD_FILTER") {
    //console.log("ADD_FILTER", payload)
    const salida = {
      total: 0,
      filters: { ...state?.filters, ...payload },
    }
    return salida;
  }

  if (type === "ADD_VALIR") {
    //console.log("ADD_VALIR", payload)
    const salida = {
      total: 0,
      filters: {},
      valir: payload,
    }
    return salida;
  }

  if (type === "RESET_VALIR") {
    //console.log("RESET_VALIR", payload)
    const salida = {
      total: 0,
      filters: {},
      valir: null,
    }
    return salida;
  }

  if (type === "RESET_FILTER") {
    if (typeof payload === "object" && payload?.lenght > 0) {
      const newState: any = { ...state.filters };
      for (const key in payload) {
        newState[key] && delete newState[key];
      }
      const salida = {
        total: Object.values(newState).length,
        filters: newState,
      }
      //console.log("RESET_FILTER", salida)
      return salida;
    } else {
      const salida = initialContext.filters
      //console.log("RESET_FILTER1", salida)
      return salida;
    }
  }

  if (type === "ADD_CITY") {
    if (state?.filters?.cities) {
      const salida = {
        ...state,
        total: state.total + 1,
        filters: {
          ...state.filters,
          cities: [...state?.filters?.cities, payload],
        },
      }
      return salida;
    } else {
      const salida = {
        ...state,
        total: state.total + 1,
        filters: {
          ...state.filters,
          cities: [payload],
        },
      }
      return salida;
    }
  }
  if (type === "REMOVE_CITY") {
    console.log(1256789, "remove_city")
    let instance = state?.filters?.cities;
    if (payload === "city") {
      const newState = { ...state }
      delete newState.filters.cities
      return newState
    } else {
      if (instance && instance?.length > 0) {
        const salida = {
          ...state,
          total: state.total - 1,
          filters: {
            ...state?.filters,
            cities: state?.filters.cities?.filter(
              (item) => item !== payload
            ),
          },
        }
        if (salida?.filters?.cities?.length === 0) {
          delete salida?.filters?.cities
        }
        return salida;
      } else {
        const newState = { ...state }
        delete newState.filters.cities
        return newState
      }
    }

  }

  if (type === "ADD_CHARACTERISTIC") {
    if (state?.filters?.characteristics) {
      const salida = {
        ...state,
        total: state.total + 1,
        filters: {
          ...state.filters,
          characteristics: [...state?.filters?.characteristics, payload],
        },
      }
      return salida;
    } else {
      const salida = {
        ...state,
        total: state.total + 1,
        filters: {
          ...state.filters,
          characteristics: [payload],
        },
      }
      return salida;
    }
  }

  if (type === "REMOVE_CHARACTERISTIC") {
    let instance = state?.filters?.characteristics;
    if (payload === "city") {
      const newState = { ...state }
      delete newState.filters.cities
      return newState
    } else {
      if (instance && instance?.length > 0) {
        const salida = {
          ...state,
          total: state.total - 1,
          filters: {
            ...state?.filters,
            characteristics: state?.filters.characteristics?.filter(
              (item) => item !== payload
            ),
          },
        }
        if (salida?.filters?.characteristics?.length === 0) {
          delete salida?.filters?.characteristics
        }
        return salida;
      } else {
        const newState = { ...state }
        delete newState.filters.characteristics
        return newState
      }
    }

  }
};

const FiltersProvider: FC = ({ children }): JSX.Element => {
  const [filters, setFilters] = useReducer<Reducer<filtersActived, action>>(
    reducerFilters,
    initialContext.filters
  );
  const [localities, setLocalities] = useState()
  // useEffect(() => {
  //   if (!localities) {
  //     (async () => {
  //       const { results } = await fetchApi({ query: queries.getAllLocalities });
  //       console.log(123, results)
  //       setLocalities(results)
  //     })()
  //   }
  // }, [filters, localities])

  return (
    <FiltersContext.Provider value={{ filters, setFilters, localities, setLocalities }}>
      {children}
    </FiltersContext.Provider>
  );
};

const FiltersContextProvider = () => useContext(FiltersContext);

export { FiltersProvider, FiltersContextProvider };
