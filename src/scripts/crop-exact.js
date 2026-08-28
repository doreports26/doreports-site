const fs = require('fs');
const sharp = require('sharp');

async function extractExactLogo() {
  // Extract exact 666 x 529 region
  const croppedBuf = await sharp('public/full_transparent_logo.png')
    .extract({ left: 318, top: 541, width: 666, height: 529 })
    .png()
    .toBuffer();

  const meta = await sharp(croppedBuf).metadata();
  console.log('Exact cropped dimensions:', meta.width, 'x', meta.height);

  await sharp(croppedBuf).png().toFile('public/do-reports-logo.png');
  await sharp(croppedBuf).png().toFile('public/logo.png');

  const base64 = croppedBuf.toString('base64');
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${meta.width} ${meta.height}" width="${meta.width}" height="${meta.height}">
  <image width="${meta.width}" height="${meta.height}" href="data:image/png;base64,${base64}"/>
</svg>`;

  fs.writeFileSync('public/do-reports-logo.svg', svg);
  fs.writeFileSync('public/logo.svg', svg);

  console.log('SUCCESS! The logo is now 100% full bleed with 0px margin!');
}

extractExactLogo();
