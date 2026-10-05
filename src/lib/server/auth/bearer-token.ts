export function createBearerToken(token: string) {
  return `Bearer ${token}`;
}

export function getBearerToken(token: string) {
  if (token.length <= 7 || !token.startsWith("Bearer ")) {
    return null;
  }

  return token.slice(7);
}
