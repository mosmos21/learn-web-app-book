import React from "react";
import { Alert, Snackbar } from "@mui/material";

type SnackbarType = "info" | "error";

type State = {
  isOpen: boolean;
  message: string;
  type: SnackbarType;
};

const defaultState: State = {
  isOpen: false,
  message: "",
  type: "info",
};

type Context = {
  showSnackbar: (message: string, type?: SnackbarType) => void;
};

const defaultContext: Context = {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  showSnackbar: () => {},
};

const AUTO_HIDDEN_DURATION = 5000;

const SnackbarContext = React.createContext<Context>(defaultContext);

const useHook = () => {
  const [state, setState] = React.useState<State>(defaultState);

  const showSnackbar = React.useCallback((message: string, type: SnackbarType = "info") => {
    setState({ isOpen: true, message, type });
    setTimeout(() => setState(defaultState), AUTO_HIDDEN_DURATION);
  }, []);

  return { state, showSnackbar } as const;
};

export const SnackbarProvider: React.FC = ({ children }) => {
  const { state, showSnackbar } = useHook();

  return (
    <SnackbarContext.Provider value={{ showSnackbar }}>
      <Snackbar open={state.isOpen} autoHideDuration={AUTO_HIDDEN_DURATION}>
        <Alert severity={state.type} sx={{ width: "100%" }}>
          {state.message}
        </Alert>
      </Snackbar>
      {children}
    </SnackbarContext.Provider>
  );
};

export const useSnackbarContext = () => React.useContext(SnackbarContext);
