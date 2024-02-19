export function getProxyURL(reqUrl: string, pgUrl: string, basePath: string) {
  if (!reqUrl.endsWith("/")) {
    pgUrl += "/";
  }

  if (!basePath.startsWith("/")) {
    basePath = `/${basePath}`;
  }

  const { pathname, search } = new URL(reqUrl);

  const pgRestPath = pathname + search;

  const prefixAwarePgRestPath = pgRestPath
    .replace(basePath, "")
    .replace(/\/$/, "");

  return new URL(prefixAwarePgRestPath, pgUrl).toString();
}

export function NextPostgrest({
  url,
  basePath = "/",
}: {
  url: string;
  basePath?: string;
}) {
  async function handler(request: Request) {
    const proxyURL = getProxyURL(request.url, url, basePath);

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
