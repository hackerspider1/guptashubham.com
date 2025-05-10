// Optimized build script
const { execSync } = require('child_process');
const chalk = require('chalk');

console.log(chalk.blue.bold('🚀 Starting optimized build process...'));

function runCommand(command, description) {
  console.log(chalk.yellow(`\n📌 ${description}`));
  try {
    execSync(command, { stdio: 'inherit' });
    console.log(chalk.green(`✅ ${description} completed successfully`));
    return true;
  } catch (error) {
    console.error(chalk.red(`❌ ${description} failed: ${error.message}`));
    return false;
  }
}

// Sequence of operations
(async () => {
  console.time('Build time');
  
  // 1. Clean previous build artifacts
  if (!runCommand('npm run clean', 'Cleaning previous build files')) {
    process.exit(1);
  }
  
  // 2. Run linting
  if (!runCommand('npm run lint', 'Linting code')) {
    // Continue despite linting errors
    console.log(chalk.yellow('⚠️ Continuing despite linting errors'));
  }
  
  // 3. Optimize images
  if (!runCommand('npm run optimize-images', 'Optimizing images')) {
    console.log(chalk.yellow('⚠️ Image optimization failed, continuing with build'));
  }
  
  // 4. Build with production settings
  if (!runCommand('NODE_ENV=production npm run build', 'Building production version')) {
    process.exit(1);
  }
  
  // 5. Analyze bundle
  if (!runCommand('npm run analyze:bundle', 'Analyzing bundle')) {
    console.log(chalk.yellow('⚠️ Bundle analysis failed, continuing'));
  }
  
  console.timeEnd('Build time');
  console.log(chalk.blue.bold('\n🎉 Optimized build completed!'));
  console.log(`\nOptimized site is available in the 'out' directory`);
})(); 