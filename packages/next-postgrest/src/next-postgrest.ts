export type NextPostgrestFalsy = false | undefined | null | void;

export function getProxyURL({
  pathname,
  search,
  url,
  basePath,
}: {
  pathname: string;
  search: string;
  url: string;
  basePath: string;
}) {
  if (!basePath.startsWith("/")) {
    basePath = `/${basePath}`;
  }

  let prefixAwarePgRestPath = pathname.replace(basePath, "").replace(/\/$/, "");
  return new URL(prefixAwarePgRestPath + search, url).toString();
}

export function NextPostgrest({
  url,
  basePath = "/",
  authorize = () => false,
}: {
  url: string;
  basePath?: string;
  authorize({
    pathname,
    searchParams,
  }: {
    pathname: string;
    searchParams: string;
  }): Response | NextPostgrestFalsy;
}) {
  async function handler(request: Request) {
    const { pathname, search } = new URL(request.url);

    const authResponse = authorize({ pathname, searchParams: search });

    if (authResponse) {
      return authResponse;
    }

    const proxyURL = getProxyURL({ pathname, search, url, basePath });

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
