import { NextPostgrest } from "next-postgrest";

export const { GET, POST, PUT, DELETE, PATCH } = NextPostgrest({
  url: "http://localhost:3333",
  basePath: "/api",
  before({ pathname, searchParams, view, request }) {
    if (Object.keys(searchParams).includes("myField")) {
      return new Response(JSON.stringify({ message: "bad request" }), {
        status: 400,
      });
    }
  },
});
