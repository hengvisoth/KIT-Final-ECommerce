globalThis._importMeta_=globalThis._importMeta_||{url:"file:///_entry.js",env:process.env};import 'node-fetch-native/polyfill';
import { Server as Server$1 } from 'node:http';
import { Server } from 'node:https';
import destr from 'destr';
import { defineEventHandler, handleCacheHeaders, createEvent, eventHandler, setHeaders, sendRedirect, proxyRequest, getRequestHeader, getRequestHeaders, setResponseHeader, createError, createApp, createRouter as createRouter$1, toNodeListener, fetchWithEvent, lazyEventHandler } from 'h3';
import { createFetch as createFetch$1, Headers } from 'ofetch';
import { createCall, createFetch } from 'unenv/runtime/fetch/index';
import { createHooks } from 'hookable';
import { snakeCase } from 'scule';
import { hash } from 'ohash';
import { parseURL, withoutBase, joinURL, withQuery, withLeadingSlash, withoutTrailingSlash } from 'ufo';
import { createStorage } from 'unstorage';
import defu from 'defu';
import { toRouteMatcher, createRouter } from 'radix3';
import { promises } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'pathe';

const _runtimeConfig = {"app":{"baseURL":"/","buildAssetsDir":"/_nuxt/","cdnURL":""},"nitro":{"envPrefix":"NUXT_","routeRules":{"/__nuxt_error":{"cache":false},"/_nuxt/**":{"headers":{"cache-control":"public, max-age=2592000, immutable"}}}},"public":{}};
const ENV_PREFIX = "NITRO_";
const ENV_PREFIX_ALT = _runtimeConfig.nitro.envPrefix ?? process.env.NITRO_ENV_PREFIX ?? "_";
const getEnv = (key) => {
  const envKey = snakeCase(key).toUpperCase();
  return destr(
    process.env[ENV_PREFIX + envKey] ?? process.env[ENV_PREFIX_ALT + envKey]
  );
};
function isObject(input) {
  return typeof input === "object" && !Array.isArray(input);
}
function overrideConfig(obj, parentKey = "") {
  for (const key in obj) {
    const subKey = parentKey ? `${parentKey}_${key}` : key;
    const envValue = getEnv(subKey);
    if (isObject(obj[key])) {
      if (isObject(envValue)) {
        obj[key] = { ...obj[key], ...envValue };
      }
      overrideConfig(obj[key], subKey);
    } else {
      obj[key] = envValue ?? obj[key];
    }
  }
}
overrideConfig(_runtimeConfig);
const config$1 = deepFreeze(_runtimeConfig);
const useRuntimeConfig = () => config$1;
function deepFreeze(object) {
  const propNames = Object.getOwnPropertyNames(object);
  for (const name of propNames) {
    const value = object[name];
    if (value && typeof value === "object") {
      deepFreeze(value);
    }
  }
  return Object.freeze(object);
}

const _assets = {

};

function normalizeKey(key) {
  if (!key) {
    return "";
  }
  return key.split("?")[0].replace(/[/\\]/g, ":").replace(/:+/g, ":").replace(/^:|:$/g, "");
}

const assets$1 = {
  getKeys() {
    return Promise.resolve(Object.keys(_assets))
  },
  hasItem (id) {
    id = normalizeKey(id);
    return Promise.resolve(id in _assets)
  },
  getItem (id) {
    id = normalizeKey(id);
    return Promise.resolve(_assets[id] ? _assets[id].import() : null)
  },
  getMeta (id) {
    id = normalizeKey(id);
    return Promise.resolve(_assets[id] ? _assets[id].meta : {})
  }
};

const storage = createStorage({});

const useStorage = () => storage;

storage.mount('/assets', assets$1);

