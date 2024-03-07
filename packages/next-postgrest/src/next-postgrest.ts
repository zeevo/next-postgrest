export function paramsToObject(urlSearchParams: URLSearchParams) {
  const result: Record<string, string> = {};
  for (const [key, value] of urlSearchParams.entries()) {
    result[key] = value;
  }
  return result;
}

export function getBaseAwarePath(basePath: string, pathname: string) {
  if (!basePath.startsWith("/")) {
    basePath = `/${basePath}`;
  }

  return pathname.replace(basePath, "").replace(/\/$/, "").replace(/^\//, "");
}

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
  const prefixAwarePgRestPath = getBaseAwarePath(basePath, pathname);
  return new URL(prefixAwarePgRestPath + search, url).toString();
}

export function NextPostgrest({
  url,
  basePath = "/",
  before,
}: {
  url: string;
  basePath?: string;
  before?({
    pathname,
    view,
    searchParams,
    request,
  }: {
    pathname: string;
    view: string;
    searchParams: Record<string, string>;
    request: Request;
  }): Response | Promise<Response> | false | undefined | null | void;
}) {
  async function handler(request: Request): Promise<Response> {
    const { pathname, search } = new URL(request.url);

    let baseAwarePath = getBaseAwarePath(basePath, pathname);

    if (before) {
      const beforeResponse = await before({
        pathname: pathname,
        view: baseAwarePath,
        searchParams: paramsToObject(new URLSearchParams(search)),
        request,
      });

      if (beforeResponse) {
        return beforeResponse;
      }
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
