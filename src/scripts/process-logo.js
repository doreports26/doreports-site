const fs = require('fs');
const sharp = require('sharp');

async function processLogo() {
  try {
    const inputBuffer = fs.readFileSync('public/extracted_logo.png');
    
    // Trim any border
    const trimmed = sharp(inputBuffer).trim();
    const trimmedBuffer = await trimmed.toBuffer();
    
    const meta = await sharp(trimmedBuffer).metadata();
    console.log('Trimmed dimensions:', meta.width, 'x', meta.height);
    
    // Save high-resolution PNG
    await sharp(trimmedBuffer).png().toFile('public/do-reports-logo.png');
    await sharp(trimmedBuffer).png().toFile('public/logo.png');
    
    const base64 = trimmedBuffer.toString('base64');
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${meta.width} ${meta.height}" width="${meta.width}" height="${meta.height}">
  <image width="${meta.width}" height="${meta.height}" href="data:image/png;base64,${base64}"/>
</svg>`;
    
    fs.writeFileSync('public/do-reports-logo.svg', svg);
    fs.writeFileSync('public/logo.svg', svg);
    
    console.log('Successfully written public/do-reports-logo.svg and public/do-reports-logo.png with zero margin padding!');
  } catch (err) {
    console.error('Error processing logo:', err);
  }
}

processLogo();
