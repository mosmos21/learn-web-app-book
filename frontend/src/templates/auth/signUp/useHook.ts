import React from "react";
import { useHistory } from "react-router-dom";
import { FormData } from "~/containers/SignUpForm";
import { useAuthContext } from "~/providers/AuthProvider";
import { getErrorMessage } from "~/utils/getErrorMessage";
import { useSnackbarContext } from "~/providers/SnackbarProvider";

export const useHook = () => {
  const history = useHistory();
  const authContext = useAuthContext();
  const { showSnackbar } = useSnackbarContext();

  const handleSubmitForm = React.useCallback(
    async (data: FormData) => {
      try {
        if (authContext.isSignedIn) return;

        await authContext.signUp(data);
        history.push("");
      } catch (err) {
        if (err instanceof Response && err.status === 401) {
          showSnackbar(await getErrorMessage(err), "error");
        }
      }
    },
    [authContext, history],
  );

  return { handleSubmitForm } as const;
};
