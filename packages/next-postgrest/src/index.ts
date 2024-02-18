function getProxyURL(
  request: Request,
  { url, prefix }: { url: string; prefix: string }
) {
  const { pathname, search } = new URL(request.url);

  let pgRestUrl = url;

  if (!url.endsWith("/")) {
    pgRestUrl += "/";
  }

  if (!prefix.startsWith("/")) {
    prefix += "/";
  }

  const pgRestPath = pathname + search;

  const pgRestPathTokens = pgRestPath.split("/");

  const prefixAwarePgRestPath =
    pgRestPathTokens[1] === prefix.slice(1)
      ? pgRestPathTokens.slice(2).join("/")
      : pgRestPathTokens.join("/");

  return pgRestUrl + prefixAwarePgRestPath;
}

export function NextPostgrest({
  url,
  prefix = "/",
}: {
  url: string;
  prefix?: string;
}) {
  async function handler(request: Request) {
    const proxyURL = getProxyURL(request, { url, prefix });

    const body = await request.text();

    const { method, headers } = request;

    let options: {
      method: Request["method"];
      headers: Request["headers"];
      body?: string;
    } = {
      method,
      headers,
    };

    if (body) {
      options.body = body;
    }

    return await fetch(proxyURL, options);
  }

  return {
    GET: handler,
    POST: handler,
    PUT: handler,
    PATCH: handler,
    DELETE: handler,
  };
}
