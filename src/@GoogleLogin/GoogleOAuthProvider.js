import React, { useContext, createContext, useMemo } from "react";

import useLoadGsiScript from "./hooks/useLoadGsiScript";

const defaultState = {
  clientId: null,
  scriptLoadedSuccessfully: false,
};

const GoogleOAuthContext = createContext(defaultState);

export default function GoogleOAuthProvider({
  clientId,
  onScriptLoadSuccess,
  onScriptLoadError,
  children,
}) {
  const scriptLoadedSuccessfully = useLoadGsiScript({
    onScriptLoadSuccess,
    onScriptLoadError,
  });

  const contextValue = useMemo(
    () => ({
      clientId,
      scriptLoadedSuccessfully,
    }),
    [clientId, scriptLoadedSuccessfully],
  );

  return (
    <GoogleOAuthContext.Provider value={contextValue}>
      {children}
    </GoogleOAuthContext.Provider>
  );
}

export function useGoogleOAuth() {
  const context = useContext(GoogleOAuthContext);
  if (!context) {
    throw new Error(
      "Google OAuth components must be used within GoogleOAuthProvider",
    );
  }
  return context;
}
