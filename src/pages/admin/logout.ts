import type { APIRoute } from "astro";

import { authCookieName } from "#lib/server/auth/is-logged-in";

export const prerender = false;

export const POST: APIRoute = ({ cookies, redirect, request, url }) => {
  if (request.headers.get("Origin") !== url.origin) {
    return new Response("Forbidden", { status: 403 });
  }
  cookies.delete(authCookieName, { path: "/" });
  const response = redirect("/admin/login", 303);
  response.headers.set("Cache-Control", "no-store");
  return response;
};
