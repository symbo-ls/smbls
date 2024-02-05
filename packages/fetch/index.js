"use strict";

import * as utils from "@domql/utils";
import * as globals from "@domql/globals";
import { json2fs } from "../fs.js";
const { overwriteDeep, deepDestringify } = utils;
const { window } = globals;

const IS_DEVELOPMENT =
  window && window.location
    ? window.location.host.includes("dev.") ||
      window.location.host.includes("symbo.ls")
    : process.env.NODE_ENV === "development";

const SERVER_URL = IS_DEVELOPMENT
  ? "http://localhost:13335/get/"
  : "https://api.symbols.app/get/";

const defaultOptions = {
  endpoint: SERVER_URL,
};

export const fetch = globalThis.fetch;

export const fetchRemote = async (key, options = defaultOptions) => {
  const baseUrl = options.endpoint || SERVER_URL;
  const route = options.serviceRoute
    ? utils.isArray(options.serviceRoute)
      ? options.serviceRoute.map((v) => v.toLowerCase()).join(",")
      : options.serviceRoute
    : "";

  let response;
  try {
    response = await fetch(baseUrl + route, {
      method: "GET",
      headers: { "Content-Type": "application/json", "X-AppKey": key },
    });

    return await response.json();
  } catch (e) {
    if (utils.isFunction(options.onError)) return options.onError(e);
    else console.error(e);
  }
};

export const fetchProject = async (key, options) => {
  const { editor } = options;

  if (editor && editor.remote) {
    const data = await fetchRemote(key, editor);
    const evalData = IS_DEVELOPMENT
      ? deepDestringify(data)
      : deepDestringify(data.releases[0]);

    if (editor.serviceRoute) {
      if (utils.isArray(editor.serviceRoute)) {
        editor.serviceRoute.forEach((route) => {
          overwriteDeep(options[route], evalData[route.toLowerCase()]);
        });
      } else {
        overwriteDeep(options[editor.serviceRoute], evalData);
      }
    } else {
      [
        "state",
        "designSystem",
        "components",
        "snippets",
        "pages",
        "utils",
        "functions",
      ].forEach((key) => {
        overwriteDeep(options[key], evalData[key.toLowerCase()]);
      });
    }
  }

  return options;
};

export const fetchProjectAsync = async (key, options, callback) => {
  const { editor } = options;

  if (editor && editor.remote) {
    const data = await fetchRemote(key, editor);
    const evalData = IS_DEVELOPMENT
      ? deepDestringify(data)
      : deepDestringify(data.releases[0]);
    callback(evalData);
  }
};
