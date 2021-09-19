import { SchemaModel, Schema } from "@app/schema";
import React from "react";
import { getAuthMe } from "~/api/v1/auth/me";
import { postSignIn } from "~/api/v1/auth/signIn";
import { deleteSignOut } from "~/api/v1/auth/signOut";
import { postSignUp } from "~/api/v1/auth/signUp";

export type SignUpProps = Schema.PostAuthSignUp["requestBody"];

export type SignInProps = Schema.PostAuthSignIn["requestBody"];

type State =
  | {
      isLoading: true;
    }
  | {
      isLoading: false;
      isSignedIn: false;
    }
  | {
      isLoading: false;
      isSignedIn: true;
      currentUser: SchemaModel.User;
    };

type Context =
  | {
      isSignedIn: false;
      signIn: (props: SignInProps) => Promise<void>;
      signUp: (props: SignUpProps) => Promise<void>;
    }
  | {
      isSignedIn: true;
      currentUser: SchemaModel.User;
      signOut: () => Promise<void>;
    };

const defaultContext: Context = {
  isSignedIn: false,
  signIn: () => Promise.resolve(),
  signUp: () => Promise.resolve(),
};

const AuthContext = React.createContext<Context>(defaultContext);

const useHook = (): { isLoading: true } | ({ isLoading: false } & Context) => {
  const [state, setState] = React.useState<State>({ isLoading: true });

  const signIn = React.useCallback(
    (props: SignInProps) =>
      postSignIn(props).then(({ user: currentUser }) => {
        setState({
          isLoading: false,
          isSignedIn: true,
          currentUser,
        });
      }),
    [],
  );

  const signUp = React.useCallback(
    (props: SignUpProps) =>
      postSignUp(props).then(({ user: currentUser }) => {
        setState({
          isLoading: false,
          isSignedIn: true,
          currentUser,
        });
      }),
    [],
  );

  const signOut = React.useCallback(
    () =>
      deleteSignOut().then(() => {
        setState({
          isLoading: false,
          isSignedIn: false,
        });
      }),
    [],
  );

  React.useEffect(() => {
    getAuthMe()
      .then(({ user: currentUser }) => {
        setState({
          isLoading: false,
          isSignedIn: true,
          currentUser,
        });
      })
      .catch(() => {
        setState({
          isLoading: false,
          isSignedIn: false,
        });
      });
  }, []);

  if (state.isLoading) return { isLoading: true };

  return state.isSignedIn && state.currentUser
    ? {
        isLoading: false,
        isSignedIn: true,
        currentUser: state.currentUser,
        signOut,
      }
    : {
        isLoading: false,
        isSignedIn: false,
        signUp,
        signIn,
      };
};

export const AuthProvider: React.FC = ({ children }) => {
  const hookValue = useHook();

  if (hookValue.isLoading) {
    return <div>loading...</div>;
  } else {
    const { isLoading, ...contextValue } = hookValue;

    return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
  }
};

export const useAuthContext = () => React.useContext(AuthContext);