const defaultCacheOptions = {
  name: "_",
  base: "/cache",
  swr: true,
  maxAge: 1
};
function defineCachedFunction(fn, opts) {
  opts = { ...defaultCacheOptions, ...opts };
  const pending = {};
  const group = opts.group || "nitro";
  const name = opts.name || fn.name || "_";
  const integrity = hash([opts.integrity, fn, opts]);
  const validate = opts.validate || (() => true);
  async function get(key, resolver, shouldInvalidateCache) {
    const cacheKey = [opts.base, group, name, key + ".json"].filter(Boolean).join(":").replace(/:\/$/, ":index");
    const entry = await useStorage().getItem(cacheKey) || {};
    const ttl = (opts.maxAge ?? opts.maxAge ?? 0) * 1e3;
    if (ttl) {
      entry.expires = Date.now() + ttl;
    }
    const expired = shouldInvalidateCache || entry.integrity !== integrity || ttl && Date.now() - (entry.mtime || 0) > ttl || !validate(entry);
    const _resolve = async () => {
      const isPending = pending[key];
      if (!isPending) {
        if (entry.value !== void 0 && (opts.staleMaxAge || 0) >= 0) {
          entry.value = void 0;
          entry.integrity = void 0;
          entry.mtime = void 0;
          entry.expires = void 0;
        }
        pending[key] = Promise.resolve(resolver());
      }
      entry.value = await pending[key];
      if (!isPending) {
        entry.mtime = Date.now();
        entry.integrity = integrity;
        delete pending[key];
        if (validate(entry)) {
          useStorage().setItem(cacheKey, entry).catch((error) => console.error("[nitro] [cache]", error));
        }
      }
    };
    const _resolvePromise = expired ? _resolve() : Promise.resolve();
    if (opts.swr && entry.value) {
      _resolvePromise.catch(console.error);
      return entry;
    }
    return _resolvePromise.then(() => entry);
  }
  return async (...args) => {
    const shouldBypassCache = opts.shouldBypassCache?.(...args);
    if (shouldBypassCache) {
      return fn(...args);
    }
    const key = await (opts.getKey || getKey)(...args);
    const shouldInvalidateCache = opts.shouldInvalidateCache?.(...args);
    const entry = await get(key, () => fn(...args), shouldInvalidateCache);
    let value = entry.value;
    if (opts.transform) {
      value = await opts.transform(entry, ...args) || value;
    }
    return value;
  };
}
const cachedFunction = defineCachedFunction;
function getKey(...args) {
  return args.length > 0 ? hash(args, {}) : "";
}
function escapeKey(key) {
  return key.replace(/[^\dA-Za-z]/g, "");
}
function defineCachedEventHandler(handler, opts = defaultCacheOptions) {
  const _opts = {
    ...opts,
    getKey: async (event) => {
      const key = await opts.getKey?.(event);
      if (key) {
        return escapeKey(key);
      }
      const url = event.node.req.originalUrl || event.node.req.url;
      const friendlyName = escapeKey(decodeURI(parseURL(url).pathname)).slice(
        0,
        16
      );
      const urlHash = hash(url);
      return `${friendlyName}.${urlHash}`;
    },
    validate: (entry) => {
      if (entry.value.code >= 400) {
        return false;
      }
      if (entry.value.body === void 0) {
        return false;
      }
      return true;
    },
    group: opts.group || "nitro/handlers",
    integrity: [opts.integrity, handler]
  };
  const _cachedHandler = cachedFunction(
    async (incomingEvent) => {
      const reqProxy = cloneWithProxy(incomingEvent.node.req, { headers: {} });
      const resHeaders = {};
      let _resSendBody;
      const resProxy = cloneWithProxy(incomingEvent.node.res, {
        statusCode: 200,
        getHeader(name) {
          return resHeaders[name];
        },
        setHeader(name, value) {
          resHeaders[name] = value;
          return this;
        },
        getHeaderNames() {
          return Object.keys(resHeaders);
        },
        hasHeader(name) {
          return name in resHeaders;
        },
        removeHeader(name) {
          delete resHeaders[name];
        },
        getHeaders() {
          return resHeaders;
        },
        end(chunk, arg2, arg3) {
          if (typeof chunk === "string") {
            _resSendBody = chunk;
          }
          if (typeof arg2 === "function") {
            arg2();
          }
          if (typeof arg3 === "function") {
            arg3();
          }
          return this;
        },
        write(chunk, arg2, arg3) {
          if (typeof chunk === "string") {
            _resSendBody = chunk;
          }
          if (typeof arg2 === "function") {
            arg2();
          }
          if (typeof arg3 === "function") {
            arg3();
          }
          return this;
        },
        writeHead(statusCode, headers2) {
          this.statusCode = statusCode;
          if (headers2) {
            for (const header in headers2) {
              this.setHeader(header, headers2[header]);
            }
          }
          return this;
        }
      });
      const event = createEvent(reqProxy, resProxy);
      event.context = incomingEvent.context;
      const body = await handler(event) || _resSendBody;
      const headers = event.node.res.getHeaders();
      headers.etag = headers.Etag || headers.etag || `W/"${hash(body)}"`;
      headers["last-modified"] = headers["Last-Modified"] || headers["last-modified"] || (/* @__PURE__ */ new Date()).toUTCString();
      const cacheControl = [];
      if (opts.swr) {
        if (opts.maxAge) {
          cacheControl.push(`s-maxage=${opts.maxAge}`);
        }
        if (opts.staleMaxAge) {
          cacheControl.push(`stale-while-revalidate=${opts.staleMaxAge}`);
        } else {
          cacheControl.push("stale-while-revalidate");
        }
      } else if (opts.maxAge) {
        cacheControl.push(`max-age=${opts.maxAge}`);
      }
      if (cacheControl.length > 0) {
        headers["cache-control"] = cacheControl.join(", ");
      }
      const cacheEntry = {
        code: event.node.res.statusCode,
        headers,
        body
      };
      return cacheEntry;
    },
    _opts
  );
  return defineEventHandler(async (event) => {
    if (opts.headersOnly) {
      if (handleCacheHeaders(event, { maxAge: opts.maxAge })) {
        return;
      }
      return handler(event);
    }
    const response = await _cachedHandler(event);
    if (event.node.res.headersSent || event.node.res.writableEnded) {
      return response.body;
    }
    if (handleCacheHeaders(event, {
      modifiedTime: new Date(response.headers["last-modified"]),
      etag: response.headers.etag,
      maxAge: opts.maxAge
    })) {
      return;
    }
    event.node.res.statusCode = response.code;
    for (const name in response.headers) {
      event.node.res.setHeader(name, response.headers[name]);
    }
    return response.body;
  });
}
function cloneWithProxy(obj, overrides) {
  return new Proxy(obj, {
    get(target, property, receiver) {
      if (property in overrides) {
        return overrides[property];
      }
      return Reflect.get(target, property, receiver);
    },
    set(target, property, value, receiver) {
      if (property in overrides) {
        overrides[property] = value;
        return true;
      }
      return Reflect.set(target, property, value, receiver);
    }
  });
}
const cachedEventHandler = defineCachedEventHandler;

