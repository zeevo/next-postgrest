import { NextPostgrestSwagger } from "next-postgrest";
import { Swagger } from "./_components/swagger";

export default async function Page() {
  // Fetch spec from PostgREST endpoint
  const spec = await NextPostgrestSwagger({
    url: "http://localhost:3333",
    host: "localhost:3000",
    path: "/api",
  });

  return <Swagger spec={spec} />;
}
