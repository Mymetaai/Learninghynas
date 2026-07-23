import fs from 'fs';
import path from 'path';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const pdf = require('pdf-parse');

const syllabusDir = 'Spanish Syllabus';

async function extractPDFs() {
  const files = fs.readdirSync(syllabusDir).filter(f => f.endsWith('.pdf'));
  console.log('Found PDF files:', files);

  for (const file of files) {
    const filePath = path.join(syllabusDir, file);
    const dataBuffer = fs.readFileSync(filePath);
    try {
      const data = await pdf(dataBuffer);
      console.log(`\n========================================`);
      console.log(`FILE: ${file}`);
      console.log(`Pages: ${data.numpages}`);
      console.log(`Text length: ${data.text.length}`);
      
      const outName = file.replace('.pdf', '.txt');
      fs.writeFileSync(outName, data.text, 'utf-8');
      console.log(`Saved text to ${outName}`);
    } catch (err) {
      console.error(`Error reading ${file}:`, err);
    }
  }
}

extractPDFs();
