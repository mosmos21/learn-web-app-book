import React from "react";
import { User } from "~/util/schema";
import { getAuthMe } from "~/api/v1/auth/me";
import { postSignUp } from "~/api/v1/auth/sign_up";
import { postSignIn } from "~/api/v1/auth/sign_in";
import { deleteSignOut } from "~/api/v1/auth/sign_out";

type AuthProps = {
  loginId: string,
  password: string
}

type State = {
  isLoading: true
} | {
  isLoading: false,
  isSignedIn: false,
} | {
  isLoading: false,
  isSignedIn: true,
  currentUser: User
}

type Context
  = {
    isSignedIn: false,
    signIn: (props: AuthProps) => Promise<void>;
    signUp: (props: AuthProps) => Promise<void>;
  } | {
    isSignedIn: true,
    currentUser: User,
    signOut: () => Promise<void>;
  }

const defaultContext: Context = {
  isSignedIn: false,
  signIn: () => Promise.resolve(),
  signUp: () => Promise.resolve(),
}

const AuthContext = React.createContext<Context>(defaultContext);

const useHook = (): { isLoading: true } | { isLoading: false } & Context => {
  const [state, setState] = React.useState<State>({ isLoading: true });

  const signIn = React.useCallback((props: AuthProps) =>
    postSignIn(props).then((currentUser) => {
      setState({
        isLoading: false,
        isSignedIn: true,
        currentUser
      });
    }),
    []);

  const signUp = React.useCallback((props: AuthProps) =>
    postSignUp(props).then((currentUser) => {
      setState({
        isLoading: false,
        isSignedIn: true,
        currentUser
      });
    }),
    []);

  const signOut = React.useCallback(() =>
    deleteSignOut().then(() => {
      setState({
        isLoading: false,
        isSignedIn: false,
      })
    }),
    []);

  React.useEffect(() => {
    getAuthMe().then((currentUser) => {
      setState({
        isLoading: false,
        isSignedIn: true,
        currentUser
      });
    }).catch(() => {
      setState({
        isLoading: false,
        isSignedIn: false
      })
    });
  }, []);

  if (state.isLoading) return { isLoading: true }

  return state.isSignedIn && state.currentUser
    ? {
      isLoading: false,
      isSignedIn: true,
      currentUser: state.currentUser,
      signOut,
    } : {
      isLoading: false,
      isSignedIn: false,
      signUp,
      signIn
    };
};

export const AuthProvider: React.FC = ({
  children
}) => {
  const hookValue = useHook();

  if (hookValue.isLoading) {
    return (
      <div>
        loading...
      </div>
    );
  } else {
    const { isLoading, ...contextValue } = hookValue;

    return (
      <AuthContext.Provider value={contextValue}>
        {children}
      </AuthContext.Provider>
    );
  }
}

export const useAuthContext = () => React.useContext(AuthContext);
