import assert from "node:assert/strict";
import test from "node:test";
import routes from "./canonical-route.js";

const request = (uri, querystring = {}) => ({ request: { uri, querystring } });

test("redirects missing trailing slash and preserves CloudFront serialized query components", () => {
  const result = routes.handler(
    request("/about", { "a%2Fb": { value: "one%20two+three" }, empty: { multiValue: [{ value: "" }, { value: "" }] } })
  );
  assert.equal(result.statusCode, 308);
  assert.equal(result.headers.location.value, "/about/?a%2Fb=one%20two+three&empty&empty");
});

test("rewrites canonical pages, including localized pages, to static indexes", () => {
  assert.equal(routes.handler(request("/about/")).uri, "/about/index.html");
  assert.equal(routes.handler(request("/en/portfolio/")).uri, "/en/portfolio/index.html");
});

test("redirects Korean aliases while retaining query strings", () => {
  const result = routes.handler(request("/ko/portfolio", { x: { value: "1" } }));
  assert.equal(result.headers.location.value, "/portfolio/?x=1");
});

test("does not redirect or rewrite Next navigation files and assets", () => {
  assert.equal(routes.handler(request("/_next/static/chunks/app.js")).uri, "/_next/static/chunks/app.js");
  assert.equal(routes.handler(request("/_next/data/build/about.json")).uri, "/_next/data/build/about.json");
  assert.equal(routes.handler(request("/robots.txt")).uri, "/robots.txt");
});