const config = useRuntimeConfig();
const _routeRulesMatcher = toRouteMatcher(
  createRouter({ routes: config.nitro.routeRules })
);
function createRouteRulesHandler() {
  return eventHandler((event) => {
    const routeRules = getRouteRules(event);
    if (routeRules.headers) {
      setHeaders(event, routeRules.headers);
    }
    if (routeRules.redirect) {
      return sendRedirect(
        event,
        routeRules.redirect.to,
        routeRules.redirect.statusCode
      );
    }
    if (routeRules.proxy) {
      let target = routeRules.proxy.to;
      if (target.endsWith("/**")) {
        let targetPath = event.path;
        const strpBase = routeRules.proxy._proxyStripBase;
        if (strpBase) {
          targetPath = withoutBase(targetPath, strpBase);
        }
        target = joinURL(target.slice(0, -3), targetPath);
      }
      return proxyRequest(event, target, {
        fetch: $fetch.raw,
        ...routeRules.proxy
      });
    }
  });
}
function getRouteRules(event) {
  event.context._nitro = event.context._nitro || {};
  if (!event.context._nitro.routeRules) {
    const path = new URL(event.node.req.url, "http://localhost").pathname;
    event.context._nitro.routeRules = getRouteRulesForPath(
      withoutBase(path, useRuntimeConfig().app.baseURL)
    );
  }
  return event.context._nitro.routeRules;
}
function getRouteRulesForPath(path) {
  return defu({}, ..._routeRulesMatcher.matchAll(path).reverse());
}

const plugins = [
  
];

function hasReqHeader(event, name, includes) {
  const value = getRequestHeader(event, name);
  return value && typeof value === "string" && value.toLowerCase().includes(includes);
}
function isJsonRequest(event) {
  return hasReqHeader(event, "accept", "application/json") || hasReqHeader(event, "user-agent", "curl/") || hasReqHeader(event, "user-agent", "httpie/") || hasReqHeader(event, "sec-fetch-mode", "cors") || event.path.startsWith("/api/") || event.path.endsWith(".json");
}
function normalizeError(error) {
  const cwd = typeof process.cwd === "function" ? process.cwd() : "/";
  const stack = (error.stack || "").split("\n").splice(1).filter((line) => line.includes("at ")).map((line) => {
    const text = line.replace(cwd + "/", "./").replace("webpack:/", "").replace("file://", "").trim();
    return {
      text,
      internal: line.includes("node_modules") && !line.includes(".cache") || line.includes("internal") || line.includes("new Promise")
    };
  });
  const statusCode = error.statusCode || 500;
  const statusMessage = error.statusMessage ?? (statusCode === 404 ? "Not Found" : "");
  const message = error.message || error.toString();
  return {
    stack,
    statusCode,
    statusMessage,
    message
  };
}

const errorHandler = (async function errorhandler(error, event) {
  const { stack, statusCode, statusMessage, message } = normalizeError(error);
  const errorObject = {
    url: event.node.req.url,
    statusCode,
    statusMessage,
    message,
    stack: "",
    data: error.data
  };
  event.node.res.statusCode = errorObject.statusCode !== 200 && errorObject.statusCode || 500;
  if (errorObject.statusMessage) {
    event.node.res.statusMessage = errorObject.statusMessage;
  }
  if (error.unhandled || error.fatal) {
    const tags = [
      "[nuxt]",
      "[request error]",
      error.unhandled && "[unhandled]",
      error.fatal && "[fatal]",
      Number(errorObject.statusCode) !== 200 && `[${errorObject.statusCode}]`
    ].filter(Boolean).join(" ");
    console.error(tags, errorObject.message + "\n" + stack.map((l) => "  " + l.text).join("  \n"));
  }
  if (isJsonRequest(event)) {
    event.node.res.setHeader("Content-Type", "application/json");
    event.node.res.end(JSON.stringify(errorObject));
    return;
  }
  const isErrorPage = event.node.req.url?.startsWith("/__nuxt_error");
  const res = !isErrorPage ? await useNitroApp().localFetch(withQuery(joinURL(useRuntimeConfig().app.baseURL, "/__nuxt_error"), errorObject), {
    headers: getRequestHeaders(event),
    redirect: "manual"
  }).catch(() => null) : null;
  if (!res) {
    const { template } = await import('./error-500.mjs');
    event.node.res.setHeader("Content-Type", "text/html;charset=UTF-8");
    event.node.res.end(template(errorObject));
    return;
  }
  for (const [header, value] of res.headers.entries()) {
    setResponseHeader(event, header, value);
  }
  if (res.status && res.status !== 200) {
    event.node.res.statusCode = res.status;
  }
  if (res.statusText) {
    event.node.res.statusMessage = res.statusText;
  }
  event.node.res.end(await res.text());
});

