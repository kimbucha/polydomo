const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, '..', 'public');
const destDir = path.join(__dirname, '..', 'dist');

// Create dist directory if it doesn't exist
if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir);
}

// Copy manifest.json
fs.copyFileSync(
  path.join(srcDir, 'manifest.json'),
  path.join(destDir, 'manifest.json')
);

// Copy popup.html
fs.copyFileSync(
  path.join(srcDir, 'popup.html'),
  path.join(destDir, 'popup.html')
);

// Copy icons
const iconSrcDir = path.join(srcDir, 'icons');
const iconDestDir = path.join(destDir, 'icons');

if (fs.existsSync(iconSrcDir)) {
  if (!fs.existsSync(iconDestDir)) {
    fs.mkdirSync(iconDestDir);
  }
  
  const icons = fs.readdirSync(iconSrcDir);
  icons.forEach(icon => {
    fs.copyFileSync(
      path.join(iconSrcDir, icon),
      path.join(iconDestDir, icon)
    );
  });
}

console.log('Static files copied successfully!');