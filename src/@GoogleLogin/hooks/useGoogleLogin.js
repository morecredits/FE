/* eslint-disable import/export */
import { useCallback, useEffect, useRef } from "react";

import { useGoogleOAuth } from "../GoogleOAuthProvider";

export default function useGoogleLogin({
  flow = "implicit",
  scope = "",
  onSuccess,
  onError,
  onNonOAuthError,
  overrideScope,
  ...props
}) {
  const { clientId, scriptLoadedSuccessfully } = useGoogleOAuth();
  const clientRef = useRef();

  const onSuccessRef = useRef(onSuccess);
  onSuccessRef.current = onSuccess;

  const onErrorRef = useRef(onError);
  onErrorRef.current = onError;

  const onNonOAuthErrorRef = useRef(onNonOAuthError);
  onNonOAuthErrorRef.current = onNonOAuthError;

  useEffect(() => {
    if (!scriptLoadedSuccessfully) return;

    const clientMethod =
      flow === "implicit" ? "initTokenClient" : "initCodeClient";

    const client = window.google?.accounts.oauth2[clientMethod]({
      client_id: clientId,
      scope: overrideScope ? scope : `openid profile email ${scope}`,
      callback: (response) => {
        if (response.error) return onErrorRef.current?.(response);

        onSuccessRef.current?.(response);
      },
      error_callback: (nonOAuthError) => {
        onNonOAuthErrorRef.current?.(nonOAuthError);
      },
      ...props,
    });

    clientRef.current = client;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clientId, scriptLoadedSuccessfully, flow, scope]);

  const loginImplicitFlow = useCallback(
    (overrideConfig) => clientRef.current.requestAccessToken(overrideConfig),
    [],
  );

  const loginAuthCodeFlow = useCallback(() => {
    console.log(clientRef.current);
    clientRef.current.requestCode();
  }, []);

  return flow === "implicit" ? loginImplicitFlow : loginAuthCodeFlow;
}
