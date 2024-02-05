import fs from "fs";
import path from "path";

const keys = ["components", "pages", "snippets"];
const singleFileKeys = ["designSystem", "state"];

export function createDirs(body, distDir) {
  if (!body) {
    console.error("No JSON object provided. Exiting.");
    return;
  }

  distDir = distDir || path.join(process.cwd(), "dist");

  keys.forEach((key) => {
    createKeyDirectoryAndFiles(key, body, distDir);
  });

  singleFileKeys.forEach((key) => {
    if (body[key] && typeof body[key] === "object") {
      createSingleFileFolderAndFile(key, body[key], distDir);
    }
  });
}

function createKeyDirectoryAndFiles(key, body, distDir) {
  const dirPath = path.join(distDir, key);
  fs.existsSync(dirPath) || fs.mkdirSync(dirPath, { recursive: true });
  console.log(
    `${fs.existsSync(dirPath) ? "Found" : "Created"} directory: ${dirPath}`
  );

  if (body[key] && typeof body[key] === "object") {
    Object.entries(body[key]).forEach(([childKey, value]) => {
      createOrUpdateFile(dirPath, childKey, value);
    });
  }
}

function createOrUpdateFile(dirPath, childKey, value) {
  const filePath = path.join(dirPath, `${childKey}.js`);
  const content = `export default ${JSON.stringify(value, null, 2)};`;
  const fileExists = fs.existsSync(filePath);

  console.log(`${fileExists ? "Updating" : "Creating new"} file: ${filePath}`);
  (fileExists && fs.readFileSync(filePath, "utf8") === content) ||
    fs.writeFileSync(filePath, content);
}

function createSingleFileFolderAndFile(key, data, distDir) {
  const dirPath = path.join(distDir, key);
  fs.existsSync(dirPath) || fs.mkdirSync(dirPath, { recursive: true });
  console.log(
    `${fs.existsSync(dirPath) ? "Found" : "Created"} directory: ${dirPath}`
  );

  const filePath = path.join(dirPath, `${key}.js`);
  const content = `export default ${JSON.stringify(data, null, 2)};`;
  const fileExists = fs.existsSync(filePath);

  console.log(`${fileExists ? "Updating" : "Creating new"} file: ${filePath}`);
  (fileExists && fs.readFileSync(filePath, "utf8") === content) ||
    fs.writeFileSync(filePath, content);
}
