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
  },
  setFilters: () => null,
};

const FiltersContext = createContext<Context>(initialContext);

const reducerFilters: any = (
  state: filtersActived,
  { type, payload }: action
) => {
  if (type === "ADD_FILTER") {
    return {
      total: 1,
      filters: { ...state?.filters, ...payload },
    };
  }

  if (type === "RESET_FILTER") {
    if (typeof payload === "object" && payload?.lenght > 0) {
      const newState: any = { ...state.filters };
      for (const key in payload) {
        newState[key] && delete newState[key];
      }
      return {
        total: Object.values(newState).length,
        filters: newState,
      };
    } else {
      return initialContext.filters;
    }
  }

  if (type === "ADD_CHARACTERISTIC") {
    if (state?.filters?.characteristics) {
      return {
        ...state,
        filters: {
          characteristics:[...state?.filters?.characteristics, payload],
        },
      };
    } else {
      console.log(payload);
      return {
        ...state,
        filters: {
          characteristics: [payload],
        
        },
      };
    }
  }

  if (type === "REMOVE_CHARACTERISTIC") {
    let instance = state?.filters?.characteristics;
    if (instance && instance?.length > 1) {
      return {
        ...state,
        filters: {
          ...state?.filters,
          characteristics:  state?.filters.characteristics?.filter(
              (item) => item !== payload
              ),
          },
        };
      } else {
      const newState = {...state}
      delete newState.filters.characteristics
      return newState
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
