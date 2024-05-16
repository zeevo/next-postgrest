import { NextPostgrestSwagger } from "next-postgrest";
import { Swagger } from "./_components/swagger";

export const dynamic = "force-dynamic";

export default async function Page() {
  const spec = await NextPostgrestSwagger({
    url: "http://localhost:3333",
    host: "localhost:3000",
    basePath: "/api",
  });

  return <Swagger spec={spec} />;
}
