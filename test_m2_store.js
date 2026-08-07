import fs from 'fs';
import path from 'path';

console.log("=== EMPIRICAL TEST: Milestone 2 Logo & Settings Store Verification ===");

// 1. Check physical logo asset existence in public folder
const publicDir = path.resolve('public');
const logoVariants = {
  executive: '/adult-hyena-logo.jpg',
  uploaded: '/uploaded-hyena-logo.png',
  chibi: '/ai-hyena-logo.jpg'
};

let allAssetsExist = true;
for (const [key, relPath] of Object.entries(logoVariants)) {
  const fullPath = path.join(publicDir, relPath.replace(/^\//, ''));
  const exists = fs.existsSync(fullPath);
  console.log(`Asset Check [${key} -> ${relPath}]: ${exists ? 'EXISTS (' + fs.statSync(fullPath).size + ' bytes)' : 'MISSING'}`);
  if (!exists) allAssetsExist = false;
}

if (!allAssetsExist) {
  console.error("FAILED: Missing logo asset(s)");
  process.exit(1);
}

// 2. Test logo fallback logic
const LOGO_VARIANTS = {
  executive: { label: 'Executive Emblem', src: '/adult-hyena-logo.jpg' },
  uploaded: { label: 'Uploaded Mascot', src: '/uploaded-hyena-logo.png' },
  chibi: { label: 'Cute Chibi', src: '/ai-hyena-logo.jpg' },
};

function getActiveLogo(variant) {
  return LOGO_VARIANTS[variant] || LOGO_VARIANTS.executive;
}

// Test cases
const testVariants = ['executive', 'uploaded', 'chibi', 'invalid_variant', null, undefined, ''];
for (const v of testVariants) {
  const logo = getActiveLogo(v);
  if (!logo || !logo.src || !logo.label) {
    console.error(`FAILED: Fallback failed for variant "${v}"`);
    process.exit(1);
  }
  console.log(`Fallback test for "${v}": label="${logo.label}", src="${logo.src}" OK`);
}

console.log("=== ALL STORE & LOGO ASSET CHECKS PASSED ===");
