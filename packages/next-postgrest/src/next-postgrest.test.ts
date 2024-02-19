import { getProxyURL } from "./next-postgrest";

describe("#getProxyURL tests", () => {
  test("without trailing slash", () => {
    const proxyURL = getProxyURL(
      "http://localhost/api/foo",
      "http://postgrest",
      "/api"
    );

    expect(proxyURL).toEqual("http://postgrest/foo");
  });

  test("without prefix without trailing slashes", () => {
    const proxyURL = getProxyURL(
      "http://localhost/foo",
      "http://postgrest",
      "/"
    );

    expect(proxyURL).toEqual("http://postgrest/foo");
  });

  test("without prefix with trailing slashes", () => {
    const proxyURL = getProxyURL(
      "http://localhost/foo/",
      "http://postgrest/",
      "/"
    );

    expect(proxyURL).toEqual("http://postgrest/foo");
  });

  test("deep prefix", () => {
    const proxyURL = getProxyURL(
      "http://localhost/api/rest/foo",
      "http://postgrest",
      "/api/rest"
    );

    expect(proxyURL).toEqual("http://postgrest/foo");
  });

  test("deep prefix with trailing slashes", () => {
    const proxyURL = getProxyURL(
      "http://localhost/api/rest/foo/",
      "http://postgrest/",
      "/api/rest/"
    );

    expect(proxyURL).toEqual("http://postgrest/foo");
  });
});
