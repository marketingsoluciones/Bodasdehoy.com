import {
  createContext,
  FC,
  Dispatch,
  useContext,
  useReducer,
  Reducer,
} from "react";

interface filtersActived {
  total: number;
  filters: filter;
  valir: string | null;
}

interface filter {
  coordinates?: number[] | undefined;
  city?: string;
  characteristics?: string[]
}

enum actions {
  ADD_FILTER,
  RESET_FILTER,
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
  filters: filtersActived;
  setFilters: Dispatch<action>;
};

const initialContext: Context = {
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

  if (type === "ADD_CHARACTERISTIC") {
    if (state?.filters?.characteristics) {
      const salida = {
        ...state,
        total: state.total + 1,
        filters: {
          characteristics: [...state?.filters?.characteristics, payload],
        },
      }
      //console.log("ADD_CHARACTERISTIC1", payload, salida)
      return salida;
    } else {
      //console.log(payload);
      const salida = {
        ...state,
        total: state.total + 1,
        filters: {
          characteristics: [payload],
        },
      }
      //console.log("ADD_CHARACTERISTIC2", payload, salida)
      return salida;
    }
  }

  if (type === "REMOVE_CHARACTERISTIC") {
    let instance = state?.filters?.characteristics;
    if (payload === "city") {
      const newState = { ...state }
      delete newState.filters.city
      //console.log("REMOVE_CHARACTERISTIC1", payload, newState)
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
        //console.log("REMOVE_CHARACTERISTIC2", payload, salida)
        return salida;
      } else {
        const newState = { ...state }
        delete newState.filters.characteristics
        //console.log("REMOVE_CHARACTERISTIC3", payload, newState)
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

  return (
    <FiltersContext.Provider value={{ filters, setFilters }}>
      {children}
    </FiltersContext.Provider>
  );
};

const FiltersContextProvider = () => useContext(FiltersContext);

export { FiltersProvider, FiltersContextProvider };
