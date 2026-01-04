import { glob } from "glob";
import process from "process";
import fs from "fs";
import path from "path";
import sharp from "sharp";

const opt = process.argv[2];

/*
  compresses images according to the settings below
  input is based on current working directory,
  make sure you're at the base project directory
  
  run with `node scripts/compress-images.js` or `npm run compress`

  there are multiple modes to compress with, you can switch between them by adding a number arg
  e.g 
  `node scripts/compress-images.js 2`
  `npm run compress 2`

  (worse quality, intended to be compressed variants of images)
  1 - default, resize width to 1000px (maintaining aspect ratio), convert to avif with 75 quality
  2 - convert to avif with 50 quality

  (better quality, intended to "replace" original assets which are too large to serve in the imagemodal)
  3 - resize to 2560, keep as png 
  4 - resize to 2560, convert to jpeg with 75 quality

  (banner specific - for savage/extreme/ultimate entries)
  5 - resize to 1200x400 (crop center), convert to avif with 90 quality
*/

const output_path = "./compressed";
const images = await glob(`./uncompressed/**/*.png`);

images.forEach(async (image_path) => {
  const image_output_path = path.join(
    output_path,
    path.dirname(image_path).substring(image_path.indexOf(path.sep)),
  );

  fs.mkdirSync(image_output_path, {
    recursive: true,
  });

  // compression settings
  try {
    let compressed = sharp(image_path);
    let ext = "";

    switch (opt) {
      case "2":
        compressed = compressed.avif({ quality: 50 });
        ext = ".avif";
        break;
      case "3":
        compressed = compressed.resize(2560).png();
        ext = ".avif";
        break;
      case "4":
        compressed = compressed.resize(2560).jpeg({ quality: 75 });
        ext = ".jpeg";
        break;
      case "5":
        compressed = compressed
          .resize(1200, 400, {
            fit: "cover",
            position: "center",
          })
          .avif({ quality: 90 });
        ext = ".avif";
        break;
      case "1":
      default:
        compressed = compressed.resize(1000).avif({ quality: 75 });
        ext = ".png";
        break;
    }

    await compressed.toFile(
      path.join(image_output_path, path.basename(image_path, ".png") + ext),
    );
  } catch (error) {
    console.log(error);
  }
});
