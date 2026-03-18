const fs = require('fs');
const path = require('path');
const lz = require('lz-string');

function encodeFiles(files) {
  return lz.compressToEncodedURIComponent(JSON.stringify(files));
}

function encodeShareURL({ files, label }) {
  const url = new URL("https://playground.opendatacapture.org");
  url.searchParams.append("files", encodeFiles(files));
  url.searchParams.append("label", lz.compressToEncodedURIComponent(label));
  return url.toString();
}

const formsDir = path.join(process.cwd(), 'public/forms');
const readmePath = path.join(process.cwd(), 'README.md');

// 1. Find all index files mirroring your glob: ../public/forms/**/index.{js,jsx,ts,tsx}
let markdownLinks = "### Available Forms\n\n";

if (fs.existsSync(formsDir)) {
  const folders = fs.readdirSync(formsDir);

  folders.forEach(folder => {
    const folderPath = path.join(formsDir, folder);
    if (fs.lstatSync(folderPath).isDirectory()) {
      // Look for any index file variation
      const files = fs.readdirSync(folderPath);
      const indexFile = files.find(f => f.startsWith('index.'));

      if (indexFile) {
        const content = fs.readFileSync(path.join(folderPath, indexFile), 'utf8');
        const formLabel = folder; // Equivalent to filepath.split("/")[3]
        
        const url = encodeShareURL({
          label: formLabel,
          files: [{ name: indexFile, content: content }]
        });

        markdownLinks += `* [**${formLabel}**](${url}) \n`;
      }
    }
  });
}

// 2. Inject into README
const readmeContent = fs.readFileSync(readmePath, 'utf8');
const startMarker = "<!-- FORMS_START -->";
const endMarker = "<!-- FORMS_END -->";

const regex = new RegExp(`${startMarker}[\\s\\S]*?${endMarker}`);
const updatedReadme = readmeContent.replace(
  regex, 
  `${startMarker}\n\n${markdownLinks}\n${endMarker}`
);

fs.writeFileSync(readmePath, updatedReadme);
console.log("README updated successfully!");