import { useReducer, Reducer } from "react";

enum actions {
  CLOSE,
  OPEN,
  TOGGLE,
}

type action = {
  type: keyof typeof actions;
  payload: any;
};

const reducer = (state: any, action: any) => {
  switch (action.type) {
    case "CLOSE":
      return false;
      break;

    case "OPEN":
      return true;
      break;
    case "TOGGLE":
      return !state;
      break;
    default:
      return state;
      break;
  }
};

export const useDisclosure = () => {
  const [isOpen, setOpen] = useReducer<Reducer<boolean, action>>(
    reducer,
    false
  );
  const onClose = () => {
    setOpen({ type: "CLOSE", payload: {} });
  };
  const onOpen = () => {
    setOpen({ type: "OPEN", payload: {} });
  };
  const onToggle = () => {
    setOpen({ type: "TOGGLE", payload: {} });
  };

  return { isOpen, onClose, onOpen, onToggle };
};
