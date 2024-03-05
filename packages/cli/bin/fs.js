"use strict";

import fs from "fs";
import path from "path";
import utils from "@domql/utils";
import { exit } from "process";
const { deepDestringify, objectToString, joinArrays } = utils;

const keys = ["components", "snippets", "pages"];
const singleFileKeys = ["designSystem", "state"];

export function createFs(body, distDir, update) {
  if (!body) {
    console.error("No JSON object provided. Exiting.");
    return;
  }

  distDir = distDir || path.join(process.cwd(), "dist");

  const targetDir = update ? path.join(distDir, ".cache") : distDir;
  if (update && !fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  keys.forEach((key) => {
    createKeyDirectoryAndFiles(key, body, targetDir, update);
  });

  singleFileKeys.forEach((key) => {
    if (body[key] && typeof body[key] === "object") {
      createSingleFileFolderAndFile(key, body[key], targetDir, update);
    }
  });

  generateIndexjsFile(joinArrays(keys, singleFileKeys), targetDir);
}

async function generateIndexjsFile(dirs, dirPath) {
  const indexContent =
    dirs.map((d) => `export * from './${d}'`).join("\n") + "\n";
  const indexFilePath = path.join(dirPath, "index.js");
  const fh = await fs.promises.open(indexFilePath, "w");
  await fh.writeFile(indexContent, "utf8");
  await fh.close();
}

async function createKeyDirectoryAndFiles(key, body, distDir, update) {
  const dirPath = path.join(distDir, key);
  if (update || !fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
    console.log(
      `${fs.existsSync(dirPath) ? "Found" : "Created"} directory: ${dirPath}`
    );
  }

  const dirs = [];
  if (body[key] && typeof body[key] === "object") {
    for (const [entryKey, value] of Object.entries(body[key])) {
      let childKey = entryKey;
      if (["/", "//", "*", ".", "**", "_"].includes(childKey.charAt(0))) {
        childKey = childKey.slice(1);
        if (!childKey.length) childKey = "main";
      }
      createOrUpdateFile(dirPath, childKey, value, update);
      dirs.push(childKey);
    }
  }

  generateIndexjsFile(dirs, dirPath);
}

function createOrUpdateFile(dirPath, childKey, value, update) {
  const filePath = path.join(dirPath, `${childKey}.js`);

  if (!update && fs.existsSync(filePath)) {
    console.log(
      `File ${filePath} exists. Skipping creation due to lack of update flag.`
    );
    return;
  }

  const content = deepDestringify(value);
  const stringifiedContent = `export const ${childKey} = ${objectToString(
    content
  )}`;

  console.log(
    `${fs.existsSync(filePath) ? "Updating" : "Creating new"} file: ${filePath}`
  );
  fs.writeFileSync(filePath, stringifiedContent);
}

function createSingleFileFolderAndFile(key, data, distDir, update) {
  const filePath = path.join(distDir, `${key}.js`);

  if (!update && fs.existsSync(filePath)) {
    console.log(
      `File ${filePath} exists. Skipping creation due to lack of update flag.`
    );
  }

  const content = deepDestringify(data);
  const stringifiedContent = `export default ${objectToString(content)}`;
  console.log(`Creating new file: ${filePath}`);
  fs.writeFileSync(filePath, stringifiedContent);
}
