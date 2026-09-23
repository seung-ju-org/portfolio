/* CloudFront Function: viewer-request.  Associate before applying the S3 config. */
function queryString(querystring) {
  var pairs = [];
  for (var key in querystring || {}) {
    var entry = querystring[key];
    var values = entry.multiValue || [entry];
    for (var i = 0; i < values.length; i++) {
      // CloudFront Functions supplies the serialized query components. Keeping
      // them verbatim avoids turning %2F into %252F or + into %2B on redirects.
      pairs.push(key + (values[i].value === "" ? "" : "=" + values[i].value));
    }
  }
  return pairs.length ? "?" + pairs.join("&") : "";
}

function redirect(uri, querystring) {
  return {
    statusCode: 308,
    statusDescription: "Permanent Redirect",
    headers: { location: { value: uri + queryString(querystring) } }
  };
}

function isAsset(uri) {
  return (
    uri.indexOf("/_next/") === 0 ||
    uri.indexOf("/.well-known/") === 0 ||
    /\.[A-Za-z0-9]{1,12}$/.test(uri) ||
    uri === "/robots" ||
    uri === "/sitemap"
  );
}

function handler(event) {
  var request = event.request;
  var uri = request.uri || "/";

  // Korean is canonical without a locale prefix. Redirect rather than rewrite so
  // canonical links, analytics and browser history agree on one URL.
  if (uri === "/ko" || uri.indexOf("/ko/") === 0) {
    var koreanTarget = uri === "/ko" ? "/" : uri.slice(3);
    if (!isAsset(koreanTarget) && koreanTarget.charAt(koreanTarget.length - 1) !== "/") koreanTarget += "/";
    return redirect(koreanTarget, request.querystring);
  }

  if (isAsset(uri)) return request;
  if (uri.charAt(uri.length - 1) !== "/") return redirect(uri + "/", request.querystring);

  request.uri = uri + "index.html";
  return request;
}

if (typeof module !== "undefined") module.exports = { handler: handler };
