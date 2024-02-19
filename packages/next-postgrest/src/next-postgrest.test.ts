import { NextPostgrest, getProxyURL } from "./next-postgrest";

describe("next-postgres.ts tests", () => {
  describe("#NextPostgrest", () => {
    test("should return handlers", async () => {
      const handlers = NextPostgrest({
        url: "http://postgrest",
        basePath: "/api",
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
      const proxyURL = getProxyURL(
        "http://localhost/api/foo",
        "http://postgrest",
        "/api"
      );

      expect(proxyURL).toEqual("http://postgrest/foo");
    });

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

    test("prefix without leading slash", () => {
      const proxyURL = getProxyURL(
        "http://localhost/api/rest/foo/",
        "http://postgrest/",
        "api/rest/"
      );

      expect(proxyURL).toEqual("http://postgrest/foo");
    });
  });
});
