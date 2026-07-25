const fs = require('fs');
const path = require('path');

const repoRoot = 'C:\\Users\\ROHITGUPTA\\.gemini\\antigravity\\scratch\\agency-agents';
const globalSkillsDir = 'C:\\Users\\ROHITGUPTA\\.gemini\\config\\skills';

const targetAgents = [
  'data-engineer',
  'ai-engineer',
  'prompt-engineer',
  'backend-architect',
  'multi-agent-systems-architect',
  'language-translator',
  'whimsy-injector',
  'ui-designer',
  'ux-architect',
  'frontend-developer',
  'persona-walkthrough'
];

function slugify(text) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function findAgentFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat && stat.isDirectory()) {
      if (file !== '.git' && file !== 'node_modules' && file !== 'integrations' && file !== 'scripts') {
        results = results.concat(findAgentFiles(filePath));
      }
    } else if (file.endsWith('.md')) {
      results.push(filePath);
    }
  });
  return results;
}

const allMdFiles = findAgentFiles(repoRoot);
console.log(`Found ${allMdFiles.length} markdown files in repository.`);

const foundMap = new Map();

allMdFiles.forEach(filePath => {
  const content = fs.readFileSync(filePath, 'utf8');
  if (content.startsWith('---')) {
    const lines = content.split('\n');
    let name = '';
    let description = '';
    let inFrontmatter = false;
    let frontmatterCount = 0;
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      if (line === '---') {
        frontmatterCount++;
        if (frontmatterCount === 1) inFrontmatter = true;
        if (frontmatterCount === 2) { inFrontmatter = false; break; }
        continue;
      }
      if (inFrontmatter) {
        if (line.startsWith('name:')) {
          name = line.replace(/^name:\s*/, '').replace(/^["']|["']$/g, '').trim();
        } else if (line.startsWith('description:')) {
          description = line.replace(/^description:\s*/, '').replace(/^["']|["']$/g, '').trim();
        }
      }
    }

    if (name) {
      const slug = slugify(name);
      foundMap.set(slug, { filePath, name, description, content });
      const filenameSlug = slugify(path.basename(filePath, '.md'));
      foundMap.set(filenameSlug, { filePath, name, description, content });
    }
  }
});

console.log(`Parsed ${foundMap.size} unique agent slugs.`);

fs.mkdirSync(globalSkillsDir, { recursive: true });

const installed = [];
const missing = [];

targetAgents.forEach(target => {
  const slugTarget = slugify(target);
  let agentData = foundMap.get(slugTarget);
  
  if (!agentData) {
    // Try fuzzy match
    for (const [key, val] of foundMap.entries()) {
      if (key.includes(slugTarget) || slugTarget.includes(key)) {
        agentData = val;
        break;
      }
    }
  }

  if (agentData) {
    const skillName = `agency-${slugify(agentData.name)}`;
    const skillDir = path.join(globalSkillsDir, skillName);
    fs.mkdirSync(skillDir, { recursive: true });

    // Format for Antigravity skill (SKILL.md)
    let body = agentData.content;
    // Extract body after frontmatter
    const parts = agentData.content.split('---');
    if (parts.length >= 3) {
      body = parts.slice(2).join('---').trim();
    }

    const skillContent = `---
name: ${skillName}
description: ${agentData.description || agentData.name}
---

${body}
`;

    fs.writeFileSync(path.join(skillDir, 'SKILL.md'), skillContent, 'utf8');
    installed.push({ target, skillName, path: path.join(skillDir, 'SKILL.md') });
    console.log(`[INSTALLED] ${target} -> ${skillName} (${path.join(skillDir, 'SKILL.md')})`);
  } else {
    missing.push(target);
    console.log(`[MISSING] ${target}`);
  }
});

console.log('\n=== INSTALLATION SUMMARY ===');
console.log(`Successfully Installed: ${installed.length} / ${targetAgents.length}`);
if (missing.length > 0) {
  console.log(`Missing Agents: ${missing.join(', ')}`);
}
