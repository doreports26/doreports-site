const fs = require('fs');
const sharp = require('sharp');

async function importNewLogo() {
  const filePath = 'C:/Users/HP/Downloads/LOGO (All).png';
  if (!fs.existsSync(filePath)) {
    console.error('File does not exist:', filePath);
    return;
  }
  
  const meta = await sharp(filePath).metadata();
  console.log('Original File Meta:', meta.width, 'x', meta.height, 'channels:', meta.channels, 'hasAlpha:', meta.hasAlpha);

  // Copy raw file
  fs.copyFileSync(filePath, 'public/LOGO_ALL_RAW.png');

  // Let's check trimmed dimensions
  const trimmedBuf = await sharp(filePath).trim().png().toBuffer();
  const trimmedMeta = await sharp(trimmedBuf).metadata();
  console.log('Trimmed Dimensions:', trimmedMeta.width, 'x', trimmedMeta.height);

  // Save the trimmed crisp PNG
  await sharp(trimmedBuf).png().toFile('public/do-reports-logo.png');
  await sharp(trimmedBuf).png().toFile('public/logo.png');

  // Save SVG
  const base64 = trimmedBuf.toString('base64');
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 ${trimmedMeta.width} ${trimmedMeta.height}" width="${trimmedMeta.width}" height="${trimmedMeta.height}">
  <image width="${trimmedMeta.width}" height="${trimmedMeta.height}" href="data:image/png;base64,${base64}" xlink:href="data:image/png;base64,${base64}"/>
</svg>`;

  fs.writeFileSync('public/do-reports-logo.svg', svg);
  fs.writeFileSync('public/logo.svg', svg);

  console.log('Successfully installed LOGO (All).png as primary logo in public folder!');
}

importNewLogo();
