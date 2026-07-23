const fs = require('fs');
const path = require('path');
const { PDFParse } = require('pdf-parse');

const syllabusDir = 'Spanish Syllabus';

async function extractPDFs() {
  const files = fs.readdirSync(syllabusDir).filter(f => f.endsWith('.pdf'));
  console.log('Found PDF files:', files);

  for (const file of files) {
    const filePath = path.join(syllabusDir, file);
    const dataBuffer = fs.readFileSync(filePath);
    try {
      const parser = new PDFParse(new Uint8Array(dataBuffer));
      const res = await parser.getText();
      const text = typeof res === 'string' ? res : (res.text || JSON.stringify(res));
      console.log(`\n========================================`);
      console.log(`FILE: ${file}`);
      console.log(`Text length: ${text.length}`);
      
      const outName = file.replace('.pdf', '.txt');
      fs.writeFileSync(outName, text, 'utf-8');
      console.log(`Saved text to ${outName}`);
    } catch (err) {
      console.error(`Error reading ${file}:`, err);
    }
  }
}

extractPDFs();
