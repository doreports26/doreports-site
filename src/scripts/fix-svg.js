const fs = require('fs');

async function fixSvg() {
  const pngBuf = fs.readFileSync('public/do-reports-logo.png');
  const base64 = pngBuf.toString('base64');
  
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 666 529" width="666" height="529">
  <image width="666" height="529" href="data:image/png;base64,${base64}" xlink:href="data:image/png;base64,${base64}"/>
</svg>`;

  fs.writeFileSync('public/do-reports-logo.svg', svg);
  fs.writeFileSync('public/logo.svg', svg);
  console.log('Fixed SVG with both href and xlink:href');
}

fixSvg();
