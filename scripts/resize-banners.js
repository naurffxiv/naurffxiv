/* eslint-disable @typescript-eslint/no-require-imports,
@typescript-eslint/explicit-function-return-type */

/*
  Resizes banner images in the public/images/thumbnails directory to a standardized size.
  
  TARGETS:
  - public/images/thumbnails/extreme
  - public/images/thumbnails/savage
  - public/images/thumbnails/ultimate

  OPERATION:
  - Recursive search through target folders
  - Resizes images to 1200x400 (3:1 aspect ratio)
  - Uses 'cover' fit strategies with 'center' gravity
  
  FILTERS:
  - Processes ONLY .avif and .webp files
  - Skips .png and .jpg (preserves originals)
  - Ignores folders named "marker" or "timeline"
  
  USAGE:
  `node scripts/resize-banners.js`
  
  WARNING: This script OVERWRITES the target files in place. 
  Make sure you have a backup or clean git state before running.
*/

const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const projectRoot = path.join(__dirname, "..");
const thumbnailDir = path.join(projectRoot, "public", "images", "thumbnails");

const folders = [
  path.join(thumbnailDir, "extreme"),
  path.join(thumbnailDir, "savage"),
  path.join(thumbnailDir, "ultimate"),
];

let stats = { processed: 0, skipped: 0, failed: 0 };

async function processDirectory(dir) {
  const items = fs.readdirSync(dir, { withFileTypes: true });

  for (const item of items) {
    const fullPath = path.join(dir, item.name);

    // Ignore specific folders
    if (item.isDirectory()) {
      if (
        item.name.toLowerCase().includes("marker") ||
        item.name.toLowerCase().includes("timeline")
      ) {
        console.log(`Skipping folder: ${item.name}`);
        continue;
      }
      await processDirectory(fullPath);
      continue;
    }

    // Process images (only AVIF/WEBP, skip originals)
    if (item.isFile() && item.name.match(/\.(avif|webp)$/i)) {
      const tempPath = path.join(dir, `temp_${item.name}`);
      const ext = path.extname(item.name).toLowerCase();

      try {
        // Preserve format, especially important for AVIF
        const pipeline = sharp(fullPath).resize(1200, 400, {
          fit: "cover",
          position: "center",
        });

        // Keep original format
        if (ext === ".avif") {
          await pipeline.avif().toFile(tempPath);
        } else if (ext === ".webp") {
          await pipeline.webp().toFile(tempPath);
        }

        fs.unlinkSync(fullPath);
        fs.renameSync(tempPath, fullPath);

        stats.processed++;
        console.log(`Resized: ${path.relative(projectRoot, fullPath)}`);
      } catch (error) {
        stats.failed++;
        console.error(`Failed to process ${item.name}:`, error.message);
        if (fs.existsSync(tempPath)) {
          fs.unlinkSync(tempPath);
        }
      }
    } else if (item.isFile()) {
      stats.skipped++;
    }
  }
}

async function processImages() {
  console.log("WARNING: This will OVERWRITE original images!");
  console.log("Make sure you have a backup before proceeding.\n");
  console.log("Starting image processing...\n");

  for (const folder of folders) {
    if (!fs.existsSync(folder)) {
      console.warn(`Folder not found: ${folder}`);
      continue;
    }
    console.log(`Processing: ${path.relative(projectRoot, folder)}`);
    await processDirectory(folder);
  }

  console.log("\nSummary:");
  console.log(`Processed: ${stats.processed}`);
  console.log(`Skipped: ${stats.skipped}`);
  console.log(`Failed: ${stats.failed}`);
}

processImages()
  .then(() => {
    console.log("\nDone processing images.");
  })
  .catch((err) => {
    console.error("\nFatal error:", err);
  });
