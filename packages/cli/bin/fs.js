import fs from "fs";
import path from "path";
import utils from "@domql/utils";
import inquirer from "inquirer";
import { createPatch } from "diff";

const { deepDestringify, objectToString, joinArrays } = utils;

const keys = ["components", "snippets", "pages"];
const singleFileKeys = ["designSystem", "state"];

export async function createFs(
  body,
  distDir = path.join(process.cwd(), "dist"),
  update = false
) {
  if (!body) {
    console.error("No JSON object provided. Exiting.");
    return;
  }

  const targetDir = update ? path.join(distDir, ".cache") : distDir;
  await fs.promises.mkdir(targetDir, { recursive: true });

  const promises = [
    ...keys.map((key) =>
      createKeyDirectoryAndFiles(key, body, targetDir, update)
    ),
    ...singleFileKeys.map((key) => {
      if (body[key] && typeof body[key] === "object") {
        return createSingleFileFolderAndFile(key, body[key], targetDir, update);
      }
    }),
  ];

  await Promise.all(promises);
  await generateIndexjsFile(joinArrays(keys, singleFileKeys), targetDir);

  if (!update) {
    const diffs = await findDiff(targetDir, distDir);
    if (diffs.length > 0) {
      console.log("Differences found:");
      diffs.forEach((diff) => {
        console.log(`File: ${diff.file}`);
        console.log("Diff:");
        console.log(diff.diff);
        console.log("---");
      });

      const { consent } = await askForConsent();
      if (consent) {
        await overrideFiles(targetDir, distDir);
        console.log("Files overridden successfully.");
      } else {
        console.log("Files not overridden.");
      }
    } else {
      console.log("No differences found.");
    }
  }
}

async function createKeyDirectoryAndFiles(key, body, distDir, update) {
  const dirPath = path.join(distDir, key);
  await fs.promises.mkdir(dirPath, { recursive: true });

  const dirs = [];
  const mainContent = {};

  const specialPrefixes = ["**", "//", "__", "..", "*", "/"];

  if (body[key] && typeof body[key] === "object") {
    const promises = Object.entries(body[key]).map(
      async ([entryKey, value]) => {
        if (
          key === "pages" &&
          specialPrefixes.some((prefix) => entryKey.startsWith(prefix))
        ) {
          mainContent[entryKey] = value;
        } else {
          let childKey = entryKey;
          if (["*", ".", "_"].includes(childKey.charAt(0))) {
            childKey = childKey.slice(1);
            if (!childKey.length) childKey = "index";
          }
          await createOrUpdateFile(dirPath, childKey, value, update);
          dirs.push(childKey);
        }
      }
    );

    await Promise.all(promises);
  }

  if (key === "pages" && Object.keys(mainContent).length > 0) {
    const mainContentString = Object.entries(mainContent)
      .map(([entryKey, value]) => {
        const exportName = specialPrefixes.some((prefix) =>
          entryKey.startsWith(prefix)
        )
          ? "main"
          : entryKey.replace(/^[*/_.]+/, "").replace(/\W/g, "_");
        return `export const ${exportName} = ${JSON.stringify(
          value,
          null,
          2
        )};`;
      })
      .join("\n");
    await createOrUpdateFile(dirPath, "main", mainContentString, update);
    dirs.push("main");
  }

  await generateIndexjsFile(dirs, dirPath);
}

async function createOrUpdateFile(dirPath, childKey, value, update) {
  const filePath = path.join(dirPath, `${childKey}.js`);

  if (!update && fs.existsSync(filePath)) {
    return;
  }

  const content = deepDestringify(value);
  const stringifiedContent = `export const ${childKey} = ${objectToString(
    content
  )};`;

  await fs.promises.writeFile(filePath, stringifiedContent, "utf8");
}

async function createSingleFileFolderAndFile(key, data, distDir, update) {
  const filePath = path.join(distDir, `${key}.js`);

  if (!update && fs.existsSync(filePath)) {
    return;
  }

  const content = deepDestringify(data);
  const stringifiedContent = `export default ${objectToString(content)};`;

  await fs.promises.writeFile(filePath, stringifiedContent, "utf8");
}

async function generateIndexjsFile(dirs, dirPath) {
  const indexContent =
    dirs.map((d) => `export * from './${d}';`).join("\n") + "\n";
  const indexFilePath = path.join(dirPath, "index.js");
  await fs.promises.writeFile(indexFilePath, indexContent, "utf8");
}

async function findDiff(targetDir, distDir) {
  const diffs = [];

  for (const key of keys) {
    const targetDirPath = path.join(targetDir, key);
    const distDirPath = path.join(distDir, key);

    if (!fs.existsSync(targetDirPath)) {
      continue;
    }

    const targetFiles = await fs.promises.readdir(targetDirPath);
    for (const file of targetFiles) {
      const targetFilePath = path.join(targetDirPath, file);
      const distFilePath = path.join(distDirPath, file);

      if (!fs.existsSync(distFilePath)) {
        continue;
      }

      const targetContent = await fs.promises.readFile(targetFilePath, "utf8");
      const distContent = await fs.promises.readFile(distFilePath, "utf8");

      if (targetContent !== distContent) {
        const diff = createPatch(file, targetContent, distContent);
        diffs.push({
          file: path.join(key, file),
          diff,
        });
      }
    }
  }

  for (const key of singleFileKeys) {
    const targetFilePath = path.join(targetDir, `${key}.js`);
    const distFilePath = path.join(distDir, `${key}.js`);

    if (!fs.existsSync(targetFilePath) || !fs.existsSync(distFilePath)) {
      continue;
    }

    const targetContent = await fs.promises.readFile(targetFilePath, "utf8");
    const distContent = await fs.promises.readFile(distFilePath, "utf8");

    if (targetContent !== distContent) {
      const diff = createPatch(key, targetContent, distContent);
      diffs.push({
        file: `${key}.js`,
        diff,
      });
    }
  }

  return diffs;
}

async function askForConsent() {
  const questions = [
    {
      type: "confirm",
      name: "consent",
      message: "Do you want to override the files?",
      default: false,
    },
  ];

  return inquirer.prompt(questions);
}

async function overrideFiles(targetDir, distDir) {
  for (const key of keys) {
    const targetDirPath = path.join(targetDir, key);
    const distDirPath = path.join(distDir, key);

    if (!fs.existsSync(targetDirPath)) {
      continue;
    }

    const targetFiles = await fs.promises.readdir(targetDirPath);
    for (const file of targetFiles) {
      const targetFilePath = path.join(targetDirPath, file);
      const distFilePath = path.join(distDirPath, file);

      if (!fs.existsSync(distFilePath)) {
        continue;
      }

      await fs.promises.copyFile(targetFilePath, distFilePath);
    }
  }

  for (const key of singleFileKeys) {
    const targetFilePath = path.join(targetDir, `${key}.js`);
    const distFilePath = path.join(distDir, `${key}.js`);

    if (!fs.existsSync(targetFilePath) || !fs.existsSync(distFilePath)) {
      continue;
    }

    await fs.promises.copyFile(targetFilePath, distFilePath);
  }
}