const assets = {
  "/images/1.webp": {
    "type": "image/webp",
    "etag": "\"45ce-3TdyzJw5N/qwb4844jhM2F6JTXM\"",
    "mtime": "2023-07-07T02:43:37.481Z",
    "size": 17870,
    "path": "../public/images/1.webp"
  },
  "/images/2.webp": {
    "type": "image/webp",
    "etag": "\"283c-HSS/9qEBsMCNtcnKZTZWf1EGFyA\"",
    "mtime": "2023-07-07T02:43:37.482Z",
    "size": 10300,
    "path": "../public/images/2.webp"
  },
  "/images/3.webp": {
    "type": "image/webp",
    "etag": "\"2dc6-flOSGuppOY0c+qkrFDv0nnuBX4w\"",
    "mtime": "2023-07-07T02:43:37.482Z",
    "size": 11718,
    "path": "../public/images/3.webp"
  },
  "/images/4.webp": {
    "type": "image/webp",
    "etag": "\"312c-RQZ5zJA+REWMMM8FAjl5szbrud8\"",
    "mtime": "2023-07-07T02:43:37.482Z",
    "size": 12588,
    "path": "../public/images/4.webp"
  },
  "/images/404.png": {
    "type": "image/png",
    "etag": "\"11a9e-g6BTxDdLu9OHI0XMRollm0DWSeY\"",
    "mtime": "2023-07-07T02:43:37.483Z",
    "size": 72350,
    "path": "../public/images/404.png"
  },
  "/images/5.webp": {
    "type": "image/webp",
    "etag": "\"3520-f/mCsi2NPPihwdKmfZ88tf92BwE\"",
    "mtime": "2023-07-07T02:43:37.484Z",
    "size": 13600,
    "path": "../public/images/5.webp"
  },
  "/images/6.webp": {
    "type": "image/webp",
    "etag": "\"3b6e-9hbOERapn+SfmAn4lTcvhkIOHXI\"",
    "mtime": "2023-07-07T02:43:37.484Z",
    "size": 15214,
    "path": "../public/images/6.webp"
  },
  "/images/7.webp": {
    "type": "image/webp",
    "etag": "\"2e64-cla/9tA3kIaZMn21MSOSNyH4N/Q\"",
    "mtime": "2023-07-07T02:43:37.485Z",
    "size": 11876,
    "path": "../public/images/7.webp"
  },
  "/images/8.webp": {
    "type": "image/webp",
    "etag": "\"2bf4-WXfaDfNA4RgPSskNQeGLI/QuZc0\"",
    "mtime": "2023-07-07T02:43:37.485Z",
    "size": 11252,
    "path": "../public/images/8.webp"
  },
  "/images/9.webp": {
    "type": "image/webp",
    "etag": "\"5d32-9g1vGbvG/kgYMV05Grv9IqTID+U\"",
    "mtime": "2023-07-07T02:43:37.486Z",
    "size": 23858,
    "path": "../public/images/9.webp"
  },
  "/images/about_us.jpg": {
    "type": "image/jpeg",
    "etag": "\"26a51-FLKfHaI3tOiW5DCVMGuf46fgmaE\"",
    "mtime": "2023-07-07T02:43:37.490Z",
    "size": 158289,
    "path": "../public/images/about_us.jpg"
  },
  "/images/b1.jpg": {
    "type": "image/jpeg",
    "etag": "\"1d033-LdYp5fZHdL1wqaO8zfoc6PaCTf0\"",
    "mtime": "2023-07-07T02:43:37.491Z",
    "size": 118835,
    "path": "../public/images/b1.jpg"
  },
  "/images/b2.jpg": {
    "type": "image/jpeg",
    "etag": "\"43e5-q2AKUuFfjnC2HegSvLSa0viTYHY\"",
    "mtime": "2023-07-07T02:43:37.492Z",
    "size": 17381,
    "path": "../public/images/b2.jpg"
  },
  "/images/b3.png": {
    "type": "image/png",
    "etag": "\"85fc4-H2TDI7xdf0LH18opmGQ2F0DA7yE\"",
    "mtime": "2023-07-07T02:43:37.499Z",
    "size": 548804,
    "path": "../public/images/b3.png"
  },
  "/images/f1.png": {
    "type": "image/png",
    "etag": "\"4dd9-m62iQ5DZkgQAo4xvRDEtfptiN8s\"",
    "mtime": "2023-07-07T02:43:37.500Z",
    "size": 19929,
    "path": "../public/images/f1.png"
  },
  "/images/f2.png": {
    "type": "image/png",
    "etag": "\"72ba-2XooeJnuiP/0u484uWPsH2b2ZyM\"",
    "mtime": "2023-07-07T02:43:37.501Z",
    "size": 29370,
    "path": "../public/images/f2.png"
  },
  "/images/f3.png": {
    "type": "image/png",
    "etag": "\"44c9-hz1f1pposYjEmHneNt0qEO2ddYc\"",
    "mtime": "2023-07-07T02:43:37.502Z",
    "size": 17609,
    "path": "../public/images/f3.png"
  },
  "/images/f4.png": {
    "type": "image/png",
    "etag": "\"545a-/u35+WAj+nWAw7sT/v3Td2+EQh4\"",
    "mtime": "2023-07-07T02:43:37.503Z",
    "size": 21594,
    "path": "../public/images/f4.png"
  },
  "/images/f5.png": {
    "type": "image/png",
    "etag": "\"4fd4-0eaoj0vM6tp9VPAwHmghtpY5iUs\"",
    "mtime": "2023-07-07T02:43:37.503Z",
    "size": 20436,
    "path": "../public/images/f5.png"
  },
  "/images/f6.png": {
    "type": "image/png",
    "etag": "\"441e-OwljchxD+p9Q/2aRc6FLMqSQCQ0\"",
    "mtime": "2023-07-07T02:43:37.503Z",
    "size": 17438,
    "path": "../public/images/f6.png"
  },
  "/images/home-bg-1.jpg": {
    "type": "image/jpeg",
    "etag": "\"3bae-jRgjVIVw7KGS0q2KExtdYgPKGbU\"",
    "mtime": "2023-07-07T02:43:37.504Z",
    "size": 15278,
    "path": "../public/images/home-bg-1.jpg"
  },
  "/images/home-bg-2.png": {
    "type": "image/png",
    "etag": "\"659b8-/NuxiE/AVb91fFmWqt4DYMqTzfc\"",
    "mtime": "2023-07-07T02:43:37.508Z",
    "size": 416184,
    "path": "../public/images/home-bg-2.png"
  },
  "/images/logshoes.png": {
    "type": "image/png",
    "etag": "\"16d879-eUvVpMvMIkSrEWXVjIt9LOXldgU\"",
    "mtime": "2023-07-07T02:43:37.517Z",
    "size": 1497209,
    "path": "../public/images/logshoes.png"
  },
  "/images/Nike1.webp": {
    "type": "image/webp",
    "etag": "\"415e-NskXa5eMJdd7ShacuzrxZ/nM7J0\"",
    "mtime": "2023-07-07T02:43:37.487Z",
    "size": 16734,
    "path": "../public/images/Nike1.webp"
  },
  "/images/Nike2.webp": {
    "type": "image/webp",
    "etag": "\"4262-ATrK+ePNzG/+1nyP2o42HBhwG8A\"",
    "mtime": "2023-07-07T02:43:37.487Z",
    "size": 16994,
    "path": "../public/images/Nike2.webp"
  },
  "/images/Nike3.webp": {
    "type": "image/webp",
    "etag": "\"4352-7G8LpQCUnUcn2K7UtSlTtWTdMXA\"",
    "mtime": "2023-07-07T02:43:37.488Z",
    "size": 17234,
    "path": "../public/images/Nike3.webp"
  },
  "/images/Nike4.webp": {
    "type": "image/webp",
    "etag": "\"41e0-PSdnSlvcqnuYegiUxuNrzjDSsCA\"",
    "mtime": "2023-07-07T02:43:37.488Z",
    "size": 16864,
    "path": "../public/images/Nike4.webp"
  },
  "/videos/commercial.mp4": {
    "type": "video/mp4",
    "etag": "\"4e33d1-OZyLgGn15Gcc+pDj8sDe0Nc0BIQ\"",
    "mtime": "2023-07-07T02:43:37.548Z",
    "size": 5125073,
    "path": "../public/videos/commercial.mp4"
  },
  "/_nuxt/about.01bde533.js": {
    "type": "application/javascript",
    "etag": "\"1977-WMeG7Dv4SfGg7uATYqblMTiJYi8\"",
    "mtime": "2023-07-27T17:37:10.111Z",
    "size": 6519,
    "path": "../public/_nuxt/about.01bde533.js"
  },
  "/_nuxt/about.3200ee5a.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"1ce-4pNcOQFvh/7v8VAaU1Amq0EO58Y\"",
    "mtime": "2023-07-27T17:37:10.111Z",
    "size": 462,
    "path": "../public/_nuxt/about.3200ee5a.css"
  },
  "/_nuxt/auth.e048efd4.js": {
    "type": "application/javascript",
    "etag": "\"8f-RkADcKVocZR67Pjg7IJcZH1j1cI\"",
    "mtime": "2023-07-27T17:37:10.111Z",
    "size": 143,
    "path": "../public/_nuxt/auth.e048efd4.js"
  },
  "/_nuxt/carousel.6a08ff04.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"902-OTPW2sdBLu6tgfoZ3V2JQ8u33os\"",
    "mtime": "2023-07-27T17:37:10.111Z",
    "size": 2306,
    "path": "../public/_nuxt/carousel.6a08ff04.css"
  },
  "/_nuxt/carousel.es.a0d9fa34.js": {
    "type": "application/javascript",
    "etag": "\"286a-xa6BLFoxUlVWCBwTCkLcrtlfEXg\"",
    "mtime": "2023-07-27T17:37:10.116Z",
    "size": 10346,
    "path": "../public/_nuxt/carousel.es.a0d9fa34.js"
  },
  "/_nuxt/checkout.35cd15b3.js": {
    "type": "application/javascript",
    "etag": "\"1e2e-0AyhEmH5kXoVpHw1fqvDjTHUP8k\"",
    "mtime": "2023-07-27T17:37:10.111Z",
    "size": 7726,
    "path": "../public/_nuxt/checkout.35cd15b3.js"
  },
  "/_nuxt/contact.0fe33de8.js": {
    "type": "application/javascript",
    "etag": "\"114c-wm2HHuksZ8Pdbx1pAIRb+UeBJeE\"",
    "mtime": "2023-07-27T17:37:10.104Z",
    "size": 4428,
    "path": "../public/_nuxt/contact.0fe33de8.js"
  },
  "/_nuxt/default.2036ca0a.js": {
    "type": "application/javascript",
    "etag": "\"2865-pkHOZKDuzkvYd5BBDKgxLVMRUCs\"",
    "mtime": "2023-07-27T17:37:10.116Z",
    "size": 10341,
    "path": "../public/_nuxt/default.2036ca0a.js"
  },
  "/_nuxt/entry.af6a1f8b.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"bce59-gqfCY0sdg6ccl79rhHOCV1ZnoIc\"",
    "mtime": "2023-07-27T17:37:10.112Z",
    "size": 773721,
    "path": "../public/_nuxt/entry.af6a1f8b.css"
  },
  "/_nuxt/entry.f12bc80e.js": {
    "type": "application/javascript",
    "etag": "\"6aa25-NiqtZF23Pgfa8hQVyb3Eg2iFLOE\"",
    "mtime": "2023-07-27T17:37:10.116Z",
    "size": 436773,
    "path": "../public/_nuxt/entry.f12bc80e.js"
  },
  "/_nuxt/error-component.45cc58d8.js": {
    "type": "application/javascript",
    "etag": "\"35b9-spRyohbKeB4mMgahtSU+4U+/6/s\"",
    "mtime": "2023-07-27T17:37:10.111Z",
    "size": 13753,
    "path": "../public/_nuxt/error-component.45cc58d8.js"
  },
  "/_nuxt/error-component.74761eed.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"55c-GKI5eDRVav2sZZ2BeMaA3ocGILs\"",
    "mtime": "2023-07-27T17:37:10.111Z",
    "size": 1372,
    "path": "../public/_nuxt/error-component.74761eed.css"
  },
  "/_nuxt/fetch.eff98003.js": {
    "type": "application/javascript",
    "etag": "\"2bcc-fKdvs94AAzOcA7Fdg8swWJXTJOg\"",
    "mtime": "2023-07-27T17:37:10.116Z",
    "size": 11212,
    "path": "../public/_nuxt/fetch.eff98003.js"
  },
  "/_nuxt/index.7de30980.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"1a1-trQPryphKu971qC8ztUP1mOkAUg\"",
    "mtime": "2023-07-27T17:37:10.111Z",
    "size": 417,
    "path": "../public/_nuxt/index.7de30980.css"
  },
  "/_nuxt/index.87e71a00.js": {
    "type": "application/javascript",
    "etag": "\"12ba-eDwK6gSFYMOLOmRT923G5y5Nipc\"",
    "mtime": "2023-07-27T17:37:10.111Z",
    "size": 4794,
    "path": "../public/_nuxt/index.87e71a00.js"
  },
  "/_nuxt/index.91c90195.js": {
    "type": "application/javascript",
    "etag": "\"3bab-vTNO7lFUf0syIERiv8Qiq/ijvMk\"",
    "mtime": "2023-07-27T17:37:10.116Z",
    "size": 15275,
    "path": "../public/_nuxt/index.91c90195.js"
  },
  "/_nuxt/index.95129910.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"d4-xZ2FyaaOOVrqGNAOBvQgPffIm3A\"",
    "mtime": "2023-07-27T17:37:10.111Z",
    "size": 212,
    "path": "../public/_nuxt/index.95129910.css"
  },
  "/_nuxt/index.dd678d56.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"1e1-KmkQu8KtESp1oAIhwDFmuN0NJes\"",
    "mtime": "2023-07-27T17:37:10.111Z",
    "size": 481,
    "path": "../public/_nuxt/index.dd678d56.css"
  },
  "/_nuxt/index.f8cd1cb7.js": {
    "type": "application/javascript",
    "etag": "\"38de-EBCoeYAj7r+hD6puVfPntSVyADs\"",
    "mtime": "2023-07-27T17:37:10.116Z",
    "size": 14558,
    "path": "../public/_nuxt/index.f8cd1cb7.js"
  },
  "/_nuxt/login.69f97237.js": {
    "type": "application/javascript",
    "etag": "\"24d0-mDyNZJIxC6yEkoNSTXiMc7Hq5C0\"",
    "mtime": "2023-07-27T17:37:10.116Z",
    "size": 9424,
    "path": "../public/_nuxt/login.69f97237.js"
  },
  "/_nuxt/materialdesignicons-webfont.6d5e4be4.woff": {
    "type": "font/woff",
    "etag": "\"8ad48-8fBPxn8AuTHR6aNqnpd7/YZOYX8\"",
    "mtime": "2023-07-27T17:37:10.111Z",
    "size": 568648,
    "path": "../public/_nuxt/materialdesignicons-webfont.6d5e4be4.woff"
  },
  "/_nuxt/materialdesignicons-webfont.739dc70d.woff2": {
    "type": "font/woff2",
    "etag": "\"5fa08-x2c2gG9GszeWFK/zkIHWweCMXSI\"",
    "mtime": "2023-07-27T17:37:10.111Z",
    "size": 391688,
    "path": "../public/_nuxt/materialdesignicons-webfont.739dc70d.woff2"
  },
  "/_nuxt/materialdesignicons-webfont.c02d41ce.ttf": {
    "type": "font/ttf",
    "etag": "\"1340e0-0j+vWGoLzkw+W0jSd4RXTdcjOAI\"",
    "mtime": "2023-07-27T17:37:10.112Z",
    "size": 1261792,
    "path": "../public/_nuxt/materialdesignicons-webfont.c02d41ce.ttf"
  },
  "/_nuxt/materialdesignicons-webfont.f5966bae.eot": {
    "type": "application/vnd.ms-fontobject",
    "etag": "\"1341bc-IPFqEZIUYBdgxGkgWDK5VXZOlmw\"",
    "mtime": "2023-07-27T17:37:10.111Z",
    "size": 1262012,
    "path": "../public/_nuxt/materialdesignicons-webfont.f5966bae.eot"
  },
  "/_nuxt/nuxt-link.3617e960.js": {
    "type": "application/javascript",
    "etag": "\"f42-uz9VZLtkL1mryPZ+TC+QPTpquAM\"",
    "mtime": "2023-07-27T17:37:10.116Z",
    "size": 3906,
    "path": "../public/_nuxt/nuxt-link.3617e960.js"
  },
  "/_nuxt/profile.40ee77ae.js": {
    "type": "application/javascript",
    "etag": "\"1642-rIpfR7mJwNBDnGdq5POfL8hKNW0\"",
    "mtime": "2023-07-27T17:37:10.114Z",
    "size": 5698,
    "path": "../public/_nuxt/profile.40ee77ae.js"
  },
  "/_nuxt/signup.616f76e1.js": {
    "type": "application/javascript",
    "etag": "\"97-zHgmejBj2IsL5SCSF+/3y9NZT+Y\"",
    "mtime": "2023-07-27T17:37:10.111Z",
    "size": 151,
    "path": "../public/_nuxt/signup.616f76e1.js"
  },
  "/_nuxt/state.93432498.js": {
    "type": "application/javascript",
    "etag": "\"85-sCpb6/y2ZIdjyEwsC++Mn2/JX14\"",
    "mtime": "2023-07-27T17:37:10.111Z",
    "size": 133,
    "path": "../public/_nuxt/state.93432498.js"
  },
  "/_nuxt/test.593f4ed9.js": {
    "type": "application/javascript",
    "etag": "\"72ce-sZj7QYZ7lbWzI6rTRmEoTOCm6Xg\"",
    "mtime": "2023-07-27T17:37:10.116Z",
    "size": 29390,
    "path": "../public/_nuxt/test.593f4ed9.js"
  },
  "/_nuxt/thanksyou.eefd8e16.js": {
    "type": "application/javascript",
    "etag": "\"3e4-sHg2/+D9JQIeLXpT75F7Z4PuXQc\"",
    "mtime": "2023-07-27T17:37:10.111Z",
    "size": 996,
    "path": "../public/_nuxt/thanksyou.eefd8e16.js"
  },
  "/_nuxt/_id_.31f6b706.js": {
    "type": "application/javascript",
    "etag": "\"179c-8+CtMUy4VFGr/HF/ZoIiHbIejck\"",
    "mtime": "2023-07-27T17:37:10.111Z",
    "size": 6044,
    "path": "../public/_nuxt/_id_.31f6b706.js"
  },
  "/_nuxt/_id_.5bb62630.js": {
    "type": "application/javascript",
    "etag": "\"256f-kkIilL79ZpyqTBfvIVaeYStC4Fc\"",
    "mtime": "2023-07-27T17:37:10.116Z",
    "size": 9583,
    "path": "../public/_nuxt/_id_.5bb62630.js"
  }
};

