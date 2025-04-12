const fs = require('fs');
const path = require('path');

const rootDir = './'; // Pornim din rădăcina proiectului
const targetPattern = /\b(Users|users|USERS)\b/g;

function scanDir(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory() && !['node_modules', '.git', '.next'].includes(entry.name)) {
      scanDir(fullPath);
    } else if (entry.isFile() && (fullPath.endsWith('.ts') || fullPath.endsWith('.tsx'))) {
      const content = fs.readFileSync(fullPath, 'utf-8');
      if (targetPattern.test(content)) {
        console.log(`⚠️ Found "Users" in: ${fullPath}`);
      }
    }
  }
}

console.log('🔍 Scanning for incorrect "Users" references...\n');
scanDir(rootDir);
console.log('\n✅ Scan completed.');
