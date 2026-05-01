const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function processImages() {
  try {
    // Create og-image.jpg from gym-bg.png
    if (fs.existsSync('public/gym-bg.png')) {
      await sharp('public/gym-bg.png')
        .resize(1200, 630, {
          fit: 'cover',
          position: 'center'
        })
        .jpeg({ quality: 80 })
        .toFile('public/og-image.jpg');
      console.log('Created og-image.jpg (1200x630)');
    } else {
      console.log('public/gym-bg.png not found');
    }

    // Create optimized icon from logo.png
    if (fs.existsSync('public/logo.png')) {
      // Resize icon.png to a reasonable size (e.g., 512x512)
      await sharp('public/logo.png')
        .resize(512, 512, {
          fit: 'contain',
          background: { r: 0, g: 0, b: 0, alpha: 0 }
        })
        .png()
        .toFile('app/icon.png');
      console.log('Created optimized app/icon.png (512x512)');
      
      // Also generate an apple-icon if needed, or favicon.ico
      // Next.js handles .ico if we name it favicon.ico
      await sharp('public/logo.png')
        .resize(32, 32)
        .png()
        .toFile('app/favicon.ico');
      console.log('Created app/favicon.ico (32x32)');
    } else {
      console.log('public/logo.png not found');
    }
  } catch (error) {
    console.error('Error processing images:', error);
  }
}

processImages();