function readAsset (id) {
  const serverDir = dirname(fileURLToPath(globalThis._importMeta_.url));
  return promises.readFile(resolve(serverDir, assets[id].path))
}

const publicAssetBases = {"/_nuxt":{"maxAge":2592000}};

function isPublicAssetURL(id = '') {
  if (assets[id]) {
    return true
  }
  for (const base in publicAssetBases) {
    if (id.startsWith(base)) { return true }
  }
  return false
}

function getAsset (id) {
  return assets[id]
}

const METHODS = /* @__PURE__ */ new Set(["HEAD", "GET"]);
const EncodingMap = { gzip: ".gz", br: ".br" };
const _f4b49z = eventHandler((event) => {
  if (event.node.req.method && !METHODS.has(event.node.req.method)) {
    return;
  }
  let id = decodeURIComponent(
    withLeadingSlash(
      withoutTrailingSlash(parseURL(event.node.req.url).pathname)
    )
  );
  let asset;
  const encodingHeader = String(
    event.node.req.headers["accept-encoding"] || ""
  );
  const encodings = [
    ...encodingHeader.split(",").map((e) => EncodingMap[e.trim()]).filter(Boolean).sort(),
    ""
  ];
  if (encodings.length > 1) {
    event.node.res.setHeader("Vary", "Accept-Encoding");
  }
  for (const encoding of encodings) {
    for (const _id of [id + encoding, joinURL(id, "index.html" + encoding)]) {
      const _asset = getAsset(_id);
      if (_asset) {
        asset = _asset;
        id = _id;
        break;
      }
    }
  }
  if (!asset) {
    if (isPublicAssetURL(id)) {
      event.node.res.removeHeader("cache-control");
      throw createError({
        statusMessage: "Cannot find static asset " + id,
        statusCode: 404
      });
    }
    return;
  }
  const ifNotMatch = event.node.req.headers["if-none-match"] === asset.etag;
  if (ifNotMatch) {
    event.node.res.statusCode = 304;
    event.node.res.end();
    return;
  }
  const ifModifiedSinceH = event.node.req.headers["if-modified-since"];
  if (ifModifiedSinceH && asset.mtime && new Date(ifModifiedSinceH) >= new Date(asset.mtime)) {
    event.node.res.statusCode = 304;
    event.node.res.end();
    return;
  }
  if (asset.type && !event.node.res.getHeader("Content-Type")) {
    event.node.res.setHeader("Content-Type", asset.type);
  }
  if (asset.etag && !event.node.res.getHeader("ETag")) {
    event.node.res.setHeader("ETag", asset.etag);
  }
  if (asset.mtime && !event.node.res.getHeader("Last-Modified")) {
    event.node.res.setHeader("Last-Modified", asset.mtime);
  }
  if (asset.encoding && !event.node.res.getHeader("Content-Encoding")) {
    event.node.res.setHeader("Content-Encoding", asset.encoding);
  }
  if (asset.size > 0 && !event.node.res.getHeader("Content-Length")) {
    event.node.res.setHeader("Content-Length", asset.size);
  }
  return readAsset(id);
});

