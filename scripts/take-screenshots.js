const { execFileSync } = require("child_process");
const fs = require("fs");
const path = require("path");

const edgePath = "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";
const outputDir = path.resolve(__dirname, "../screenshots");
if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });

const targets = [
  { url: "http://localhost:3000/intake", file: "intake_form.png" },
  { url: "http://localhost:3000/account", file: "client_portal.png" },
  { url: "http://localhost:3000/admin/cases", file: "restricted_case_view.png" },
];

for (const target of targets) {
  const dest = path.join(outputDir, target.file);
  console.log(`Capturing ${target.url} -> ${dest}`);
  try {
    execFileSync(
      edgePath,
      [
        "--headless",
        "--disable-gpu",
        `--screenshot=${dest}`,
        "--window-size=1280,1000",
        "--hide-scrollbars",
        target.url,
      ],
      { timeout: 15000 }
    );
    console.log(`Saved: ${dest} (exists: ${fs.existsSync(dest)})`);
    if (fs.existsSync(dest)) {
      const stats = fs.statSync(dest);
      console.log(`Size: ${stats.size} bytes`);
    }
  } catch (err) {
    console.error(`Error on ${target.url}:`, err.message);
  }
}
