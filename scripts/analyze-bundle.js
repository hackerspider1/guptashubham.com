// Bundle analyzer script
const { writeFileSync } = require('fs');
const { join } = require('path');

// Create directory structure if it doesn't exist
const { execSync } = require('child_process');
try {
  execSync('mkdir -p scripts/analysis');
} catch (error) {
  console.error('Failed to create directory:', error);
}

// Analyze the bundle sizes
async function analyzeBundles() {
  console.log('Analyzing bundle sizes...');
  
  // Get all JS files in the .next/static directory
  const glob = require('glob');
  const files = glob.sync('.next/static/**/*.js');
  
  // Calculate sizes
  const path = require('path');
  const fs = require('fs');
  
  const sizes = files.map(file => {
    const stats = fs.statSync(file);
    return {
      path: file,
      size: stats.size,
      sizeFormatted: formatBytes(stats.size)
    };
  }).sort((a, b) => b.size - a.size);
  
  // Format and save report
  const report = {
    timestamp: new Date().toISOString(),
    totalSize: sizes.reduce((sum, file) => sum + file.size, 0),
    totalSizeFormatted: formatBytes(sizes.reduce((sum, file) => sum + file.size, 0)),
    files: sizes
  };
  
  // Write report to file
  writeFileSync(
    join(__dirname, 'analysis', `bundle-analysis-${Date.now()}.json`),
    JSON.stringify(report, null, 2)
  );
  
  // Print summary
  console.log(`\nTotal bundle size: ${report.totalSizeFormatted}`);
  console.log('\nTop 10 largest files:');
  sizes.slice(0, 10).forEach((file, index) => {
    console.log(`${index + 1}. ${file.path} (${file.sizeFormatted})`);
  });
  
  console.log('\nAnalysis complete! Full report saved to scripts/analysis/');
}

// Helper function to format bytes
function formatBytes(bytes, decimals = 2) {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

// Run analysis
analyzeBundles()
  .catch(error => {
    console.error('Analysis failed:', error);
    process.exit(1);
  }); 