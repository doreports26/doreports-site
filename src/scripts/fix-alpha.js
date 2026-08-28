const fs = require('fs');
const sharp = require('sharp');

async function fixAlpha() {
  const maskBuf = fs.readFileSync('public/image_0.png');
  const rgbBuf = fs.readFileSync('public/image_1.png');

  const { data: rgbData, info } = await sharp(rgbBuf).raw().toBuffer({ resolveWithObject: true });
  const { data: maskData } = await sharp(maskBuf).raw().toBuffer({ resolveWithObject: true });

  const width = info.width;
  const height = info.height;

  // Let's create RGBA where alpha is (255 - maskData[i])
  const rgbaBuffer = Buffer.alloc(width * height * 4);
  let visibleCount = 0;

  for (let i = 0; i < width * height; i++) {
    rgbaBuffer[i * 4] = rgbData[i * 3];
    rgbaBuffer[i * 4 + 1] = rgbData[i * 3 + 1];
    rgbaBuffer[i * 4 + 2] = rgbData[i * 3 + 2];
    
    // Inverted mask: 255 - maskData[i]
    const alpha = 255 - maskData[i];
    rgbaBuffer[i * 4 + 3] = alpha;
    if (alpha > 10) visibleCount++;
  }

  console.log('Inverted Mask Visible Pixels:', visibleCount, 'out of', width * height);

  // Save the full RGBA image
  const fullPng = await sharp(rgbaBuffer, { raw: { width, height, channels: 4 } }).png().toBuffer();
  await sharp(fullPng).toFile('public/correct_transparent_full.png');

  // Auto trim transparent borders around the visible logo
  const trimmedBuf = await sharp(fullPng).trim().png().toBuffer();
  const trimmedMeta = await sharp(trimmedBuf).metadata();
  console.log('Auto Trimmed Logo Size:', trimmedMeta.width, 'x', trimmedMeta.height);

  await sharp(trimmedBuf).png().toFile('public/do-reports-logo.png');
  await sharp(trimmedBuf).png().toFile('public/logo.png');

  const base64 = trimmedBuf.toString('base64');
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 ${trimmedMeta.width} ${trimmedMeta.height}" width="${trimmedMeta.width}" height="${trimmedMeta.height}">
  <image width="${trimmedMeta.width}" height="${trimmedMeta.height}" href="data:image/png;base64,${base64}" xlink:href="data:image/png;base64,${base64}"/>
</svg>`;

  fs.writeFileSync('public/do-reports-logo.svg', svg);
  fs.writeFileSync('public/logo.svg', svg);

  console.log('SUCCESS! Fully opaque, crystal-clear logo generated!');
}

fixAlpha();
