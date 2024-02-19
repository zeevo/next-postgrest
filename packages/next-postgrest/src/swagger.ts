export async function NextPostgrestSwagger({
  url,
  basePath,
  host,
}: {
  url: string;
  basePath: string;
  host: string;
}) {
  const spec = await fetch(url);

  const json = await spec.json();

  const formattedSpec = {
    ...json,
    host,
    basePath,
  };

  return formattedSpec;
}
