const fs = require('fs');
const sharp = require('sharp');

async function combineAndTrim() {
  const maskBuf = fs.readFileSync('public/image_0.png');
  const rgbBuf = fs.readFileSync('public/image_1.png');

  // Let's create an RGBA image using rgb and alpha from mask
  const { data: rgbData, info } = await sharp(rgbBuf).raw().toBuffer({ resolveWithObject: true });
  const { data: maskData } = await sharp(maskBuf).raw().toBuffer({ resolveWithObject: true });

  const width = info.width;
  const height = info.height;
  const rgbaBuffer = Buffer.alloc(width * height * 4);

  for (let i = 0; i < width * height; i++) {
    rgbaBuffer[i * 4] = rgbData[i * 3];         // R
    rgbaBuffer[i * 4 + 1] = rgbData[i * 3 + 1]; // G
    rgbaBuffer[i * 4 + 2] = rgbData[i * 3 + 2]; // B
    rgbaBuffer[i * 4 + 3] = maskData[i];       // Alpha from mask
  }

  // Create PNG from raw RGBA
  const pngBuffer = await sharp(rgbaBuffer, { raw: { width, height, channels: 4 } }).png().toBuffer();

  // Now trim the transparent border
  const trimmedBuf = await sharp(pngBuffer).trim().png().toBuffer();
  const trimmedMeta = await sharp(trimmedBuf).metadata();
  console.log('Trimmed Transparent Logo Size:', trimmedMeta.width, 'x', trimmedMeta.height);

  await sharp(trimmedBuf).png().toFile('public/do-reports-logo.png');
  await sharp(trimmedBuf).png().toFile('public/logo.png');

  const base64 = trimmedBuf.toString('base64');
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${trimmedMeta.width} ${trimmedMeta.height}" width="${trimmedMeta.width}" height="${trimmedMeta.height}">
  <image width="${trimmedMeta.width}" height="${trimmedMeta.height}" href="data:image/png;base64,${base64}"/>
</svg>`;

  fs.writeFileSync('public/do-reports-logo.svg', svg);
  fs.writeFileSync('public/logo.svg', svg);

  console.log('Done creating crystal clear transparent logo!');
}

combineAndTrim();
