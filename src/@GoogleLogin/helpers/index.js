export function extractClientId(credentialResponse) {
  const clientId =
    credentialResponse?.clientId ?? credentialResponse?.client_id;
  return clientId;
}
