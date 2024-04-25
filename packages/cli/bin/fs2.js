import fs from "fs";
import path from "path";
import { loadModule } from "./require.js";

const folders = ["components", "snippets", "pages"];
const singleFileKeys = ["designSystem", "state"];
const defaultExports = ["pages", "designSystem", "state"];

const RC_PATH = process.cwd() + "/symbols.json";

const rcFile = loadModule(RC_PATH); // eslint-disable-line

let rc = {};
try {
  rc = loadModule(RC_PATH); // eslint-disable-line
} catch (e) {
  console.error("Please include symbols.json to your root of respository");
}

export async function fs2js() {
  buildJsonFromFiles();
}

async function parseFile(filePath) {
  const content = await fs.promises.readFile(filePath, "utf8");
  const match = content.match(/export default\s+({[\s\S]*});/);
  if (match && match[1]) {
    try {
      return eval(`(${match[1]})`);
    } catch (error) {
      console.error("Error parsing content to JSON:", error);
      return null;
    }
  }
  return null;
}

async function buildJsonFromFiles() {
  await rc.then(async (data) => {
    const { key, framework, distDir } = data;
    const distdir = data.distDir;

    const promises = [];
    const resultJson = {};

    singleFileKeys.forEach((file) => {
      const filePath = path.join(distdir, `${file}.js`);
      const promise = fs.promises
        .readFile(filePath, "utf8")
        .then((content) => {
          // Simple regex to extract the export default object. This might need refinement for complex cases.
          const match = content.match(/export default\s+({[\s\S]*});/);
          if (match && match[1]) {
            // Attempt to convert the object string to JSON
            try {
              // Use eval in a very controlled way since we trust the source
              const parsedObject = eval(`(${match[1]})`);
              resultJson[key] = parsedObject;
            } catch (error) {
              console.error("Error parsing content to JSON:", error);
            }
          }
        })
        .catch((error) => {
          console.error(`Error reading or parsing file ${key}.js:`, error);
        });
      promises.push(promise);
    });
    // Wait for all file reading and parsing promises to complete
    await Promise.all(promises).then(() => {
      // Define the output file path
      const outputPath = path.join(distdir, "finalResult.json");

      // Write the resultJson object to a file
      fs.promises
        .writeFile(outputPath, JSON.stringify(resultJson, null, 2))
        .then(() => console.log(`Output written to ${outputPath}`))
        .catch((error) => console.error("Error writing final output:", error));
    });
  });
}
