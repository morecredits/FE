import React from "react";
import Button from "components/Button/Button";
import useGoogleLogin from "./hooks/useGoogleLogin";
import { Google } from "components/AllSvgIcon";

const GoogleRequestTokenOrCode = ({ callbackFn, isLoading }) => {
  const [codeResponse, setCodeResponse] = React.useState();
  const googleLogin = useGoogleLogin({
    // flow: "auth-code",
    onSuccess: async (googleSuccessResponse) => {
      console.log("codeResponse", googleSuccessResponse);

      setCodeResponse(googleSuccessResponse);
    },
    onError: (googleerrorResponse) => console.log(googleerrorResponse),
  });
  React.useEffect(() => {
    if (codeResponse) callbackFn(codeResponse);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [codeResponse]);

  return (
    <Button
      onClick={googleLogin}
      fullwidth
      isLoading={isLoading}
      title={isLoading ? "authenticating... " : "Sign in with Google"}
      style={{ color: "#ffffff", margin: "16px 0" }}
      icon={<Google />}
      iconPosition={"left"}
    />
  );
};

export default GoogleRequestTokenOrCode;
