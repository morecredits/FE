import React, { useEffect, useRef } from "react";

import { useGoogleOAuth } from "./GoogleOAuthProvider";
import { extractClientId } from "./helpers";

const containerHeightMap = { large: 40, medium: 32, small: 20 };

export default function GoogleLogin({
  onSuccess,
  onError,
  useOneTap,
  promptMomentNotification,
  type = "standard",
  theme = "outline",
  size = "large",
  text,
  shape,
  logo_alignment,
  width,
  locale,
  ...props
}) {
  const btnContainerRef = useRef(null);
  const { clientId, scriptLoadedSuccessfully } = useGoogleOAuth();

  const onSuccessRef = useRef(onSuccess);
  onSuccessRef.current = onSuccess;

  const onErrorRef = useRef(onError);
  onErrorRef.current = onError;

  const promptMomentNotificationRef = useRef(promptMomentNotification);
  promptMomentNotificationRef.current = promptMomentNotification;

  useEffect(() => {
    if (!scriptLoadedSuccessfully) return;

    window.google?.accounts.id.initialize({
      client_id: clientId,
      callback: (credentialResponse) => {
        if (!credentialResponse?.credential) {
          return onErrorRef.current?.();
        }

        const { credential, select_by } = credentialResponse;
        onSuccessRef.current({
          credential,
          clientId: extractClientId(credentialResponse),
          select_by,
        });
      },
      ...props,
    });

    window.google?.accounts.id.renderButton(btnContainerRef.current || null, {
      type,
      theme,
      size,
      text,
      shape,
      logo_alignment,
      width,
      locale,
    });

    if (useOneTap)
      window.google?.accounts.id.prompt(promptMomentNotificationRef.current);

    return () => {
      if (useOneTap) window.google?.accounts.id.cancel();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    clientId,
    scriptLoadedSuccessfully,
    useOneTap,
    type,
    theme,
    size,
    text,
    shape,
    logo_alignment,
    width,
    locale,
  ]);

  return (
    <div ref={btnContainerRef} style={{ height: containerHeightMap[size] }} />
  );
}

export const googleLogout = () => {
  window.google?.accounts.id.disableAutoSelect();
};
