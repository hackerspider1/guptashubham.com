// Image optimization script
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const glob = require('glob');

// Configuration
const config = {
  inputDir: 'public',
  outputDir: 'public/optimized',
  extensions: ['.jpg', '.jpeg', '.png'],
  sizes: [
    { width: 640, suffix: 'sm' },
    { width: 1024, suffix: 'md' },
    { width: 1920, suffix: 'lg' }
  ],
  quality: 80
};

// Create output directory if it doesn't exist
if (!fs.existsSync(config.outputDir)) {
  fs.mkdirSync(config.outputDir, { recursive: true });
}

// Get all image files
const imageFiles = glob.sync(`${config.inputDir}/**/*+(.jpg|.jpeg|.png)`, { ignore: `${config.outputDir}/**/*` });

// Create optimized versions
async function optimizeImages() {
  console.log(`Found ${imageFiles.length} images to optimize`);
  
  for (const file of imageFiles) {
    const filename = path.basename(file);
    const ext = path.extname(file);
    const name = path.basename(file, ext);
    
    // Skip if already an optimized version
    if (name.endsWith('-sm') || name.endsWith('-md') || name.endsWith('-lg')) {
      continue;
    }
    
    try {
      console.log(`Optimizing ${filename}...`);
      
      // Create a WebP version at original size
      await sharp(file)
        .webp({ quality: config.quality })
        .toFile(path.join(config.outputDir, `${name}.webp`));
      
      // Create resized versions for responsive images
      for (const size of config.sizes) {
        await sharp(file)
          .resize(size.width)
          .webp({ quality: config.quality })
          .toFile(path.join(config.outputDir, `${name}-${size.suffix}.webp`));
        
        // Also create original format in same size for fallback
        await sharp(file)
          .resize(size.width)
          .toFormat(ext.replace('.', ''))
          .toFile(path.join(config.outputDir, `${name}-${size.suffix}${ext}`));
      }
    } catch (error) {
      console.error(`Error optimizing ${filename}:`, error);
    }
  }
  
  console.log('Image optimization complete!');
}

optimizeImages().catch(console.error); 