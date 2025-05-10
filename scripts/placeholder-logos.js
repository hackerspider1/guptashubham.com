const fs = require('fs');
const path = require('path');
const { createCanvas } = require('canvas');

// Make sure the directory exists
const outputDir = path.join(__dirname, '../public/logos/hof');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Companies to create placeholders for
const companies = [
  { id: 'google', name: 'Google', color: '#4285F4' },
  { id: 'apple', name: 'Apple', color: '#A2AAAD' },
  { id: 'microsoft', name: 'Microsoft', color: '#00A4EF' },
  { id: 'slack', name: 'Slack', color: '#4A154B' },
  { id: 'coinspace', name: 'Coin.Space', color: '#FFD700' },
  { id: 'ubiquiti', name: 'Ubiquiti', color: '#0559C9' },
  { id: 'whisper', name: 'Whisper', color: '#5A46F7' },
  { id: 'itbit', name: 'itBit', color: '#3498DB' },
  { id: 'hivewallet', name: 'Hive', color: '#FF8C00' },
  { id: 'todoist', name: 'Todoist', color: '#E44332' },
  { id: 'robocoin', name: 'Robocoin', color: '#FF6B6B' },
  { id: 'odesk', name: 'oDesk', color: '#6FDA44' },
  { id: 'coinage', name: 'Coinage', color: '#4CAF50' },
  { id: 'twitter', name: 'Twitter', color: '#1DA1F2' },
  { id: 'spotify', name: 'Spotify', color: '#1DB954' },
  { id: 'baidu', name: 'Baidu', color: '#2932E1' },
  { id: 'hackerone', name: 'H1', color: '#494649' },
  { id: 'bugcrowd', name: 'Bugcrowd', color: '#F26822' },
  { id: 'att', name: 'AT&T', color: '#00A8E0' },
  { id: 'kaspersky', name: 'Kaspersky', color: '#006D5C' },
];

// Create placeholder logos
companies.forEach(company => {
  const canvas = createCanvas(200, 200);
  const ctx = canvas.getContext('2d');

  // Fill background
  ctx.fillStyle = company.color;
  ctx.fillRect(0, 0, 200, 200);

  // Add text
  ctx.fillStyle = '#FFFFFF';
  ctx.font = 'bold 40px Arial';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(company.name, 100, 100);

  // Save to file
  const buffer = canvas.toBuffer('image/png');
  fs.writeFileSync(path.join(outputDir, `${company.id}.png`), buffer);
  console.log(`Created placeholder for ${company.name}`);
});

console.log('All placeholders created!'); 