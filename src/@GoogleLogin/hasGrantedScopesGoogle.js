/**
 * Checks if the user granted any of the specified scope or scopes.
 * @returns True if any of the scopes are granted
 */

export const hasGrantedAnyScopeGoogle = (
  tokenResponse,
  firstScope,
  ...restScopes
) => {
  if (!window.google) return false;

  return window.google.accounts.oauth2.hasGrantedAnyScope(
    tokenResponse,
    firstScope,
    ...restScopes,
  );
};

/**
 * Checks if the user granted all the specified scope or scopes
 * @returns True if all the scopes are granted
 */
export const hasGrantedAllScopesGoogle = (
  tokenResponse,
  firstScope,
  ...restScopes
) => {
  if (!window.google) return false;

  return window.google.accounts.oauth2.hasGrantedAllScopes(
    tokenResponse,
    firstScope,
    ...restScopes,
  );
};
