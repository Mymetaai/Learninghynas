import { execSync } from 'child_process';

try {
  const nodeBin = 'C:\\Program Files\\nodejs\\node.exe';
  const tscBin = 'node_modules/typescript/bin/tsc';
  console.log('Running TypeScript check...');
  const stdout = execSync(`"${nodeBin}" "${tscBin}" --noEmit`, { encoding: 'utf-8' });
  console.log('TypeScript check result:\n', stdout || 'Zero TypeScript errors!');
} catch (err) {
  console.error('TypeScript check failed:');
  if (err.stdout) console.error('STDOUT:', err.stdout);
  if (err.stderr) console.error('STDERR:', err.stderr);
  process.exit(1);
}
