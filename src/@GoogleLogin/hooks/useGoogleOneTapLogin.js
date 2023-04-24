import { useEffect, useRef } from "react";

import { useGoogleOAuth } from "../GoogleOAuthProvider";
import { extractClientId } from "../helpers";

export default function useGoogleOneTapLogin({
  onSuccess,
  onError,
  promptMomentNotification,
  cancel_on_tap_outside,
  hosted_domain,
}) {
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
      hosted_domain,
      cancel_on_tap_outside,
    });

    window.google?.accounts.id.prompt(promptMomentNotificationRef.current);

    return () => {
      window.google?.accounts.id.cancel();
    };
  }, [
    clientId,
    scriptLoadedSuccessfully,
    cancel_on_tap_outside,
    hosted_domain,
  ]);
}
