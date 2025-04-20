import { glob } from "glob";
import fs from "fs";
import path from "path";
import sharp from "sharp";

/*
  compresses images according to the settings below
  input is based on current working directory,
  make sure you're at the base project directory
  

  run with `node compress-images.js`
*/

const output_path = "./compressed";
const images = await glob(`./uncompressed/**/*.png`);

images.forEach(async (image_path) => {
  const image_output_path = path.join(
    output_path,
    path.dirname(image_path).substring(image_path.indexOf("\\")),
  );

  fs.mkdirSync(image_output_path, {
    recursive: true,
  });

  // compression settings
  try {
    await sharp(image_path)
      .avif({ quality: 75 })
      .toFile(
        path.join(
          image_output_path,
          path.basename(image_path, ".png") + ".avif",
        ),
      );
  } catch (error) {
    console.log(error);
  }
});
