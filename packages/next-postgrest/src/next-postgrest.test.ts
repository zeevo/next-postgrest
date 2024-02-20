import { NextPostgrest, getProxyURL } from "./next-postgrest";

describe("next-postgres.ts tests", () => {
  describe("#NextPostgrest", () => {
    test("should return handlers", async () => {
      const handlers = NextPostgrest({
        url: "http://postgrest",
        basePath: "/api",
        authorize: ({ pathname, searchParams }) => {},
      });

      expect(typeof handlers.GET).toEqual("function");
      expect(typeof handlers.POST).toEqual("function");
      expect(typeof handlers.PATCH).toEqual("function");
      expect(typeof handlers.DELETE).toEqual("function");
      expect(typeof handlers.PUT).toEqual("function");
    });
  });

  describe("#getProxyURL tests", () => {
    test("trailing slash", () => {
      const proxyURL = getProxyURL({
        pathname: "/api/foo/",
        search: "",
        url: "http://postgrest",
        basePath: "/api",
      });

      expect(proxyURL).toEqual("http://postgrest/foo");
    });

    test("without trailing slash", () => {
      const proxyURL = getProxyURL({
        pathname: "/api/foo",
        search: "",
        url: "http://postgrest",
        basePath: "/api",
      });

      expect(proxyURL).toEqual("http://postgrest/foo");
    });

    test("without basePath without trailing slashes", () => {
      const proxyURL = getProxyURL({
        pathname: "foo",
        search: "",
        url: "http://postgrest",
        basePath: "/",
      });

      expect(proxyURL).toEqual("http://postgrest/foo");
    });

    test("without basePath with trailing slashes", () => {
      const proxyURL = getProxyURL({
        pathname: "foo",
        search: "",
        url: "http://postgrest/",
        basePath: "/",
      });

      expect(proxyURL).toEqual("http://postgrest/foo");
    });

    test("deep basePath", () => {
      const proxyURL = getProxyURL({
        pathname: "/api/rest/foo",
        search: "",
        url: "http://postgrest",
        basePath: "/api/rest",
      });

      expect(proxyURL).toEqual("http://postgrest/foo");
    });

    test("deep basePath with trailing slashes", () => {
      const proxyURL = getProxyURL({
        pathname: "/api/rest/foo",
        search: "",
        url: "http://postgrest",
        basePath: "/api/rest/",
      });

      expect(proxyURL).toEqual("http://postgrest/foo");
    });

    test("basePath without leading slash", () => {
      const proxyURL = getProxyURL({
        pathname: "/api/rest/foo/",
        search: "",
        url: "http://postgrest",
        basePath: "api/rest/",
      });

      expect(proxyURL).toEqual("http://postgrest/foo");
    });

    test("basePath without leading slash or trailing slash", () => {
      const proxyURL = getProxyURL({
        pathname: "/api/rest/foo/",
        search: "?q=b",
        url: "http://postgrest",
        basePath: "api/rest",
      });

      expect(proxyURL).toEqual("http://postgrest/foo?q=b");
    });

    test("with basic search", () => {
      const proxyURL = getProxyURL({
        pathname: "/api/rest/foo/",
        search: "?bar=eq.baz",
        url: "http://postgrest/",
        basePath: "api/rest/",
      });

      expect(proxyURL).toEqual("http://postgrest/foo?bar=eq.baz");
    });

    test("with basic search no basePath", () => {
      const proxyURL = getProxyURL({
        pathname: "/foo/",
        search: "?bar=eq.baz",
        url: "http://postgrest/",
        basePath: "/",
      });

      expect(proxyURL).toEqual("http://postgrest/foo?bar=eq.baz");
    });
  });
});
