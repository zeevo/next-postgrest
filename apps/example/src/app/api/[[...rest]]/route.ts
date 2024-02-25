import { NextPostgrest } from "next-postgrest";

export const { GET, POST, PUT, DELETE, PATCH } = NextPostgrest({
  url: "http://localhost:3333",
  basePath: "/api",
  before({ pathname, searchParams }) {
    console.log(pathname, searchParams);
    return Response.json({ message: "bad" }, { status: 409 });
  },
});
