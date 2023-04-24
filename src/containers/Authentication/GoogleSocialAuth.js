import React from "react";
import { AuthContext } from "contexts/auth/auth.context";
import UserContext from "contexts/user/user.provider";
import { useAlert } from "react-alert";
import { useHistory } from "react-router-dom";
import { storeLoginDetails } from "utils";
import { TypedGoogleAuthMutation } from "graphql/mutations";
import { maybe } from "core/utils";
//import { normalizeErrors } from "helpers";
import { logToConsole } from "utils/logging";
import GoogleRequestTokenOrCode from "@GoogleLogin/GoogleRequestTokenOrCode";

function GoogleSocialAuth() {
  const { authDispatch } = React.useContext(AuthContext);
  const { setRefetchUser } = React.useContext(UserContext);

  const [isLoading, setIsLoading] = React.useState(false);

  const history = useHistory();
  const alert = useAlert();

  return (
    <TypedGoogleAuthMutation>
      {(googleAuthLogin, { loading }) => {
        const googleLogin = async (googleCallback) => {
          setIsLoading(true);
          if (googleCallback.error) {
            logToConsole(googleCallback.error);
            setIsLoading(false);
          } else
            googleAuthLogin({
              variables: {
                accessToken: googleCallback?.access_token ?? "",
                code: googleCallback?.code ?? "",
              },
            })
              .then(({ data }) => {
                console.log("data", data);
                const successful = maybe(() => data.googleSocialLogin.success);
                if (successful) {
                  alert.show(
                    {
                      title: "Login Successful",
                    },
                    { type: "success", timeout: 5000 },
                  );

                  const oAuthData = {
                    tokenAuth: data.googleSocialLogin,
                  };

                  setRefetchUser((curr) => !curr);
                  storeLoginDetails(
                    successful,
                    history,
                    oAuthData,
                    null,
                    null,
                    "login",
                    "gOAuth",
                  );
                  setIsLoading(true);
                  authDispatch({
                    type: "LOGIN_SUCCESS",
                  });
                  console.log("About to redirect");
                  history.push("/dashboard");
                } else {
                  //const nonFieldErr = normalizeErrors(
                  //  maybe(() => data.tokenAuth.errors, []),
                  //);
                  alert.show(
                    {
                      title:
                        "You already registered with email and password - Please log in with your email and password",
                    },
                    { type: "error", timeout: 5000 },
                  );
                  setIsLoading(false);
                  console.log(data.tokenAuth.errors);
                }
                setIsLoading(false);
              })
              .catch((e) => {
                setIsLoading(false);
                console.log(e);
                logToConsole(e);
              });

          setIsLoading(false);
        };
        return (
          <GoogleRequestTokenOrCode
            callbackFn={googleLogin}
            isLoading={isLoading}
          />
        );
      }}
    </TypedGoogleAuthMutation>
  );
}

export default GoogleSocialAuth;
