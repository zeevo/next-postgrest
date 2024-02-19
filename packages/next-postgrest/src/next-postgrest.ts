export function getProxyURL(url: string, pgUrl: string, prefix: string) {
  if (!url.endsWith("/")) {
    pgUrl += "/";
  }

  if (!prefix.startsWith("/")) {
    prefix += "/";
  }

  const { pathname, search } = new URL(url);

  const pgRestPath = pathname + search;

  let prefixAwarePgRestPath = pgRestPath.replace(prefix, "").replace(/\/$/, "");

  return new URL(prefixAwarePgRestPath, pgUrl).toString();
}

export function NextPostgrest({
  url,
  prefix = "/",
}: {
  url: string;
  prefix?: string;
}) {
  async function handler(request: Request) {
    const proxyURL = getProxyURL(request.url, url, prefix);

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
