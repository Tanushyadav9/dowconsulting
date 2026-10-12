const { execFileSync } = require("child_process");
const fs = require("fs");
const path = require("path");

const edgePath = "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";
const outputDir = path.resolve(__dirname, "../screenshots");
if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });

const pages = [
  { name: "home", path: "/" },
  { name: "about", path: "/about" },
  { name: "services_overview", path: "/services" },
  { name: "service_detail_gtm", path: "/services/gtm-strategy-and-distribution" },
  { name: "approach", path: "/approach" },
  { name: "contact", path: "/contact" },
  { name: "terms", path: "/terms" },
  { name: "privacy_policy", path: "/privacy-policy" },
  { name: "disclaimer", path: "/disclaimer" },
];

const viewports = [
  { label: "mobile_390px", width: 390, height: 844 },
  { label: "desktop_1440px", width: 1440, height: 900 },
];

async function capture() {
  console.log("Starting screenshots capture...");
  for (const page of pages) {
    const url = `http://localhost:3000${page.path}`;
    for (const vp of viewports) {
      const fileName = `${page.name}_${vp.label}.png`;
      const dest = path.join(outputDir, fileName);
      console.log(`Capturing [${vp.label}] ${url} -> ${fileName}`);
      try {
        execFileSync(
          edgePath,
          [
            "--headless=new",
            "--disable-gpu",
            "--hide-scrollbars",
            `--window-size=${vp.width},${vp.height}`,
            `--screenshot=${dest}`,
            url,
          ],
          { timeout: 20000 }
        );
        if (fs.existsSync(dest)) {
          const stats = fs.statSync(dest);
          console.log(`✓ Saved ${fileName} (${stats.size} bytes)`);
        } else {
          console.error(`✗ File not created: ${dest}`);
        }
      } catch (err) {
        console.error(`Error capturing ${url} at ${vp.width}px:`, err.message);
      }
    }
  }
  console.log("Screenshot capture complete.");
}

capture();
