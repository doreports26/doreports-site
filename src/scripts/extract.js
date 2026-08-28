const fs = require('fs');
const sharp = require('sharp');

async function extractAll() {
  const original = fs.readFileSync('C:/Users/HP/Downloads/do-reports-logo.svg', 'utf8');
  const matches = [...original.matchAll(/data:image\/png;base64,([A-Za-z0-9+/=]+)/g)];
  console.log('Found matches:', matches.length);
  for (let i = 0; i < matches.length; i++) {
    const buf = Buffer.from(matches[i][1], 'base64');
    fs.writeFileSync(`public/image_${i}.png`, buf);
    const meta = await sharp(buf).metadata();
    console.log(`Image ${i}:`, meta.width, meta.height, meta.channels);
    
    // Also let's inspect the raw pixels of image_i
    const raw = await sharp(buf).raw().toBuffer({ resolveWithObject: true });
    console.log(`Image ${i} raw bytes length:`, raw.data.length);
  }
}
extractAll();