const _lazy_KCRDhm = () => import('./renderer.mjs').then(function (n) { return n.r; });

const handlers = [
  { route: '', handler: _f4b49z, lazy: false, middleware: true, method: undefined },
  { route: '/__nuxt_error', handler: _lazy_KCRDhm, lazy: true, middleware: false, method: undefined },
  { route: '/**', handler: _lazy_KCRDhm, lazy: true, middleware: false, method: undefined }
];

function createNitroApp() {
  const config = useRuntimeConfig();
  const hooks = createHooks();
  const h3App = createApp({
    debug: destr(false),
    onError: errorHandler
  });
  const router = createRouter$1();
  h3App.use(createRouteRulesHandler());
  const localCall = createCall(toNodeListener(h3App));
  const localFetch = createFetch(localCall, globalThis.fetch);
  const $fetch = createFetch$1({
    fetch: localFetch,
    Headers,
    defaults: { baseURL: config.app.baseURL }
  });
  globalThis.$fetch = $fetch;
  h3App.use(
    eventHandler((event) => {
      const envContext = event.node.req.__unenv__;
      if (envContext) {
        Object.assign(event.context, envContext);
      }
      event.fetch = (req, init) => fetchWithEvent(event, req, init, { fetch: localFetch });
      event.$fetch = (req, init) => fetchWithEvent(event, req, init, { fetch: $fetch });
    })
  );
  for (const h of handlers) {
    let handler = h.lazy ? lazyEventHandler(h.handler) : h.handler;
    if (h.middleware || !h.route) {
      const middlewareBase = (config.app.baseURL + (h.route || "/")).replace(
        /\/+/g,
        "/"
      );
      h3App.use(middlewareBase, handler);
    } else {
      const routeRules = getRouteRulesForPath(
        h.route.replace(/:\w+|\*\*/g, "_")
      );
      if (routeRules.cache) {
        handler = cachedEventHandler(handler, {
          group: "nitro/routes",
          ...routeRules.cache
        });
      }
      router.use(h.route, handler, h.method);
    }
  }
  h3App.use(config.app.baseURL, router);
  const app = {
    hooks,
    h3App,
    router,
    localCall,
    localFetch
  };
  for (const plugin of plugins) {
    plugin(app);
  }
  return app;
}
const nitroApp = createNitroApp();
const useNitroApp = () => nitroApp;

const cert = process.env.NITRO_SSL_CERT;
const key = process.env.NITRO_SSL_KEY;
const server = cert && key ? new Server({ key, cert }, toNodeListener(nitroApp.h3App)) : new Server$1(toNodeListener(nitroApp.h3App));
const port = destr(process.env.NITRO_PORT || process.env.PORT) || 3e3;
const host = process.env.NITRO_HOST || process.env.HOST;
const s = server.listen(port, host, (err) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  const protocol = cert && key ? "https" : "http";
  const i = s.address();
  const baseURL = (useRuntimeConfig().app.baseURL || "").replace(/\/$/, "");
  const url = `${protocol}://${i.family === "IPv6" ? `[${i.address}]` : i.address}:${i.port}${baseURL}`;
  console.log(`Listening ${url}`);
});
{
  process.on(
    "unhandledRejection",
    (err) => console.error("[nitro] [dev] [unhandledRejection] " + err)
  );
  process.on(
    "uncaughtException",
    (err) => console.error("[nitro] [dev] [uncaughtException] " + err)
  );
}
const nodeServer = {};

export { useRuntimeConfig as a, getRouteRules as g, nodeServer as n, useNitroApp as u };
//# sourceMappingURL=node-server.mjs.map
