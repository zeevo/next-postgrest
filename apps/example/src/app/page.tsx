import { Swagger } from "./_components/swagger";

export default async function Page() {
  // Fetch spec from PostgREST endpoint
  const spec = await fetch("http://localhost:3333");

  const json = await spec.json();

  return (
    <Swagger
      spec={{
        ...json,
        host: "localhost:3000",
        basePath: "/api",
        paths: { ...json.paths, "/": undefined },
      }}
    />
  );
}
