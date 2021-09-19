import React from "react";
import { useHistory } from "react-router-dom";
import { useAuthContext } from "~/providers/AuthProvider";
import { FormData } from "~/containers/SignUpForm";

export const useHook = () => {
  const history = useHistory();
  const authContext = useAuthContext();

  const handleSubmitForm = React.useCallback(
    (data: FormData) => {
      if (authContext.isSignedIn) return;

      const { signUp } = authContext;
      signUp(data).then(() => {
        history.push("/");
      });
    },
    [authContext, history],
  );

  return { handleSubmitForm } as const;
};
