import { useCallback, useReducer } from "react";

type Action =
  | { type: "LOADING" }
  | { type: "SUCCESS"; payload: string }
  | { type: "FAILED"; payload: string };

type State = {
  loading: boolean;
  success: boolean;
  message: string;
};

const initialState: State = {
  loading: false,
  success: false,
  message: "",
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "LOADING":
      return { ...state, loading: true };
    case "SUCCESS":
      return {
        ...state,
        loading: false,
        success: true,
        message: action.payload,
      };
    case "FAILED":
      return {
        ...state,
        loading: false,
        success: false,
        message: action.payload,
      };
    default:
      return state;
  }
};

export type UseReqResReturn = {
  setLoading: () => void;
  setSuccess: (args: { message: string }) => void;
  setError: (args: { message: string }) => void;
} & State;

export const useReqRes = (): UseReqResReturn => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const setLoading = useCallback(() => dispatch({ type: "LOADING" }), []);

  const setSuccess = useCallback(
    ({ message }: { message: string }) =>
      dispatch({ type: "SUCCESS", payload: message }),
    []
  );

  const setError = useCallback(
    ({ message }: { message: string }) =>
      dispatch({ type: "FAILED", payload: message }),
    []
  );

  return { setLoading, setSuccess, setError, ...state };
};
